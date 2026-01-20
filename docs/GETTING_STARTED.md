# 🌑 Getting Started with Shadow Gravity

Welcome to the **Shadow Gravity** protocol. This tool allows your AI Agent to scaffold, build, and deploy entire applications autonomously.

## 1. Installation

Run the tool directly using `npx`:

```bash
npx shadow-gravity
```

## 2. Project Initialization

The interactive CLI will prompt you for:

1.  **Project Name**: The name of your new application.
2.  **Domain**: Mobile, Web, or Custom.
3.  **Stack**:
    *   **Mobile**: Flutter or Expo (React Native).
    *   **Web**: Next.js (Monorepo) or React (Vite).
    *   **Backend**: Node.js or Python (FastAPI).

### Example: Full Stack Monorepo

If you select **Mobile** (Flutter) and ask for a **Backend** (Python), Shadow Gravity will creates a monorepo structure:

*   `mobile/`: A Flutter application.
*   `backend/`: A FastAPI backend.
*   `package.json`: A root controller to manage both workspaces.

## 3. Agent Initialization

Once scaffolded, initialize the environment:

```bash
cd your-project-name
npm run arise
```

This command:
1.  Loads the `MISSION.md` into the agent's context.
2.  Prepares the environment for autonomous execution.

## 4. Automation Toolkit

Your agent has access to the following slash commands:

*   `/mobile build`: Compiles the mobile app.
*   `/backend db`: Runs database migrations.
*   `/ops docker`: Generates Docker configuration.
*   `/ops deploy`: Creates deployment workflows.
*   `/agent verify`: Runs static analysis and linting.

## 5. Next Steps

- Check out [SUPPORTED_STACKS.md](./SUPPORTED_STACKS.md) for technical details.
- Read `MISSION.md` in your project root to understand the architectural rules.
