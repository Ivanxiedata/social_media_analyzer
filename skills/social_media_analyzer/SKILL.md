---
name: social_media_analyzer
description: Use when the user shares a social media video link (Instagram reel, TikTok, YouTube Short or video) and wants it analyzed — get the transcript, see the on-screen frames, pull the caption/likes/metadata, or break down why it performs well ("analyze this reel", "what makes this video work", "extract the transcript", "engagement patterns").
---

# Social Media Video Analyzer

## Overview
Claude can't watch a video from a URL. This skill downloads the video and turns it into things Claude *can* read: a spoken-audio **transcript**, sampled **frames** (images), and the **caption + metadata** (likes, author, date).

## When to use
- User drops an Instagram / TikTok / YouTube link and asks to analyze it
- "Extract the transcript", "what's said in this reel"
- "Why did this go viral" / "what are its successful patterns"
- Login-gated posts (uses the user's browser cookies)

## Workflow
1. Run the analyzer on the URL:
   ```bash
   analyze-media "<url>"
   ```
   `install.sh` puts `analyze-media` on your `PATH`. If it isn't found, run the bundled copy at `scripts/analyze-media` inside this skill's directory (your agent runtime tells you that directory when the skill loads; on a Claude Code plugin it's `"$CLAUDE_PLUGIN_ROOT"/skills/social_media_analyzer/scripts/analyze-media`).
   Optional 2nd arg is the browser to pull cookies from (default `chrome`), e.g. `analyze-media "<url>" firefox`.
2. It prints the output dir: `~/social-media-analysis/<id>/` containing:
   - `transcript.txt` — whisper transcript of the audio
   - `frames/*.jpg` — 1 frame per 3s (capped at 40)
   - `caption.txt` — post caption
   - `meta.json` — author, likes, comments, views, upload date, url
3. **Read** `caption.txt`, `meta.json`, `transcript.txt`, then **Read a spread of frames** (first / middle / last, plus any that look like scene changes).
4. Analyze from that material.

## Analyzing "why it works"
When asked about successful/viral patterns, look across transcript + frames + metadata for:
- **Hook** — what happens in the first ~2s (cold open, curiosity gap, conflict)
- **Structure** — setup → escalation → payoff; is the value/lesson withheld to the end?
- **Sound-off design** — on-screen captions, one phrase at a time, contrast, punchline color-flips
- **Retention devices** — pacing, cuts, expressive delivery, role/costume switches
- **Shareability** — a quotable/absurd tag line, relatable pain point, "that's me" recognition
- **Funnel** — soft CTA / product placement (in wardrobe, bio, caption)
- **Engagement ratio** — likes vs comments vs views from `meta.json`

## First-time setup (one-time)
Run the installer from the repo root — it installs deps, downloads the whisper model, and links the skill + `analyze-media` into place:
```bash
./install.sh
```
Manual equivalent (macOS/Homebrew):
```bash
brew install yt-dlp whisper-cpp ffmpeg
mkdir -p ~/.cache/whisper-cpp
curl -L -o ~/.cache/whisper-cpp/ggml-base.bin \
  https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin
```
On Linux, install `yt-dlp`, `ffmpeg`, and `whisper-cpp` via your package manager (or `pipx install yt-dlp`), then download the model as above.

## Common issues
- **"Extracted 0 cookies"** — Chrome cookies couldn't be decrypted; fine for public posts (script auto-retries without cookies). For login-gated content, approve the macOS Keychain prompt for "Chrome Safe Storage", or pass a different browser as the 2nd arg.
- **Transcript says "(transcription failed)"** — the whisper model is missing; rerun the setup step.
- **No frames / no video** — check `~/social-media-analysis/<id>/yt-dlp.log`.
