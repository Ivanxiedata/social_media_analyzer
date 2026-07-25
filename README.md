# social_media_analyzer

An agent skill that lets a coding agent **analyze a social media video from a link** — Instagram reels, TikTok, YouTube Shorts/videos.

Agents can't watch a video from a URL, so this skill downloads it and turns it into things an agent *can* read:

- **transcript** of the spoken audio (via `whisper-cpp`, local, multilingual)
- **frames** sampled as images (1 every 3s, capped at 40)
- **caption** + **metadata** (author, likes, comments, views, upload date)

It handles **login-gated** posts by reusing your browser cookies.

## Works with any skills-aware CLI

The skill is a standard `SKILL.md` + a plain-bash script, so it works across agents that support the skill format (Claude Code, Codex, and others). Install locations differ per tool; `install.sh` handles the common ones and also drops `analyze-media` on your `PATH` so the skill never depends on a tool-specific path.

## Install

### One command (recommended)
```bash
git clone https://github.com/Ivanxiedata/social_media_analyzer.git
cd social_media_analyzer
./install.sh
```
`install.sh` installs dependencies, downloads the whisper model, links the skill into every agent skills dir it finds (`~/.claude/skills`, `~/.agents/skills`, …), and puts `analyze-media` on your `PATH`.

### Claude Code plugin (one-command install)
```
/plugin marketplace add Ivanxiedata/social_media_analyzer
/plugin install social_media_analyzer
```

### Manual (any agent)
Copy or symlink `skills/social_media_analyzer/` into your agent's skills directory, then install the dependencies below.

## Dependencies
- [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) — download + metadata
- [`ffmpeg`](https://ffmpeg.org/) — audio extraction + frame sampling
- [`whisper-cpp`](https://github.com/ggerganov/whisper.cpp) — transcription (+ the `ggml-base.bin` model)

macOS: `brew install yt-dlp whisper-cpp ffmpeg`. Linux: use your package manager (or `pipx install yt-dlp`). The model download is in `install.sh`.

## Usage
Drop a link to your agent and ask it to analyze the video, or run directly:
```bash
analyze-media "https://www.instagram.com/reel/XXXXXXXXX/"
# optional 2nd arg = browser to pull cookies from (default: chrome)
analyze-media "https://www.tiktok.com/@user/video/123" firefox
```
Output lands in `~/social-media-analysis/<id>/` (`transcript.txt`, `frames/`, `caption.txt`, `meta.json`).

## License
MIT — see [LICENSE](LICENSE).
