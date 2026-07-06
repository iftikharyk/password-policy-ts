// tests/validator.test.ts

import { describe, it, expect } from "vitest";
import {
  validateWeak,
  validateMedium,
  validateStrong,
  validateEnterprise,
  validateWithPolicy
} from "../src/validator.js";
import { PasswordPolicy } from "../src/policy.js";

describe("Validator Presets", () => {
  it("validateWeak should accept short passwords >= 6 chars", () => {
    const result = validateWeak("abcdef");
    expect(result.valid).toBe(true);
  });

  it("validateWeak should reject passwords shorter than 6 chars", () => {
    const result = validateWeak("abc");
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("validateMedium should reject passwords missing uppercase or number", () => {
    const result = validateMedium("lowercaseonly");
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("validateMedium should accept a valid medium password", () => {
    const result = validateMedium("Password1");
    expect(result.valid).toBe(true);
  });

  it("validateStrong should reject weak passwords", () => {
    const result = validateStrong("WeakPass");
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("validateStrong should accept strong passwords", () => {
    const result = validateStrong("StrongPass123!");
    expect(result.valid).toBe(true);
  });

  it("validateEnterprise should reject passwords with blacklisted words", () => {
    const result = validateEnterprise("password123ADMIN!");
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("validateEnterprise should accept a strong enterprise password", () => {
    const result = validateEnterprise("SuperSecurePass123!@#");
    expect(result.valid).toBe(true);
  });
});

describe("validateWithPolicy", () => {
  it("works with a custom policy", () => {
    const customPolicy = new PasswordPolicy()
      .minLength(10)
      .requireUppercase()
      .requireNumber();

    const result = validateWithPolicy("CustomPass123", customPolicy);
    expect(result.valid).toBe(true);
  });

  it("rejects when custom policy fails", () => {
    const customPolicy = new PasswordPolicy()
      .minLength(10)
      .requireUppercase()
      .requireNumber();

    const result = validateWithPolicy("short", customPolicy);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
