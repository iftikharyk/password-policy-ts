/**
 * Error thrown when the password is shorter than the required minimum length.
 */
export class PasswordTooShortError extends Error {
  constructor(min: number) {
    super(`Password must be at least ${min} characters long`);
    this.name = "PasswordTooShortError";
  }
}

/**
 * Error thrown when the password exceeds the maximum allowed length.
 */
export class PasswordTooLongError extends Error {
  constructor(max: number) {
    super(`Password must not exceed ${max} characters`);
    this.name = "PasswordTooLongError";
  }
}

/**
 * Error thrown when the password does not contain an uppercase letter.
 */
export class MissingUppercaseError extends Error {
  constructor() {
    super("Password must include at least one uppercase letter");
    this.name = "MissingUppercaseError";
  }
}

/**
 * Error thrown when the password does not contain a lowercase letter.
 */
export class MissingLowercaseError extends Error {
  constructor() {
    super("Password must include at least one lowercase letter");
    this.name = "MissingLowercaseError";
  }
}

/**
 * Error thrown when the password does not contain a number.
 */
export class MissingNumberError extends Error {
  constructor() {
    super("Password must include at least one number");
    this.name = "MissingNumberError";
  }
}

/**
 * Error thrown when the password does not contain a symbol.
 */
export class MissingSymbolError extends Error {
  constructor() {
    super("Password must include at least one symbol");
    this.name = "MissingSymbolError";
  }
}

/**
 * Error thrown when the password contains a blacklisted word or pattern.
 */
export class BlacklistedWordError extends Error {
  constructor(word: string) {
    super(`Password must not contain blacklisted word: "${word}"`);
    this.name = "BlacklistedWordError";
  }
}

/**
 * Error thrown when the password fails a custom rule.
 */
export class CustomRuleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomRuleError";
  }
}
