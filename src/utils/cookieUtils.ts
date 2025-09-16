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
export const CLOUDFLARE_COOKIE_MAP: Record<string, CloudflareCookieInfo> = {
    // Strictly Necessary (cannot be disabled)
    '__cf_bm': { name: '__cf_bm', category: 'necessary', canBeDisabled: false },
    'cf_clearance': { name: 'cf_clearance', category: 'necessary', canBeDisabled: false },
    '__cfruid': { name: '__cfruid', category: 'necessary', canBeDisabled: false },
    '_cfuvid': { name: '_cfuvid', category: 'necessary', canBeDisabled: false },
    '__cflb': { name: '__cflb', category: 'necessary', canBeDisabled: false },

    // Performance (can be managed via CF dashboard)
    'cf_ob_info': { name: 'cf_ob_info', category: 'performance', canBeDisabled: true },
    'cf_use_ob': { name: 'cf_use_ob', category: 'performance', canBeDisabled: true },

    // Functional (can be managed via CF dashboard)
    '__cfwaitingroom': { name: '__cfwaitingroom', category: 'functional', canBeDisabled: true },
    '__cfseq': { name: '__cfseq', category: 'functional', canBeDisabled: true },
};

/**
 * Get all cookies currently set in the browser
 */
export function getCurrentCookies(): string[] {
    if (typeof document === 'undefined') return [];

    return document.cookie
        .split(';')
        .map(cookie => cookie.trim().split('=')[0])
        .filter(name => name.length > 0);
}/**
 * Get Cloudflare cookies currently detected
 */
export function getCloudflareCookies(): CloudflareCookieInfo[] {
    const currentCookies = getCurrentCookies();

    return currentCookies
        .filter(name => name in CLOUDFLARE_COOKIE_MAP)
        .map(name => CLOUDFLARE_COOKIE_MAP[name as keyof typeof CLOUDFLARE_COOKIE_MAP]);
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
            .filter(c => c.category === 'necessary')
            .map(c => c.name),
        performance: presentCookies
            .filter(c => c.category === 'performance')
            .map(c => c.name),
        functional: presentCookies
            .filter(c => c.category === 'functional')
            .map(c => c.name)
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
    const nonEssential = detected.filter(c => c.canBeDisabled);

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

/**
 * Get suggested consent settings based on detected cookies
 */
export function getSuggestedConsent(): {
    necessary: boolean;
    performance: boolean;
    functional: boolean;
} {
    const detectedCookies = getCloudflareCookies();

    return {
        necessary: true, // Always true
        performance: detectedCookies.some(cookie => cookie.category === 'performance'),
        functional: detectedCookies.some(cookie => cookie.category === 'functional')
    };
}

/**
 * Attempt to delete a specific cookie
 * Note: Most Cloudflare cookies are HttpOnly/Secure and cannot be deleted from client-side
 */
export function deleteCookie(name: string): boolean {
    if (typeof document === 'undefined') return false;

    try {
        // Try multiple deletion approaches for different cookie configurations
        const deletionPaths = [
            '', // Current path
            '/', // Root path
            window.location.pathname, // Current pathname
        ];

        const deletionDomains = [
            '', // Current domain
            window.location.hostname, // Current hostname
            `.${window.location.hostname}`, // Subdomain wildcard
        ];

        let deleted = false;

        for (const path of deletionPaths) {
            for (const domain of deletionDomains) {
                // Build deletion string
                let deleteString = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
                if (path) deleteString += ` path=${path};`;
                if (domain) deleteString += ` domain=${domain};`;
                deleteString += ' SameSite=Lax;'; // Add SameSite for modern browsers

                document.cookie = deleteString;

                // Check if deletion was successful
                if (!getCurrentCookies().includes(name)) {
                    deleted = true;
                    break;
                }
            }
            if (deleted) break;
        }

        return deleted;
    } catch (error) {
        console.warn(`Failed to delete cookie ${name}:`, error);
        return false;
    }
}

/**
 * Delete cookies based on consent preferences
 * Returns info about deletion attempts and their success
 */
export function deleteCookiesBasedOnConsent(consent: {
    necessary: boolean;
    performance: boolean;
    functional: boolean;
}): {
    attempted: string[];
    deleted: string[];
    failed: string[];
    protectedCookies: string[];
} {
    const detectedCookies = getCloudflareCookies();
    const attempted: string[] = [];
    const deleted: string[] = [];
    const failed: string[] = [];
    const protectedCookies: string[] = [];

    for (const cookie of detectedCookies) {
        // Don't attempt to delete necessary cookies
        if (cookie.category === 'necessary') {
            protectedCookies.push(cookie.name);
            continue;
        }

        // Only delete cookies if user has explicitly denied consent for that category
        let shouldDelete = false;
        if (cookie.category === 'performance' && consent.performance === false) {
            shouldDelete = true;
        }
        if (cookie.category === 'functional' && consent.functional === false) {
            shouldDelete = true;
        }

        // Skip if user has consented to this category OR if no explicit decision made
        if (!shouldDelete) {
            continue;
        }

        // Attempt to delete the cookie
        attempted.push(cookie.name);
        const success = deleteCookie(cookie.name);

        if (success) {
            deleted.push(cookie.name);
        } else {
            failed.push(cookie.name);
        }
    }

    return { attempted, deleted, failed, protectedCookies };
}

// Note: Most Cloudflare cookies are HttpOnly and Secure, making them impossible to delete from client-side.
// This system attempts deletion but also provides transparency about what can/cannot be deleted.
// The consent mainly serves for:
// 1. Legal compliance (informing users about cookie usage)
// 2. Preference recording (for analytics/monitoring)
// 3. Future cookie setting prevention (via Cloudflare dashboard configuration)
// 4. Attempted cleanup of client-accessible cookies