/**
 * The pastor's sermon library: every full-length video on his YouTube channel, organised into
 * series, Sunday services, seminars and single messages.
 *
 * Read once at build time through the YouTube Data API v3 (YOUTUBE_API_KEY, from .env locally or
 * a repository secret in CI). If the key is missing or YouTube can't be reached, the last saved
 * copy in src/data/sermons-snapshot.json is used instead, so the build never depends on the
 * network. A successful local build refreshes that snapshot.
 *
 * Grouping is automatic (playlists first, then titles of the form "NAME_SEHEMU YA 3");
 * src/data/sermon-overrides.json corrects what the titles get wrong.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const SNAPSHOT = 'src/data/sermons-snapshot.json';
const OVERRIDES = 'src/data/sermon-overrides.json';
const API = 'https://www.googleapis.com/youtube/v3';

/* ------------------------------------------------------------------ */
/* Shapes                                                              */
/* ------------------------------------------------------------------ */

/** What is fetched from YouTube and saved in the snapshot. */
export interface RawLibrary {
  videos: { id: string; title: string; published: string }[];
  playlists: { id: string; title: string; videoIds: string[] }[];
}

export interface Overrides {
  /** Playlist ids that are broad buckets, not teaching series. */
  sundayPlaylists: string[];
  seminarPlaylists: string[];
  ignoredPlaylists: string[];
  /** Video ids that should not appear on the site. */
  hidden: string[];
  /** Video id → series title, for videos the title parser files wrongly. */
  series: Record<string, string>;
  /** Series title as parsed → title to show (also merges two series into one). */
  rename: Record<string, string>;
}

export interface Sermon {
  id: string;
  /** Exactly as written on YouTube. */
  title: string;
  /** ISO date. */
  published: string;
  url: string;
  thumbnail: string;
  /** Part number within its series, when the title states one. */
  part?: number;
}

export interface Series {
  slug: string;
  title: string;
  /** Oldest first. */
  sermons: Sermon[];
  /** ISO dates of the first and last part. */
  from: string;
  to: string;
}

export interface YearGroup {
  year: number;
  /** Newest first. */
  sermons: Sermon[];
}

export interface SermonLibrary {
  /** Number of full-length videos. */
  total: number;
  /** Most recently continued first. */
  series: Series[];
  seminars: YearGroup[];
  services: YearGroup[];
  singles: YearGroup[];
}

/* ------------------------------------------------------------------ */
/* Fetching                                                            */
/* ------------------------------------------------------------------ */

const decode = (s: string) =>
  s
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');

interface PlaylistItem {
  snippet?: { title?: string };
  contentDetails?: { videoId?: string; videoPublishedAt?: string };
}

