# 📚 Book Store Application – Playwright BDD Automation

End-to-end automation testing project using **Playwright + TypeScript + Cucumber (BDD)** with **Page Object Model (POM)** architecture.

---

## 🚀 Tech Stack

- Playwright
- TypeScript
- Cucumber (BDD)
- Page Object Model
- Playwright HTML Reporter

---

## 📁 Project Structure
pw-bdd-alr-demo/
│
├── features/
│ ├── register/
│ ├── login/
│ ├── search/
│ └── steps/
│
├── pages/
├── playwright.config.ts
└── package.json

---
## ⚙️ Installation

```bash
npm install
npx playwright install
```

---
## 🧪 Run Tests

Run all Test
```bash
npx playwright test --project=@PRD
```

---
## 🧱 Architecture

- Clean Page Object Model

- BDD (Gherkin) scenarios

- Isolated test scenarios

- Semantic locators (getByRole)

- No hard-coded waits

- Dialog handling for alerts
