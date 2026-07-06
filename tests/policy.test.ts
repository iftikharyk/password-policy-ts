import { describe, it, expect } from "vitest";
import { PasswordPolicy } from "../src/policy.js";
import {
  PasswordTooShortError,
  MissingUppercaseError,
  MissingLowercaseError,
  MissingNumberError,
  MissingSymbolError,
  BlacklistedWordError,
  CustomRuleError
} from "../src/errors.js";

describe("PasswordPolicy", () => {
  it("rejects passwords shorter than minLength", () => {
    const policy = new PasswordPolicy().minLength(8);
    const result = policy.validate("short");
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toBeInstanceOf(PasswordTooShortError);
  });

  it("rejects passwords missing uppercase", () => {
    const policy = new PasswordPolicy().requireUppercase();
    const result = policy.validate("lowercase123!");
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toBeInstanceOf(MissingUppercaseError);
  });

  it("rejects passwords missing lowercase", () => {
    const policy = new PasswordPolicy().requireLowercase();
    const result = policy.validate("UPPERCASE123!");
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toBeInstanceOf(MissingLowercaseError);
  });

  it("rejects passwords missing number", () => {
    const policy = new PasswordPolicy().requireNumber();
    const result = policy.validate("NoNumbersHere!");
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toBeInstanceOf(MissingNumberError);
  });

  it("rejects passwords missing symbol", () => {
    const policy = new PasswordPolicy().requireSymbol();
    const result = policy.validate("NoSymbols123");
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toBeInstanceOf(MissingSymbolError);
  });

  it("rejects passwords containing blacklisted words", () => {
    const policy = new PasswordPolicy().blacklist(["password", "admin"]);
    const result = policy.validate("mypassword123!");
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toBeInstanceOf(BlacklistedWordError);
  });

  it("rejects passwords failing custom rule", () => {
    const policy = new PasswordPolicy().customRule(
      (pw) => !pw.includes("xyz"),
      "Password must not contain 'xyz'"
    );
    const result = policy.validate("abcxyz123!");
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toBeInstanceOf(CustomRuleError);
  });

  it("accepts a strong valid password", () => {
    const policy = new PasswordPolicy()
      .minLength(8)
      .requireUppercase()
      .requireLowercase()
      .requireNumber()
      .requireSymbol();

    const result = policy.validate("ValidPass123!");
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });
});