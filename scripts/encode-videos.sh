#!/usr/bin/env bash
# Re-encodes the raw clips in src/assets/videos/ (not committed) into short, silent,
# web-sized MP4s in public/videos/, plus a poster frame for each in src/assets/photos/.
# Requires ffmpeg with libx264. (VP9 was tested and came out larger for these clips.)
#
#   ./scripts/encode-videos.sh
#
# Each line: source | start (s) | duration (s) | width (px) | output name | optional crop (ffmpeg filter)
set -euo pipefail

SRC="src/assets/videos"
OUT="public/videos"
POSTERS="src/assets/photos"

CLIPS=(
  # Prayer moments: 5 s each, played once when scrolled into view.
  "prayer/ZNV1183.MP4|2|5|540|moments/prayer-bowed"
  "prayer/ZNV1185.MP4|10|5|540|moments/prayer-kneeling"
  "prayer/ZNV1205.MP4|1|5|540|moments/prayer-circle"
  "prayer/sunday-prayer-raw.MP4|3|4|540|moments/sunday-prayer"
  # Ministry-card moments (sources live in src/assets/videos/moments/).
  "moments/ZNV0534.MP4|0|4.4|540|moments/mens-fellowship"
  "moments/ZNV0823.MP4|0|4.4|540|moments/fellowship-gathering"
)

for line in "${CLIPS[@]}"; do
  IFS='|' read -r src start dur width name crop <<<"$line"
  mkdir -p "$OUT/$(dirname "$name")"
  pre="${crop:+$crop,}"
  vf="${pre}fps=30,scale=$width:-2:flags=lanczos,format=yuv420p"
  echo "$name  <-  $src  [$start s + $dur s, ${width}px]"

  ffmpeg -v error -y -ss "$start" -t "$dur" -i "$SRC/$src" -an -vf "$vf" \
    -c:v libx264 -profile:v high -preset slow -crf 27 -g 60 -movflags +faststart \
    "$OUT/$name.mp4"

  # Poster: half a second in, to avoid catching a cut.
  ffmpeg -v error -y -ss "$(printf '%.2f' "$(echo "$start + 0.5" | bc)")" -i "$SRC/$src" -frames:v 1 \
    -vf "${pre}scale=$width:-2:flags=lanczos" -q:v 3 "$POSTERS/$(basename "$name")-poster.jpg"
done

# ---------------------------------------------------------------------------
# Hero: steady shots only. Each source's shake was measured per shot (between cuts);
# the steadiest shots are stabilised one by one (vid.stab, so it never smooths across a cut)
# and joined into one clip per source video. The page rotates the five clips across the three
# panels so no two panels show the same video at once.
#   output | source (in videos/hero) | shots "start-end,start-end" | crop | stabilise: none | 45 | 120
#   (smoothing frames: 45 removes hand shake, 120 also flattens slow pans; "none" when the
#   shot is already steady, since stabilising can then chase moving people and add wobble)
HERO=(
  "hero-1|Timeline 12.mov|22.4-26.3,9.9-12.6||45"
  "hero-2|WhatsApp Video 2026-11-03 at 00.45.03.mp4|3.4-6.3,8.3-10.7||45"
  "hero-3|WhatsApp Video 2026-11-03 at 00.46.13.mp4|6.2-11.1||none"
  "hero-4|WhatsApp Video 2026-10-26 at 14.36.42.mp4|31.95-34.05,19.95-22.25||none"
  "hero-5|WhatsApp Video 2026-11-09 at 16.52.37.mp4|3.05-5.65,29.75-32.35||none"
)
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT/hero"
for line in "${HERO[@]}"; do
  IFS='|' read -r name src shots crop stab <<<"$line"
  pre="${crop:+$crop,}"
  : >"$TMP/list.txt"
  n=0
  IFS=',' read -ra parts <<<"$shots"
  for part in "${parts[@]}"; do
    n=$((n + 1))
    a="${part%-*}"; b="${part#*-}"
    dur="$(echo "$b - $a" | bc)"
    seg="$TMP/$name-$n"
    ffmpeg -v error -y -ss "$a" -t "$dur" -i "$SRC/hero/$src" -an \
      -vf "${pre}fps=30,scale=720:-2:flags=lanczos" -c:v libx264 -crf 12 -preset fast "$seg-raw.mp4"
    if [ "$stab" = none ]; then
      mv "$seg-raw.mp4" "$seg.mp4"
    else
      ffmpeg -v error -y -i "$seg-raw.mp4" \
        -vf "vidstabdetect=shakiness=8:accuracy=15:stepsize=4:mincontrast=0.2:result=$seg.trf" -f null -
      ffmpeg -v error -y -i "$seg-raw.mp4" \
        -vf "vidstabtransform=input=$seg.trf:smoothing=$stab:optzoom=1:zoomspeed=0.2:interpol=bicubic,unsharp=5:5:0.6:3:3:0.3,format=yuv420p" \
        -c:v libx264 -crf 12 -preset fast "$seg.mp4"
    fi
    echo "file '$seg.mp4'" >>"$TMP/list.txt"
  done
  echo "$name  <-  $src  [$shots]"
  ffmpeg -v error -y -f concat -safe 0 -i "$TMP/list.txt" -an \
    -c:v libx264 -profile:v high -preset slow -crf 27 -g 60 -movflags +faststart "$OUT/hero/$name.mp4"
  ffmpeg -v error -y -ss 0.5 -i "$OUT/hero/$name.mp4" -frames:v 1 -q:v 3 "$POSTERS/$name-poster.jpg"
done

ls -lh "$OUT"/*/
