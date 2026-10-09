# 🛡️ Trust Layer — Enterprise AI Security & Compliance Gateway

[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Azure OpenAI](https://img.shields.io/badge/AI-Azure%20OpenAI-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js%2018+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Trust Layer** is an enterprise middleware gateway that intercepts, sanitizes, and audits interactions between internal applications and frontier LLMs. Integrated with **Azure OpenAI** (`@azure/openai`), Trust Layer enforces strict data governance, redacts Personally Identifiable Information (PII), blocks adversarial prompt injections, and guarantees cryptographic audit logging.

---

## 📌 Architecture & Gateway Flow

```
[ Internal Enterprise App / Agent ]
                 |
                 v  (HTTP / gRPC)
+-------------------------------------------------------------+
|                    Trust Layer Gateway                      |
|         - PII & Confidential Data Masking                   |
|         - Prompt Injection & Jailbreak Filtering            |
|         - Policy Verification & Content Moderation          |
+-------------------------------------------------------------+
                 |
                 v  (Sanitized & Enforced Payload)
+-------------------------------------------------------------+
|                Azure OpenAI Frontier Models                 |
|                   (`@azure/openai` SDK)                     |
+-------------------------------------------------------------+
                 |
                 v  (Model Response)
+-------------------------------------------------------------+
|                 Output Safety Verification                  |
|         - Hallucination check & toxicity filter             |
+-------------------------------------------------------------+
                 |
                 v
[ Secure Response returned with Audit Signature ]
```

---

## 📁 Repository Structure

```text
trust-layer/
├── backend/
│   ├── src/            # Middleware controllers, PII scrubbers & policy engines
│   ├── package.json    # Dependencies (@azure/openai, express, dotenv)
│   └── tsconfig.json   # TypeScript compilation settings
├── LICENSE             # MIT License
└── README.md
```

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone https://github.com/Tarunjit45/trust-layer.git
cd trust-layer/backend

npm install
```

### 2. Configure Azure OpenAI Environment
Create a `.env` file in `backend/`:

```env
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_azure_openai_key
AZURE_OPENAI_DEPLOYMENT=gpt-4o
```

### 3. Build & Run
```bash
npm run build
npm start
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
