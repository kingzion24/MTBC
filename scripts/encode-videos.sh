#!/usr/bin/env bash
# Re-encodes the raw clips in src/assets/videos/ (not committed) into short, silent,
# web-sized MP4s in public/videos/, plus a poster frame for each in src/assets/photos/.
# Requires ffmpeg with libx264. (VP9 was tested and came out larger for these clips.)
#
#   ./scripts/encode-videos.sh
#
# Each line: source | start (s) | duration (s) | width (px) | output name
set -euo pipefail

SRC="src/assets/videos"
OUT="public/videos"
POSTERS="src/assets/photos"

CLIPS=(
  # Hero: three 12 s loops from the "MTBC Praise Worship" edit (title card skipped).
  "hero/Timeline 12.mov|5|12|720|hero/hero-1"
  "hero/Timeline 12.mov|17|12|720|hero/hero-2"
  "hero/Timeline 12.mov|29|12|720|hero/hero-3"
  # Prayer moments: 5 s each, played once when scrolled into view.
  "prayer/ZNV1183.MP4|2|5|540|moments/prayer-bowed"
  "prayer/ZNV1185.MP4|10|5|540|moments/prayer-kneeling"
  "prayer/ZNV1205.MP4|1|5|540|moments/prayer-circle"
  "prayer/ZNV1207.MP4|5|2.9|540|moments/sunday-prayer"
)

for line in "${CLIPS[@]}"; do
  IFS='|' read -r src start dur width name <<<"$line"
  mkdir -p "$OUT/$(dirname "$name")"
  vf="fps=30,scale=$width:-2:flags=lanczos,format=yuv420p"
  echo "$name  <-  $src  [$start s + $dur s, ${width}px]"

  ffmpeg -v error -y -ss "$start" -t "$dur" -i "$SRC/$src" -an -vf "$vf" \
    -c:v libx264 -profile:v high -preset slow -crf 27 -g 60 -movflags +faststart \
    "$OUT/$name.mp4"

  # Poster: half a second in, to avoid catching a cut.
  ffmpeg -v error -y -ss "$(echo "$start + 0.5" | bc)" -i "$SRC/$src" -frames:v 1 \
    -vf "scale=$width:-2:flags=lanczos" -q:v 3 "$POSTERS/$(basename "$name")-poster.jpg"
done

ls -lh "$OUT"/*/
