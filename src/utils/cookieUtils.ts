/**
 * Cloudflare Cookie Management Utilities
 * 
 * This utility handles the actual Cloudflare cookies based on user consent.
 * It does NOT create tracking cookies - it only manages existing CF cookies.
 */

export interface CloudflareCookieInfo {
    name: string;
    category: 'necessary' | 'performance' | 'functional';
    canBeDisabled: boolean;
}

// Map of Cloudflare cookies and their categories
export const CLOUDFLARE_COOKIE_MAP: CloudflareCookieInfo[] = [
    // Strictly Necessary (cannot be disabled)
    { name: '__cf_bm', category: 'necessary', canBeDisabled: false },
    { name: 'cf_clearance', category: 'necessary', canBeDisabled: false },
    { name: '__cfruid', category: 'necessary', canBeDisabled: false },
    { name: '_cfuvid', category: 'necessary', canBeDisabled: false },
    { name: '__cflb', category: 'necessary', canBeDisabled: false },

    // Performance (can be managed via CF dashboard)
    { name: 'cf_ob_info', category: 'performance', canBeDisabled: true },
    { name: 'cf_use_ob', category: 'performance', canBeDisabled: true },

    // Functional (can be managed via CF dashboard)
    { name: '__cfwaitingroom', category: 'functional', canBeDisabled: true },
    { name: '__cfseq', category: 'functional', canBeDisabled: true },
];

/**
 * Get all cookies currently set in the browser
 */
export function getCurrentCookies(): string[] {
    if (typeof document === 'undefined') return [];

    return document.cookie
        .split(';')
        .map(cookie => cookie.trim().split('=')[0])
        .filter(name => name.length > 0);
}

/**
 * Get Cloudflare cookies currently present in the browser
 */
export function getCloudflareCookies(): CloudflareCookieInfo[] {
    const currentCookies = getCurrentCookies();

    return CLOUDFLARE_COOKIE_MAP.filter(cfCookie =>
        currentCookies.includes(cfCookie.name)
    );
}

/**
 * Check if a specific Cloudflare cookie is present
 */
export function hasCloudflareCookie(cookieName: string): boolean {
    const currentCookies = getCurrentCookies();
    return currentCookies.includes(cookieName);
}

/**
 * Get consent requirements based on detected cookies
 */
export function getRequiredConsent(): {
    necessary: string[];
    performance: string[];
    functional: string[];
} {
    const presentCookies = getCloudflareCookies();

    return {
        necessary: presentCookies
            .filter((c: CloudflareCookieInfo) => c.category === 'necessary')
            .map((c: CloudflareCookieInfo) => c.name),
        performance: presentCookies
            .filter((c: CloudflareCookieInfo) => c.category === 'performance')
            .map((c: CloudflareCookieInfo) => c.name),
        functional: presentCookies
            .filter((c: CloudflareCookieInfo) => c.category === 'functional')
            .map((c: CloudflareCookieInfo) => c.name)
    };
}

/**
 * Generate a consent summary for transparency
 */
export function generateConsentSummary(): {
    detectedCookies: CloudflareCookieInfo[];
    consentRequired: boolean;
    nonEssentialCookies: CloudflareCookieInfo[];
} {
    const detected = getCloudflareCookies();
    const nonEssential = detected.filter((c: CloudflareCookieInfo) => c.canBeDisabled);

    return {
        detectedCookies: detected,
        consentRequired: nonEssential.length > 0,
        nonEssentialCookies: nonEssential
    };
}

/**
 * Check if consent banner should be shown based on detected cookies
 */
export function shouldShowConsentBanner(): boolean {
    // Only show if non-essential cookies are detected
    const summary = generateConsentSummary();
    return summary.consentRequired;
}

// Note: We cannot actually delete Cloudflare cookies from client-side
// as they are HttpOnly and Secure. The consent mainly serves as:
// 1. Legal compliance (informing users)
// 2. Preference recording (for analytics/monitoring)
// 3. Future cookie setting prevention (via CF dashboard configuration)