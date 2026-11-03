export const PASSWORD_MIN_LENGTH = 6;

/**
 * Server-side password rules mirror this file: better-auth only checks
 * length by default, so anything stricter is enforced in the form.
 */
export const getPasswordError = (password: string): string | null => {
    const issues: string[] = [];

    if (password.length < PASSWORD_MIN_LENGTH) {
        issues.push(`be at least ${PASSWORD_MIN_LENGTH} characters long`);
    }
    if (!/[A-Z]/.test(password)) {
        issues.push("contain an uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
        issues.push("contain a lowercase letter");
    }

    if (issues.length === 0) {
        return null;
    }

    return `Password must ${issues.join(", ")}.`;
};
