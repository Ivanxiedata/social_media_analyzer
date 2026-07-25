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
1. Run the script on the URL:
   ```bash
   ~/.claude/skills/social_media_analyzer/scripts/analyze-media "<url>"
   ```
   Optional 2nd arg is the browser to pull cookies from (default `chrome`), e.g. `... "<url>" firefox`.
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

## First-time setup (one-time, macOS)
```bash
brew install yt-dlp whisper-cpp ffmpeg
mkdir -p ~/.cache/whisper-cpp
curl -L -o ~/.cache/whisper-cpp/ggml-base.bin \
  https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin
```

## Common issues
- **"Extracted 0 cookies"** — Chrome cookies couldn't be decrypted; fine for public posts (script auto-retries without cookies). For login-gated content, approve the macOS Keychain prompt for "Chrome Safe Storage", or pass a different browser as the 2nd arg.
- **Transcript says "(transcription failed)"** — the whisper model is missing; rerun the setup step.
- **No frames / no video** — check `~/social-media-analysis/<id>/yt-dlp.log`.
