#!/usr/bin/env bash
# CLI-agnostic installer for the social_media_analyzer skill.
# - checks/installs deps (yt-dlp, ffmpeg, whisper-cpp) + the whisper model
# - links the skill into every agent skills dir it finds (Claude Code, Codex, ...)
# - puts `analyze-media` on your PATH (~/.local/bin)
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$REPO/skills/social_media_analyzer"
MODEL="$HOME/.cache/whisper-cpp/ggml-base.bin"

echo "==> checking dependencies"
missing=()
for bin in yt-dlp ffmpeg whisper-cli; do command -v "$bin" >/dev/null || missing+=("$bin"); done
if [ "${#missing[@]}" -gt 0 ]; then
  echo "    missing: ${missing[*]}"
  if command -v brew >/dev/null; then
    echo "    installing via Homebrew..."
    brew install yt-dlp whisper-cpp ffmpeg
  else
    echo "    install these manually (e.g. 'pipx install yt-dlp', your package manager for ffmpeg/whisper-cpp), then re-run."
    exit 1
  fi
fi

echo "==> whisper model"
if [ ! -f "$MODEL" ]; then
  mkdir -p "$(dirname "$MODEL")"
  curl -L -f -o "$MODEL" \
    "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin"
else
  echo "    already present: $MODEL"
fi

echo "==> linking skill into agent skill directories"
linked=0
# Add more agent roots here as needed; only link where the agent is actually installed.
for root in "$HOME/.claude" "$HOME/.agents"; do
  if [ -d "$root" ]; then
    mkdir -p "$root/skills"
    ln -sfn "$SKILL_DIR" "$root/skills/social_media_analyzer"
    echo "    linked -> $root/skills/social_media_analyzer"
    linked=1
  fi
done
[ "$linked" -eq 1 ] || echo "    (no agent dir found under ~/.claude or ~/.agents; skill still usable via 'analyze-media')"

echo "==> putting analyze-media on PATH"
mkdir -p "$HOME/.local/bin"
ln -sfn "$SKILL_DIR/scripts/analyze-media" "$HOME/.local/bin/analyze-media"
echo "    linked -> ~/.local/bin/analyze-media"
case ":$PATH:" in
  *":$HOME/.local/bin:"*) ;;
  *) echo "    NOTE: ~/.local/bin is not on your PATH; add it to your shell profile." ;;
esac

echo
echo "done. Try:  analyze-media \"https://www.instagram.com/reel/XXXXXXXXX/\""
