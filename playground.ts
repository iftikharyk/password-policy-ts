import { StrongPolicy, validateStrong } from "./dist/index.js";

const policy = StrongPolicy();
const result = policy.validate("WeakPass");

console.log("Valid?", result.valid);
console.log("Errors:", result.errors.map(e => e.message));

const strongResult = validateStrong("StrongPass123!");
console.log("Strong valid?", strongResult.valid);
