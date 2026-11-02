#!/usr/bin/env bash
# Re-encodes the raw hero clips (src/assets/videos/hero/*.mp4, not committed) into
# short, silent, web-sized loops in public/videos/hero/ plus a poster frame per clip.
# Requires ffmpeg with libx264. (VP9 was tested and came out larger for these fast-cut clips.)
#
#   ./scripts/encode-hero-videos.sh
#
# Edit SEGMENTS to change which part of each clip is used ("start duration" in seconds).
# Sources are taken in alphabetical order.
set -euo pipefail

SRC_DIR="src/assets/videos/hero"
OUT_DIR="public/videos/hero"
POSTER_DIR="src/assets/photos"
SEGMENTS=("4 12" "16 12" "6 12")

mkdir -p "$OUT_DIR" "$POSTER_DIR"
shopt -s nullglob
sources=("$SRC_DIR"/*.mp4)
[ ${#sources[@]} -ge ${#SEGMENTS[@]} ] || { echo "Expected ${#SEGMENTS[@]} clips in $SRC_DIR" >&2; exit 1; }

for i in "${!SEGMENTS[@]}"; do
  n=$((i + 1))
  read -r start dur <<<"${SEGMENTS[$i]}"
  src="${sources[$i]}"
  vf="fps=30,scale=480:-2:flags=lanczos,format=yuv420p"
  echo "hero-$n  <-  $(basename "$src")  [$start s + $dur s]"

  ffmpeg -v error -y -ss "$start" -t "$dur" -i "$src" -an -vf "$vf" \
    -c:v libx264 -profile:v high -preset slow -crf 26 -g 60 -movflags +faststart \
    "$OUT_DIR/hero-$n.mp4"

  ffmpeg -v error -y -ss "$start" -i "$src" -frames:v 1 -vf "scale=480:-2:flags=lanczos" -q:v 3 \
    "$POSTER_DIR/hero-poster-$n.jpg"
done

ls -lh "$OUT_DIR"
