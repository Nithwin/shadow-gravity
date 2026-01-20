# 🌑 Getting Started with Shadow Gravity

Welcome to the **Shadow Gravity** protocol. This tool allows your AI Agent to scaffold, build, and deploy entire applications autonomously.

## 1. Installation

You don't typically "install" Shadow Gravity. You summon it using `npx`.

```bash
npx shadow-gravity
```

## 2. The Extraction (Scaffolding)

When you run the command, the Shadow Monarch will ask you:

1.  **Project Name**: What do you want to call this extraction?
2.  **Domain**: Mobile, Web, or Custom?
3.  **Stack**:
    *   **Mobile**: Flutter or Expo (React Native).
    *   **Web**: Next.js (Monorepo) or React (Vite).
    *   **Backend**: Node.js or Python (FastAPI).

### Example: Full Stack Monorepo

If you select **Mobile** (Flutter) and ask for a **Backend** (Python), Shadow Gravity will create:

*   `mobile/`: A simplified Flutter app ready for your agent.
*   `backend/`: A FastAPI backend with Pydantic models.
*   `package.json`: A root controller to manage both.

## 3. The Awakening ("Arise")

Once scaffolded, you must **Inititate the Protocol**.

```bash
cd your-project-name
npm run arise
```

This command does two things:
1.  It loads the `MISSION.md` into the agent's context (if using a supporting agent tool).
2.  It creates a focused environment where the agent knows its exact tools and constraints.

## 4. The Arsenal (Slash Commands)

Your agent now has access to powerful slash commands (check `package.json` scripts):

*   `/mobile build` -> Compiles the app.
*   `/backend db` -> Runs migrations.
*   `/web deploy` -> Deploys to Vercel/Netlify.
*   `/agent verify` -> Checks for broken code, `TODO`s, or forbidden patterns.

## 5. Next Steps

- Check out [SUPPORTED_STACKS.md](./SUPPORTED_STACKS.md) to see what's under the hood.
- Read `MISSION.md` in your scaffolded project to see the rules your agent must follow.
