# Pastor page with an organised sermon library

Status: built 2026-11-11 (pastor page at `/pastor/`, one page per series, YouTube Data API v3
with a saved snapshot as fallback). Decisions taken: API key, a page per series, Shorts left out.
The notes below are the original discussion.

## The idea

On the home page, the pastor section gets a "More" button. It opens a page that features only
Pastor Carlos Kirimbai in detail, with all his YouTube videos organised into series (playlists)
and single messages, so a visitor can browse the whole body of teaching instead of only the
latest sermon.

## Is it possible?

Yes. The whole channel was scanned on 2026-11-11 and it has enough structure to organise.

Channel: https://www.youtube.com/channel/UCY2Bpc2UZqd_4Px-B7ZuhtQ (@carloskirimbai)

| On the channel | Count |
|---|---|
| Uploaded videos | 286 |
| Live streams (mostly Sunday services) | 296 |
| Shorts | 59 |
| Playlists | 15 |

Findings:

- **Playlists cover about two thirds.** 368 of the 582 full-length videos are in at least one
  playlist; 214 are in none.
- **Four playlists are broad buckets:** Ibada za Jumapili (279), Mafundisho (51), Semina (14),
  Vipindi Online (13).
- **Eleven playlists are real teaching series** of 3 to 26 parts:
  - Ni rahisi sana kumwamini, kumtumaini na kumtegemea Mungu unayemjua (26)
  - Huduma, Wito na Kusudi (7)
  - Jihadhari na manabii wa uongo (7)
  - Huduma Tano kwa Kanisa (7)
  - Neema ya Mungu (6)
  - Huduma tano zilizotolewa kwa kanisa (6)
  - Jinsi ya kulijia kusudi la Mungu (6)
  - Namna ya kusikia na kuipambanua sauti ya Mungu (6)
  - Mtafaruku na mvutano mkuu kati ya mwili na roho (6)
  - Zaka katika neema? (5)
  - Vita vya kiroho (3)
- **Titles reveal more series than the playlists do.** Grouping by the title before
  "Sehemu ya…" gives about 35 series covering 165 videos. The largest:
  - Kanuni za Kibiblia za mafanikio na ustawi maishani (17)
  - Umoja, upendano wa ndugu, ushirikiano na mshikamano (16+)
  - Kurejezwa na kurejeshewa (11)
  - Roho Mtakatifu na upako wake katika maisha ya mwamini (9)
  - Kuomba mapenzi ya Mungu kwa ajili ya nchi yetu (9)
  - Mahusiano, ndoa na familia (9)
  - Uinjilisti mmoja kwa mmoja (7, still running)
  - Aina hii haitoki ila kwa kufunga na kuomba (7)
  - Jinsi mashujaa walivyoanguka (6)
- **Caveat:** that grouping was a rough first pass. Titles are written inconsistently
  ("SEHEMU YA SABA", "SEHEMU YA 3", "|| PASTOR CARLOS KIRIMBAI_22 FEB"), so some parts were
  missed and the count of single messages is overstated.

## The plan

1. **Collect the full list at build time.** The feed the site uses today
   (`src/utils/youtube.ts`) only returns the newest 15 videos. The full catalogue needs the
   official YouTube Data API: a free, read-only API key stored as a build secret, never in the
   code.
2. **Keep a saved snapshot in the repo** so the build still works if YouTube is unreachable.
3. **Group the videos into four shelves:**
   - **Series:** the pastor's 11 topical playlists plus the title-derived series, parts in order.
   - **Sunday services:** by year.
   - **Conferences and guest ministry:** such as Young Ministers Conference and Rising Gospel
     Stars Convention.
   - **Single messages:** everything that stands alone.
4. **Add a small corrections file** where a video can be moved to the right series by hand,
   because automatic title matching will not be perfect.
5. **Build the pastor page** in Kiswahili and English: full bio, latest message, the series
   grid, and each series opening to its list of parts that play on the page.
6. **Add a "More" button** to the pastor section on the home page that leads there.
7. **Rebuild on a schedule** (for example every Sunday evening) so new sermons appear without
   anyone touching the site. The site is static, so nothing updates between builds.

## Decisions still open

| Decision | Recommendation | Alternative |
|---|---|---|
| How to read the channel | YouTube Data API key: official and reliable. Needs a key created in Google Cloud. | No key: the scraping tool (`yt-dlp`) used for the scan. Works today but can break or get blocked without warning. |
| Page structure | One pastor page plus a page per series, so each series has its own link to share. | Everything on one long page. |
| Shorts | Not decided. | Include as a small row, or leave out. |

## How the scan was done

`yt-dlp --flat-playlist` against the channel's `/videos`, `/streams`, `/shorts` and
`/playlists` tabs, then each playlist for its members. No videos were downloaded and nothing
was saved in the repo.
