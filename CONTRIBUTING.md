# Contributing to Shadow Gravity

First off, thank you for considering contributing to **Shadow Gravity**. The "Shadow Army" grows stronger with every commit.

## 🌑 The Philosophy
This project isn't just a CLI; it's a statement against "AI Slop." We value:
- **Strictness**: Code must be solid.
- **Autonomy**: The tool should help agents fix themselves.
- **Style**: We embrace the "Shadow Monarch" aesthetic.

## 🛠️ How to Contribute

### 1. Fork and Clone
Fork this repository to your own GitHub account and then clone it locally:

```bash
git clone https://github.com/YOUR_USERNAME/shadow-gravity.git
cd shadow-gravity
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Develop
Make your changes. If you are modifying the CLI logic, check `bin/cli.js`. If you are modifying the template (what the user gets), check `template/`.

### 4. Test Locally
To test your changes without publishing, use `npm link`:

```bash
# In the shadow-gravity root
npm link

# In a separate test folder (e.g., ~/Desktop/test-zone)
npx shadow-gravity
```

### 5. Submit a Pull Request
- Push your changes to your fork.
- Open a PR against our `main` branch.
- Describe your changes clearly. "I added a new trap for `console.error`" is a great description.

## 🚨 Code Standards
- **No `any`**: If you write TS, define your types.
- **Clean Logs**: Use `kleur` for colored output. Keep it cinematic.

---
*Arise.*
