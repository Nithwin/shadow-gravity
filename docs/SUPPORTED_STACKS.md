# 🛠️ Supported Stacks

Shadow Gravity is opinionated. We choose the best tools for AI Agents to manipulate safely and effectively.

## 📱 Mobile

| Framework | Context | Why? |
| :--- | :--- | :--- |
| **Flutter** | `flutter` | **Zero-Ambiguity UI**. Everything is a Widget. Strong typing (Dart) prevents many runtime errors. |
| **Expo** | `expo` | **Fast Iteration**. React Native without the native module headaches. Good for agents familiar with JS/TS. |

## 🕸️ Web

| Framework | Context | Why? |
| :--- | :--- | :--- |
| **Next.js** | `next_node` | **The Monorepo King**. Best for full-stack apps. We enforce App Router and TypeScript. |
| **React** | `react_node` | **Pure Client**. Powered by Vite. Fast, simple, and creates a clear separation of concerns. |

## 🔙 Backend

| Framework | Context | Why? |
| :--- | :--- | :--- |
| **Node.js** | `node_express`| **Industry Standard**. Express + TypeScript + Zod. It's the "boring" choice that works perfectly. |
| **Python** | `python_fastapi`| **AI Native**. FastAPI + Pydantic. Perfect if you plan to integrate LLMs, RAG, or Data Science directly into the backend. |

## 🚀 The Shadow Wrapper

Regardless of the stack, Shadow Gravity injects:

1.  **Strict Mode**: TypeScript/Python types are enforced.
2.  **Linter Rules**: No `console.log`, `print`, or `TODO` allowed in production.
3.  **Arise Script**: A unified entry point for the agent to start working.
