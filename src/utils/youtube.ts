/**
 * Newest upload from a YouTube channel's public RSS feed, fetched once at build time (no API key).
 * Returns null if the feed can't be reached or parsed, so the page falls back to its default.
 */
export interface LatestVideo {
  id: string;
  title: string;
  published: string; // ISO date
  url: string;
  thumbnail: string;
}

const decode = (s: string) =>
  s
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');

const pick = (xml: string, pattern: RegExp) => pattern.exec(xml)?.[1];

const thumbnailFor = async (id: string) => {
  // maxresdefault (1280×720) doesn't exist for every video; fall back to hqdefault.
  const maxres = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  try {
    const res = await fetch(maxres, { method: 'HEAD', signal: AbortSignal.timeout(8000) });
    if (res.ok) return maxres;
  } catch {
    /* fall through */
  }
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
};

let cached: Promise<LatestVideo | null> | undefined;

export const getLatestVideo = (channelId: string): Promise<LatestVideo | null> => {
  cached ??= (async () => {
    try {
      const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const entry = pick(await res.text(), /<entry>([\s\S]*?)<\/entry>/);
      const id = entry && pick(entry, /<yt:videoId>([\w-]{11})<\/yt:videoId>/);
      const title = entry && pick(entry, /<title>([\s\S]*?)<\/title>/);
      const published = entry && pick(entry, /<published>([^<]+)<\/published>/);
      if (!id || !title || !published) throw new Error('no entries');
      return {
        id,
        // Shown exactly as it is written on YouTube.
        title: decode(title).trim(),
        published,
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: await thumbnailFor(id),
      };
    } catch (error) {
      console.warn(`[youtube] Latest video unavailable, using the fallback: ${String(error)}`);
      return null;
    }
  })();
  return cached;
};
