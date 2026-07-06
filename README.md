![npm version](https://img.shields.io/npm/v/password-policy-ts)
![npm downloads](https://img.shields.io/npm/dm/password-policy-ts)
![license](https://img.shields.io/github/license/iftikharyk/password-policy-ts)

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
```
## 📖 Usage

### 🧩 Custom Policy
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
```

### 🏢 Enterprise Policy Example
```ts
import { validateEnterprise } from "password-policy-ts";

const result = validateEnterprise("SuperSecurePass123!@#");
console.log(result.valid); // true
```

### 🧩 API Reference
**Classes**

`PasswordPolicy`
Fluent builder for password rules.
- `.minLength(length: number)`
- `.maxLength(length: number)`
- `.requireUppercase()`
- `.requireLowercase()`
- `.requireNumber()`
- `.requireSymbol()`
- `.blacklist(words: string[])`
- `.customRule(callback: (pw: string) => boolean, message: string)`

Returns a `ValidationResult`:
```ts
interface ValidationResult {
  valid: boolean;
  errors: Error[];
}
```

### ❌ Errors
- `PasswordTooShortError`
- `PasswordTooLongError`
- `MissingUppercaseError`
- `MissingLowercaseError`
- `MissingNumberError`
- `MissingSymbolError`
- `BlacklistedWordError`
- `CustomRuleError`

### 📦 Presets
- `WeakPolicy()`
- `MediumPolicy()`
- `StrongPolicy()`
- `EnterprisePolicy()`

### ⚡ Validators
- `validateWithPolicy(password: string, policy: PasswordPolicy)`
- `validateWeak(password: string)`
- `validateMedium(password: string)`
- `validateStrong(password: string)`
- `validateEnterprise(password: string)`

### 🧪 Testing
This library uses `Vitest`.
Run tests:
```bash
npm run test
```
Run in watch mode:
```bash
npm run dev
```

### 📦 Build
Compile TypeScript:
```bash
npm run build
```
Output will be in `dist/`.

### 🤝 Contributing
- Fork the repo
- Create a feature branch (`git checkout -b feature/my-feature`)
- Commit changes (`git commit -m "Add feature"`)
- Push branch (`git push origin feature/my-feature`)
- Open a Pull Request

### 📜 License
MIT © 2026 Iftikhar