const call = async <T>(path: string, params: Record<string, string>, key: string): Promise<T> => {
  const url = `${API}/${path}?${new URLSearchParams({ ...params, key })}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  // Never include the URL in errors: it carries the key.
  if (!res.ok) throw new Error(`YouTube API ${path}: HTTP ${res.status}`);
  return (await res.json()) as T;
};

const playlistItems = async (playlistId: string, key: string): Promise<PlaylistItem[]> => {
  const items: PlaylistItem[] = [];
  let pageToken: string | undefined;
  do {
    const page = await call<{ items?: PlaylistItem[]; nextPageToken?: string }>(
      'playlistItems',
      { part: 'snippet,contentDetails', playlistId, maxResults: '50', ...(pageToken ? { pageToken } : {}) },
      key,
    );
    items.push(...(page.items ?? []));
    pageToken = page.nextPageToken;
  } while (pageToken);
  return items;
};

export const fetchLibrary = async (channelId: string, key: string): Promise<RawLibrary> => {
  // "UU…" is every upload; "UUSH…" is the Shorts among them (left out of the library).
  const suffix = channelId.slice(2);
  const [uploads, shorts, lists] = await Promise.all([
    playlistItems(`UU${suffix}`, key),
    playlistItems(`UUSH${suffix}`, key).catch(() => []),
    call<{ items?: { id: string; snippet?: { title?: string } }[] }>(
      'playlists',
      { part: 'snippet', channelId, maxResults: '50' },
      key,
    ),
  ]);
  const shortIds = new Set(shorts.map((item) => item.contentDetails?.videoId));

  const videos = uploads.flatMap((item) => {
    const id = item.contentDetails?.videoId;
    const published = item.contentDetails?.videoPublishedAt;
    const title = item.snippet?.title;
    // Private and deleted videos have no publish date.
    if (!id || !published || !title || shortIds.has(id)) return [];
    return [{ id, title: decode(title).trim(), published }];
  });
  if (videos.length === 0) throw new Error('YouTube API: no videos returned');

  const playlists = await Promise.all(
    (lists.items ?? []).map(async (list) => ({
      id: list.id,
      title: decode(list.snippet?.title ?? '').trim(),
      videoIds: (await playlistItems(list.id, key)).flatMap((item) => item.contentDetails?.videoId ?? []),
    })),
  );
  playlists.sort((a, b) => a.id.localeCompare(b.id));
  return { videos, playlists };
};

/* ------------------------------------------------------------------ */
/* Grouping                                                            */
/* ------------------------------------------------------------------ */

const UNITS: Record<string, number> = {
  kwanza: 1, moja: 1, one: 1, pili: 2, mbili: 2, two: 2, tatu: 3, three: 3, nne: 4, four: 4, tano: 5, five: 5,
  sita: 6, six: 6, saba: 7, seven: 7, nane: 8, eight: 8, tisa: 9, nine: 9,
};
const TENS: Record<string, number> = {
  kumi: 10, ten: 10, ishirini: 20, thelathini: 30, arobaini: 40, hamsini: 50, sitini: 60, sabini: 70,
};

/** "SABA" → 7, "KUMI NA MOJA" → 11, "ISHIRINI" → 20, "3" → 3, "12B" → 12. */
const partNumber = (token: string): number | undefined => {
  const words = token.toLowerCase().trim().split(/\s+/);
  const digits = /^\d+/.exec(words[0] ?? '')?.[0];
  if (digits) return Number(digits);
  const tens = TENS[words[0] ?? ''];
  if (tens === undefined) return UNITS[words[0] ?? ''];
  return words[1] === 'na' ? tens + (UNITS[words[2] ?? ''] ?? 0) : tens;
};

const SEPARATORS = /^[\s_\-–—|:;,.()]+|[\s_\-–—|:;,.()]+$/g;

/** Strips "LIVE:", "SOMO :" and trailing speaker credits or dates from a title. */
const coreTitle = (title: string) =>
  title
    .replace(/ /g, ' ')
    .replace(/^\s*live\s*:?\s*/i, '')
    .replace(/^\s*somo\s*:\s*/i, '')
    .replace(/[\s_|\-–]*(?<![\p{L}\d])(pastor|pst|mch(ungaji)?)\.?\s*carlos.*$/iu, '')
    .replace(SEPARATORS, '');

/** "KUREJEZWA NA KUREJESHEWA_SEHEMU YA 3." → { name: "KUREJEZWA NA KUREJESHEWA", part: 3 } */
export const parseSeries = (title: string): { name: string; part?: number } | null => {
  const core = coreTitle(title);
  // Lookarounds instead of : "MMOJA_SEHEMU" has no word boundary at the underscore.
  const match = /^(.+?)[\s_\-–—|:;,.(]*(?<![\p{L}\d])(?:sehemu|part|pt)(?![\p{L}\d])[\s._:]*(?:ya\s+)?([\p{L}\d][\p{L}\d ]*)/iu.exec(core);
  if (!match?.[1] || !match[2]) return null;
  // A trailing day or session number ("… SADAKA 8 PART 2") is not part of the name; a year is.
  const name = match[1]
    .replace(SEPARATORS, '')
    .replace(/\s+\d{1,2}$/, '')
    .replace(SEPARATORS, '')
    .replace(/\s+/g, ' ');
  if (name.length < 4) return null;
  const part = partNumber(match[2]);
  return part === undefined ? { name } : { name, part };
};

/** Comparison key: letters and digits only, so punctuation and spacing differences don't matter. */
const keyOf = (name: string) => name.toUpperCase().replace(/[^\p{L}\d]+/gu, ' ').trim();

const slugify = (title: string) =>
  title
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/, '') || 'series';

// Lookarounds instead of \b: titles often join words with underscores.
const SEMINAR = /(?<![a-z])(conference|convention|kongamano|semina|seminar|summit|crusade|clinic)(?![a-z])/i;

const byYear = (sermons: Sermon[]): YearGroup[] => {
  const years = new Map<number, Sermon[]>();
  for (const sermon of sermons) {
    const year = Number(sermon.published.slice(0, 4));
    years.set(year, [...(years.get(year) ?? []), sermon]);
  }
  return [...years.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, list]) => ({ year, sermons: list.sort((a, b) => b.published.localeCompare(a.published)) }));
};

export const groupLibrary = (raw: RawLibrary, overrides: Overrides): SermonLibrary => {
  const hidden = new Set(overrides.hidden);
  const sermons = new Map<string, Sermon>();
  for (const video of raw.videos) {
    if (hidden.has(video.id)) continue;
    sermons.set(video.id, {
      ...video,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      thumbnail: `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`,
    });
  }

  const broad = new Set([...overrides.sundayPlaylists, ...overrides.seminarPlaylists, ...overrides.ignoredPlaylists]);
  const inPlaylists = (ids: string[]) =>
    new Set(raw.playlists.filter((list) => ids.includes(list.id)).flatMap((list) => list.videoIds));
  const sundayIds = inPlaylists(overrides.sundayPlaylists);
  const seminarIds = inPlaylists(overrides.seminarPlaylists);

  // Series title (by comparison key) → display title and members.
  const groups = new Map<string, { title: string; ids: Set<string> }>();
  const assigned = new Set<string>();
  const add = (title: string, id: string, part?: number) => {
    const sermon = sermons.get(id);
    if (!sermon || assigned.has(id)) return;
    const shown = overrides.rename[title] ?? title;
    const key = keyOf(shown);
    const group = groups.get(key) ?? { title: shown, ids: new Set<string>() };
    groups.set(key, group);
    group.ids.add(id);
    assigned.add(id);
    if (part !== undefined) sermon.part = part;
  };

  // 1. Corrections made by hand.
  for (const [id, title] of Object.entries(overrides.series)) add(title, id, parseSeries(sermons.get(id)?.title ?? '')?.part);
  // 2. The pastor's own topical playlists.
  for (const list of raw.playlists) {
    if (broad.has(list.id)) continue;
    for (const id of list.videoIds) add(list.title, id, parseSeries(sermons.get(id)?.title ?? '')?.part);
  }
  // 3. Titles that name a part.
  for (const sermon of sermons.values()) {
    const parsed = parseSeries(sermon.title);
    if (parsed) add(parsed.name, sermon.id, parsed.part);
  }
  // 4. The opening message of a series is often titled without "sehemu ya kwanza".
  for (const sermon of sermons.values()) {
    if (assigned.has(sermon.id)) continue;
    const group = groups.get(keyOf(overrides.rename[coreTitle(sermon.title)] ?? coreTitle(sermon.title)));
    if (group) add(group.title, sermon.id, 1);
  }

  const slugs = new Set<string>();
  const series: Series[] = [];
  for (const group of groups.values()) {
    const members = [...group.ids].flatMap((id) => sermons.get(id) ?? []);
    // A "series" of one is just a message.
    if (members.length < 2) {
      for (const member of members) assigned.delete(member.id);
      continue;
    }
    members.sort((a, b) => a.published.localeCompare(b.published));
    let slug = slugify(group.title);
    for (let n = 2; slugs.has(slug); n++) slug = `${slugify(group.title)}-${n}`;
    slugs.add(slug);
    series.push({
      slug,
      title: group.title,
      sermons: members,
      from: members[0]?.published ?? '',
      to: members.at(-1)?.published ?? '',
    });
  }
  series.sort((a, b) => b.to.localeCompare(a.to));

  const rest = [...sermons.values()].filter((sermon) => !assigned.has(sermon.id));
  const seminars = rest
    .filter((sermon) => seminarIds.has(sermon.id) || SEMINAR.test(sermon.title))
    .sort((a, b) => b.published.localeCompare(a.published));
  const seminarSet = new Set(seminars.map((sermon) => sermon.id));
  const isService = (sermon: Sermon) => sundayIds.has(sermon.id) || /^\s*live\b/i.test(sermon.title);
  const others = rest.filter((sermon) => !seminarSet.has(sermon.id));

  return {
    total: sermons.size,
    series,
    seminars: byYear(seminars),
    services: byYear(others.filter(isService)),
    singles: byYear(others.filter((sermon) => !isService(sermon))),
  };
};

/* ------------------------------------------------------------------ */
/* Loading (build time)                                                */
/* ------------------------------------------------------------------ */

const readJson = <T>(path: string, fallback: T): T => {
  try {
    return existsSync(path) ? (JSON.parse(readFileSync(path, 'utf8')) as T) : fallback;
  } catch {
    return fallback;
  }
};

const EMPTY_OVERRIDES: Overrides = {
  sundayPlaylists: [],
  seminarPlaylists: [],
  ignoredPlaylists: [],
  hidden: [],
  series: {},
  rename: {},
};

let cached: Promise<SermonLibrary> | undefined;

export const getSermonLibrary = (channelId: string): Promise<SermonLibrary> => {
  cached ??= (async () => {
    const overrides = { ...EMPTY_OVERRIDES, ...readJson<Partial<Overrides>>(OVERRIDES, {}) };
    const key = (import.meta.env?.['YOUTUBE_API_KEY'] as string | undefined) ?? process.env['YOUTUBE_API_KEY'];
    let raw: RawLibrary | undefined;
    if (key) {
      try {
        raw = await fetchLibrary(channelId, key);
        const saved = `${JSON.stringify(raw, null, 1)}\n`;
        // Keep the committed fallback fresh, but only from a developer's machine.
        if (!process.env['CI'] && (!existsSync(SNAPSHOT) || readFileSync(SNAPSHOT, 'utf8') !== saved)) {
          writeFileSync(SNAPSHOT, saved);
        }
      } catch (error) {
        console.warn(`[sermons] YouTube unavailable, using the saved snapshot: ${String(error)}`);
      }
    } else {
      console.warn('[sermons] YOUTUBE_API_KEY is not set, using the saved snapshot.');
    }
    raw ??= readJson<RawLibrary>(SNAPSHOT, { videos: [], playlists: [] });
    return groupLibrary(raw, overrides);
  })();
  return cached;
};
