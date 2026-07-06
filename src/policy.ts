import {
  PasswordTooShortError,
  PasswordTooLongError,
  MissingUppercaseError,
  MissingLowercaseError,
  MissingNumberError,
  MissingSymbolError,
  BlacklistedWordError,
  CustomRuleError
} from "./errors.js";

export interface ValidationResult {
  valid: boolean;
  errors: Error[];
}

export interface PolicyRule {
  validate(password: string): Error | null;
}

export class PasswordPolicy {
  private rules: PolicyRule[] = [];

  /**
   * Minimum length requirement
   */
  minLength(length: number): this {
    this.rules.push({
      validate: (pw) => pw.length < length ? new PasswordTooShortError(length) : null
    });
    return this;
  }

  /**
   * Maximum length requirement
   */
  maxLength(length: number): this {
    this.rules.push({
      validate: (pw) => pw.length > length ? new PasswordTooLongError(length) : null
    });
    return this;
  }

  /**
   * Require at least one uppercase letter
   */
  requireUppercase(): this {
    this.rules.push({
      validate: (pw) => /[A-Z]/.test(pw) ? null : new MissingUppercaseError()
    });
    return this;
  }

  /**
   * Require at least one lowercase letter
   */
  requireLowercase(): this {
    this.rules.push({
      validate: (pw) => /[a-z]/.test(pw) ? null : new MissingLowercaseError()
    });
    return this;
  }

  /**
   * Require at least one number
   */
  requireNumber(): this {
    this.rules.push({
      validate: (pw) => /\d/.test(pw) ? null : new MissingNumberError()
    });
    return this;
  }

  /**
   * Require at least one symbol
   */
  requireSymbol(): this {
    this.rules.push({
      validate: (pw) => /[^A-Za-z0-9]/.test(pw) ? null : new MissingSymbolError()
    });
    return this;
  }

  /**
   * Disallow specific words or substrings
   */
  blacklist(words: string[]): this {
    this.rules.push({
      validate: (pw) => {
        for (const word of words) {
          if (pw.toLowerCase().includes(word.toLowerCase())) {
            return new BlacklistedWordError(word);
          }
        }
        return null;
      }
    });
    return this;
  }

  /**
   * Add a custom rule with a callback
   */
  customRule(callback: (pw: string) => boolean, message: string): this {
    this.rules.push({
      validate: (pw) => callback(pw) ? null : new CustomRuleError(message)
    });
    return this;
  }

  /**
   * Validate a password against all rules
   */
  validate(password: string): ValidationResult {
    const errors = this.rules
      .map(rule => rule.validate(password))
      .filter((err): err is Error => err !== null);

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
