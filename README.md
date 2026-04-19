# CodePad

A browser-based code editor with multi-language execution, AI-assisted coding, and real-time output — built with React and Material UI.

**Live Demo:** [code.isoumya.xyz](https://code.isoumya.xyz) &nbsp;·&nbsp; **Repository:** [github.com/SoumyaEXE/CodePad](https://github.com/SoumyaEXE/CodePad)

---

## Overview

CodePad is a frontend-only cloud IDE that lets you write and execute code in the browser without any local setup. It combines a Monaco-powered editor with OneCompiler's execution engine and an integrated AI assistant for real-time debugging and code explanations.

---

## Features

**Editor**
- Monaco Editor (same engine as VS Code) with syntax highlighting for 80+ languages
- Dark and light theme toggle — flips both the app UI and editor theme simultaneously
- Code auto-saved to `localStorage` on every keystroke and restored on page refresh
- Format Code button — Prettier for JavaScript/TypeScript, basic normalization for other languages
- Adjustable font size, JetBrains Mono font, minimap toggle

**Execution**
- Run button in the app navbar triggers execution via OneCompiler embed postMessage API
- Supports stdin, stdout, stderr, and execution time
- Confetti animation fires on successful execution

**AI Assistant**
- Sidebar powered by Tambo AI SDK with Groq (llama-3.3-70b-versatile) as the LLM backend
- Two modes: **Fix Code** (attaches current editor code automatically) and **Ask Doubt** (general Q&A)
- Apply Fix button — extracts corrected code from AI response and pushes it directly into the editor
- Conversation history maintained per session

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| Framework | React 19, Vite |
| UI Components | Material UI (MUI v5) |
| Editor | Monaco Editor via `@monaco-editor/react` |
| Code Execution | OneCompiler Embed API |
| AI SDK | Tambo AI (`@tambo-ai/react`) |
| LLM Backend | Groq SDK (`groq-sdk`) — llama-3.3-70b-versatile |
| Formatting | Prettier (browser standalone) |
| Animation | canvas-confetti |
| Styling | Emotion, MUI `sx` props |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SoumyaEXE/CodePad.git
cd CodePad/codepad-app

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

Open `.env` and fill in your keys:

```env
VITE_TAMBO_API_KEY=your_tambo_api_key
VITE_GROQ_API_KEY=your_groq_api_key
```

```bash
# 4. Start development server
npm run dev
```

### Getting API Keys

| Key | Where to get it |
| :--- | :--- |
| `VITE_TAMBO_API_KEY` | [tambo.ai](https://tambo.ai) → Settings → API Keys |
| `VITE_GROQ_API_KEY` | [console.groq.com](https://console.groq.com) → API Keys |

---

## Project Structure

```
codepad-app/
├── src/
│   ├── components/
│   │   ├── Editor.jsx          # Monaco editor + iframe logic + postMessage handlers
│   │   ├── Navbar.jsx          # Top bar with Run, Format, theme toggle
│   │   ├── AISidebar.jsx       # AI assistant panel
│   │   ├── ChatBubble.jsx      # Message rendering with markdown + syntax highlighting
│   │   └── StatusBar.jsx       # Bottom bar with save and run status
│   ├── hooks/
│   │   ├── useConfetti.js      # Confetti trigger on execution success
│   │   └── useFileSystem.js    # localStorage persistence logic
│   ├── lib/
│   │   ├── groq.js             # Groq client configuration
│   │   └── systemPrompts.js    # AI system prompts for Fix and Doubt modes
│   ├── theme.js                # MUI light and dark theme config
│   └── main.jsx                # App entry point with TamboProvider
├── .env.example
└── vite.config.js
```

---

## Format Code — Technical Notes

The Format button works fully for **JavaScript and TypeScript** via Prettier's browser standalone build.

For Python, C, C++, and Java — full AST-based formatting was not achievable due to the following constraints encountered during development:

- **Piston API** (emkc.org) — initially used to run Black formatter for Python. Returned HTTP 401 after free tier restrictions changed. Removed to prevent runtime failures.
- **Prettier** — by design only supports JS, TS, HTML, and CSS. No support for systems languages.
- **WebAssembly formatters** (e.g. clang-format via WASM) — binary bundle size exceeds 40MB, unsuitable for static hosting.
- **Server-side formatting** — requires a backend, which is outside the scope of a static frontend deployment.

For unsupported languages, the formatter applies a best-effort client-side cleanup: tab-to-space normalization, trailing whitespace removal, blank line collapsing, and brace-based indentation correction for C-style languages.

---

## Deployment

The app is a fully static Vite build and can be deployed to any static hosting provider.

```bash
npm run build
# Output is in the dist/ folder
```

---

## License

MIT License. See [LICENSE](./LICENSE) for details.

---

*Built by [Soumyadeep](https://github.com/SoumyaEXE)*