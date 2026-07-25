<div align="center">

# Social Media Video Analyzer

**Turn a social video link into evidence an AI agent can actually inspect.**

Instagram Reels · TikTok · YouTube Shorts & videos

<img src="./assets/social-media-analyzer-flow.gif" alt="Animated flow: social video link, authenticated download, transcript and frame extraction, AI analysis, and actionable insights" width="100%" />

**LINK → DOWNLOAD → EXTRACT → ANALYZE → LEARN**

</div>

## See it in action

<p align="center">
  <a href="./assets/social-media-analyzer-walkthrough.mp4">
    <img src="./assets/social-media-analyzer-walkthrough.gif" alt="Autoplaying 28-second Social Media Video Analyzer walkthrough" width="100%" />
  </a>
</p>

<p align="center"><sub>Autoplays above · Click the animation for the full-quality MP4.</sub></p>

## What it does

Agents cannot reliably watch a social video from its URL alone. This skill creates an analysis-ready bundle from the post:

| Output | What it reveals |
| --- | --- |
| `transcript.txt` | Spoken hook, story, payoff, and CTA |
| `frames/*.jpg` | Visual pacing, captions, cuts, products, and scene changes |
| `caption.txt` | Positioning, context, hashtags, and written CTA |
| `meta.json` | Author, date, duration, views, likes, and comments |

The agent reads those signals together to explain not only **what the video says**, but **why it may hold attention, earn shares, or drive action**.

## Use it for

- Extracting a clean transcript from a Reel, TikTok, Short, or video
- Reviewing hooks, structure, pacing, sound-off design, and retention devices
- Finding repeatable creative patterns in strong-performing content
- Studying the relationship between the video, caption, CTA, and engagement
- Inspecting login-gated posts through your own browser session

## Works with your agent

The project is a standard `SKILL.md` plus a plain Bash script. It works with skills-aware tools such as Claude Code, Codex, and others; `install.sh` links it into the agent directories it finds and adds `analyze-media` to your `PATH`.

## Install

### Recommended

```bash
git clone https://github.com/Ivanxiedata/social_media_analyzer.git
cd social_media_analyzer
./install.sh
```

The installer checks dependencies, downloads the Whisper model, links the skill into supported agent directories, and exposes the CLI.

### Claude Code plugin

```text
/plugin marketplace add Ivanxiedata/social_media_analyzer
/plugin install social_media_analyzer
```

### Manual

Copy or symlink `skills/social_media_analyzer/` into your agent's skills directory. Install [`yt-dlp`](https://github.com/yt-dlp/yt-dlp), [`ffmpeg`](https://ffmpeg.org/), [`whisper-cpp`](https://github.com/ggerganov/whisper.cpp), and the `ggml-base.bin` model described in the [skill setup](./skills/social_media_analyzer/SKILL.md#first-time-setup-one-time).

## How to use

Share a supported video URL with your agent and ask a question:

```text
Analyze this reel. Explain the hook, retention devices, payoff, and CTA:
https://www.instagram.com/reel/...
```

Other useful prompts:

```text
Extract the transcript and summarize the argument.
Why does this video work even with the sound off?
Break down the first 3 seconds and suggest five stronger hooks.
Turn this video's structure into a reusable content template.
Compare the engagement signals with the creative choices.
```

Or run the analyzer directly:

```bash
analyze-media "https://www.instagram.com/reel/XXXXXXXXX/"

# Optional second argument: browser used for cookies (default: chrome)
analyze-media "https://www.tiktok.com/@user/video/123" firefox
```

Results are saved to:

```text
~/social-media-analysis/<video-id>/
├── caption.txt
├── meta.json
├── transcript.txt
├── frames/
└── video.*
```

## How the analysis works

1. **Acquire** — downloads the post with `yt-dlp`, using local browser cookies when required.
2. **Transcribe** — converts the audio to 16 kHz mono and runs Whisper locally.
3. **Sample** — captures one frame every three seconds, capped at 40 frames.
4. **Synthesize** — reviews transcript, visuals, caption, and metadata as one story.
5. **Explain** — surfaces the hook, structure, retention devices, shareability, funnel, and engagement signals.

## Notes

- Browser cookies stay on your machine; the script reads them through `yt-dlp`.
- Public posts automatically retry without cookies if cookie access fails.
- Analysis is diagnostic, not a promise that a creative pattern will reproduce past performance.
- Use the tool only for content you are permitted to access and analyze.

Troubleshooting lives in [`SKILL.md`](./skills/social_media_analyzer/SKILL.md#common-issues). Licensed under [MIT](./LICENSE).
