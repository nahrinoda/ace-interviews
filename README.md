# Ace Interviews

An AI-powered interview prep platform I built to prepare for big tech interviews. It uses Claude as a virtual professor — **Professor Chen**, a Stanford CS professor and former Anthropic engineer — who generates tailored lessons, reviews your code with Socratic coaching, and never just hands you the answer.

## My Experience

I built this because I wanted something better than grinding LeetCode blindly. The curriculum here isn't random — it's structured around what top companies actually test, starting from machine-level foundations (binary, memory layout, cache performance) that most engineers skip, through Python mastery, all the way up to full system-building OA problems with multi-tier complexity.

**What the AI does:** Claude powers Professor Chen, who generates focused lessons for each topic, explains why companies care about specific concepts, and provides Socratic hints when you're stuck. He reviews your code and asks guiding questions instead of giving away solutions — the way a real mentor would. There's also text-to-speech via ElevenLabs so you can listen to lessons.

**The questions are hard.** The OA practice section includes multi-tiered system design problems — banking systems, key-value stores, web crawlers, inventory management, file caches — each with 3-4 tiers that progressively increase in complexity. These aren't toy problems; they mirror the kind of challenges you'll face in real interviews.

This project helped me prepare for a major interview that I aced. It's open source — feel free to clone it, use it for your own prep, and contribute back.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- An [Anthropic API key](https://console.anthropic.com/)
- (Optional) An [ElevenLabs](https://elevenlabs.io/) API key and voice ID for text-to-speech

### Clone and Install

```bash
git clone https://github.com/nahrinoda/ace-interviews.git
cd ace-interviews
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key

# Optional — enables text-to-speech for lessons
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_elevenlabs_voice_id
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 16** (App Router) with React 19
- **Tailwind CSS v4** for styling
- **Claude API** (Anthropic) for AI-generated lessons and Socratic coaching
- **ElevenLabs API** for text-to-speech

## Contributing

This project is open for contributions. Whether you want to add new curriculum phases, improve the UI, add new OA problems, or integrate additional features — PRs are welcome.

```bash
# Build
npm run build

# Lint
npm run lint
```
