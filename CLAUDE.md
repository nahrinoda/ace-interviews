# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (Next.js 16, port 3000)
- `npm run build` — production build
- `npm run lint` — run ESLint
- No test framework is configured

## Architecture

**Next.js 16 App Router** project using React 19, JavaScript (no TypeScript), Tailwind CSS v4.

### Structure

- `src/app/page.js` — renders `AnthropicPrep` as the sole page
- `src/components/AnthropicPrep.jsx` — main client component; large single-file app containing the full interview prep UI with embedded curriculum, code editor, theming (dark/light), and AI lesson flow
- `src/components/AceInterviews.jsx` — previous version of the main component (no longer used)
- `src/app/api/claude/route.js` — proxy to Anthropic Messages API (uses `ANTHROPIC_API_KEY` env var)
- `src/app/api/speak/route.js` — proxy to ElevenLabs TTS API (uses `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID` env vars)

### Key Patterns

- **Single-page app**: all UI lives in one large client component (`AnthropicPrep.jsx`) with inline styles via theme objects, no CSS modules or component library
- **No SDK usage**: API routes call Anthropic and ElevenLabs via raw `fetch`, not their SDKs
- **Fonts**: Geist (via `next/font/google` in layout), plus external fonts (JetBrains Mono, Syne, Outfit) loaded in the component
- **Curriculum data**: lesson phases, levels, and starter code are defined as constants inside the component files

### Environment Variables

- `ANTHROPIC_API_KEY` — required for AI lesson functionality
- `ELEVENLABS_API_KEY` — required for text-to-speech
- `ELEVENLABS_VOICE_ID` — required for text-to-speech
