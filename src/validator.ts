import { PasswordPolicy } from "./policy.js";
import { WeakPolicy, MediumPolicy, StrongPolicy, EnterprisePolicy } from "./presets.js";
import type { ValidationResult } from "./policy.js";

/**
 * Validate a password against a custom policy.
 * @param password The password string to validate
 * @param policy A PasswordPolicy instance
 * @returns ValidationResult with validity and errors
 */
export function validateWithPolicy(password: string, policy: PasswordPolicy): ValidationResult {
  return policy.validate(password);
}

/**
 * Validate a password against the WeakPolicy preset.
 */
export function validateWeak(password: string): ValidationResult {
  return WeakPolicy().validate(password);
}

/**
 * Validate a password against the MediumPolicy preset.
 */
export function validateMedium(password: string): ValidationResult {
  return MediumPolicy().validate(password);
}

/**
 * Validate a password against the StrongPolicy preset.
 */
export function validateStrong(password: string): ValidationResult {
  return StrongPolicy().validate(password);
}

/**
 * Validate a password against the EnterprisePolicy preset.
 */
export function validateEnterprise(password: string): ValidationResult {
  return EnterprisePolicy().validate(password);
}
