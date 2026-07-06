import { PasswordPolicy } from "./policy.js";

/**
 * A weak policy — minimal requirements.
 * Useful for testing or low‑security contexts.
 */
export const WeakPolicy = () =>
    new PasswordPolicy()
        .minLength(6);

/**
 * A medium policy — balanced security.
 * Requires uppercase and numbers, minimum length 8.
 */
export const MediumPolicy = () =>
    new PasswordPolicy()
        .minLength(8)
        .requireUppercase()
        .requireNumber();

/**
 * A strong policy — recommended for most applications.
 * Requires uppercase, lowercase, number, and symbol, minimum length 12.
 */
export const StrongPolicy = () =>
    new PasswordPolicy()
        .minLength(12)
        .requireUppercase()
        .requireLowercase()
        .requireNumber()
        .requireSymbol();

/**
 * An enterprise policy — stricter rules.
 * Minimum length 16, all character types required,
 * blacklist common weak words, and enforce custom rules.
 */
export const EnterprisePolicy = () =>
    new PasswordPolicy()
        .minLength(16)
        .requireUppercase()
        .requireLowercase()
        .requireNumber()
        .requireSymbol()
        .blacklist(["password", "123456", "qwerty", "admin"])
        .customRule(
            (pw) => !pw.toLowerCase().includes("companyname"),
            "Password must not contain the company name"
        );
