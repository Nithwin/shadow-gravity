# 🌑 Shadow Gravity (v2.0.0)

```text
  ███████╗██╗  ██╗ █████╗ ██████╗  ██████╗ ██╗    ██╗
  ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██║    ██║
  ███████╗███████║███████║██║  ██║██║   ██║██║ █╗ ██║
  ╚════██║██╔══██║██╔══██║██║  ██║██║   ██║██║███╗██║
  ███████║██║  ██║██║  ██║██████╔╝╚██████╔╝╚███╔███╔╝
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚══╝╚══╝
      🌑 GRAVITY PROTOCOL
```

**The Gravitational Anchor for Autonomous AI Agents.**

Shadow Gravity is an **End-to-End Product Builder** that provides your AI Agent with a suite of tools to build, deploy, and verify applications autonomously. It enforces strict architecture and development standards to prevent "AI drift."

## 🚀 Features

### 1. 🏗️ Full-Stack Scaffolding
- **Mobile First**: Flutter & React Native (Expo).
- **Web Applications**: Next.js (Monorepo) & React (Vite).
- **Backend Core**: Industry Standard Node.js (Express + TS) & **Python (FastAPI)**.
- **Monorepo Support**: Automatically configures Mobile + Backend workspaces.

## 📚 Documentation
- [Getting Started](./docs/GETTING_STARTED.md)
- [Supported Stacks](./docs/SUPPORTED_STACKS.md)

### 2. 🛠️ Automation Toolkit (Slash Commands)
Your Agent comes equipped with a library of automation scripts.

| Domain | Command | Description |
| :--- | :--- | :--- |
| **Mobile** | `/mobile build` | Compiles APK (Flutter) or Android Bundle (Expo). |
| **Web** | `/web deploy` | Triggers deployment sequence (e.g., Vercel). |
| **Backend** | `/backend db` | Syncs Database (Prisma generate / migrate). |
| **Backend** | `/backend forge "User email:string"` | Intelligent Schema Generator. |
| **Backend** | `/backend seed` | Automates database seeding. |
| **Ops** | `/ops docker` | Generates Dockerfile & docker-compose.yml. |
| **Ops** | `/ops deploy` | Generates GitHub Actions workflow. |
| **Ops** | `/ops env check` | Verifies environment variables. |
| **Agent** | `/agent remember "Use Postgres"` | Stores permanent context in DECISIONS.md. |
| **Agent** | `/agent verify` | Runs linting to ban `console.log` & `TODO`. |
| **Agent** | `/agent plan` | Visualizes the current strategic plan. |

### 3. 🧠 Context Management
- **Persistent Memory**: Use `/agent remember` to give your agent long-term memory that persists across restarts.
- **Initialization**: `npm run arise` primes the Agent's context with the project mission.
- **Protocol Injection**: Enforces TDD and strict architecture rules via `MISSION.md`.

## 📦 Usage

```bash
# 1. Start the tool
npx shadow-gravity

# 2. Configure your project
# Choose: Mobile, Web, or Custom
# Choose: Monorepo? Backend?

# 3. Initialize the Agent
cd your-project
npm run arise
```

This triggers the **Mission Protocol**, ensuring your agent has the full context and constraints loaded into its memory.

## 🤝 Contributing
Open source contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---
*Powered by Google DeepMind.*
