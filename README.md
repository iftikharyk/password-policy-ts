# password-policy-ts

A **TypeScript-first password policy enforcement library** with typed errors, fluent API, presets, and validation helpers.  
Designed for modern applications that need secure, customizable password validation.

---

## 🚀 Installation

```bash
npm install password-policy-ts

## ✨ Features
- 🔒 **Typed errors** for each rule violation (`PasswordTooShortError`, `MissingUppercaseError`, etc.)
- 🧩 **Fluent API** for building custom policies
- 📦 **Presets** (`WeakPolicy`, `MediumPolicy`, `StrongPolicy`, `EnterprisePolicy`)
- ⚡ **Convenience validators** (`validateWeak`, `validateStrong`, etc.)
- 🛠 **Custom rules** and blacklist support
- ✅ Works in **Node.js** and **browser environments**
- 🧑‍💻 **TypeScript-first design** — strict types, IDE autocompletion, and safer code

## 📖 Usage

### Custom Policy
```ts
import { PasswordPolicy } from "password-policy-ts";

const policy = new PasswordPolicy()
  .minLength(8)
  .requireUppercase()
  .requireNumber()
  .requireSymbol();

const result = policy.validate("Hello123!");
console.log(result.valid);   // true or false
console.log(result.errors);  // array of typed Error objects