# 🛠️ Supported Stacks

Shadow Gravity selects specific, high-reliability tools optimized for autonomous AI development.

## 📱 Mobile

| Framework | Context | Why? |
| :--- | :--- | :--- |
| **Flutter** | `flutter` | **Type Safety**. Strong typing (Dart) reduces runtime errors for AI-generated code. |
| **Expo** | `expo` | **Rapid Prototyping**. React Native environment optimized for ease of use. |

## 🕸️ Web

| Framework | Context | Why? |
| :--- | :--- | :--- |
| **Next.js** | `next_node` | **Full Stack**. Utilizes App Router and TypeScript for scalable applications. |
| **React** | `react_node` | **Client Side**. Powered by Vite for fast development cycles. |

## 🔙 Backend

| Framework | Context | Why? |
| :--- | :--- | :--- |
| **Node.js** | `node_express`| **Standard**. Express + TypeScript + Zod offers robust validation and type safety. |
| **Python** | `python_fastapi`| **Data Science Ready**. FastAPI + Pydantic provides excellent schema validation and AI integration capabilities. |

## 🚀 Environment Enforcement

Regardless of the stack, Shadow Gravity enforces:

1.  **Strict Mode**: TypeScript/Python types are mandatory.
2.  **Linting**: Strict rules against `console.log` and `TODO` comments in production code.
3.  **Unified Entry**: The `arise` script provides a consistent interface for all projects.
