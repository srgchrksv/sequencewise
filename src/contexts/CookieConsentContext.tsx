'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { shouldShowConsentBanner, getSuggestedConsent, deleteCookiesBasedOnConsent } from '@/utils/cookieUtils';

interface ConsentState {
    necessary: boolean;
    performance: boolean;
    functional: boolean;
    timestamp: number;
}

interface CookieConsentContextType {
    consent: ConsentState;
    updateConsent: (newConsent: Partial<ConsentState>) => void;
    hasConsented: boolean;
    showConsentBanner: () => void;
    resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

const CONSENT_KEY = 'cf-consent-state';
const CONSENT_VERSION = '1.0'; // Update this when cookie policy changes

const defaultConsent: ConsentState = {
    necessary: true,
    performance: false,
    functional: false,
    timestamp: 0
};

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
    const [consent, setConsent] = useState<ConsentState>(defaultConsent);
    const [hasConsented, setHasConsented] = useState(false);
    const [forceShowBanner, setForceShowBanner] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Mark as hydrated to prevent SSR mismatch
        setIsHydrated(true);

        // Check for existing consent in localStorage
        const checkConsent = () => {
            const savedConsent = localStorage.getItem(CONSENT_KEY);
            if (savedConsent) {
                try {
                    const parsed = JSON.parse(savedConsent);
                    const oneYear = 365 * 24 * 60 * 60 * 1000; // 365 days

                    // Check if consent is still valid
                    if (
                        parsed.version === CONSENT_VERSION &&
                        parsed.timestamp &&
                        (Date.now() - parsed.timestamp < oneYear)
                    ) {
                        setConsent(parsed);
                        setHasConsented(true);
                        return true;
                    } else {
                        // Remove expired consent
                        localStorage.removeItem(CONSENT_KEY);
                    }
                } catch (error) {
                    console.warn('Invalid stored consent data:', error);
                    localStorage.removeItem(CONSENT_KEY);
                }
            }

            return false;
        };

        // No valid consent found - check if we actually need to show consent
        if (!checkConsent()) {
            const needsConsent = shouldShowConsentBanner();

            if (needsConsent) {
                // Auto-activate consent categories for detected cookies
                const suggestedConsent = getSuggestedConsent();
                setConsent({
                    ...suggestedConsent,
                    timestamp: 0 // Don't save yet, user needs to confirm
                });
                setHasConsented(false); // Show consent banner
            } else {
                // No cookies detected, no consent needed
                setHasConsented(true);
            }
        }
    }, []);

    const updateConsent = (newConsent: Partial<ConsentState>) => {
        const updatedConsent = {
            ...consent,
            ...newConsent,
            necessary: true, // Always required
            timestamp: Date.now()
        };

        const consentWithVersion = {
            ...updatedConsent,
            version: CONSENT_VERSION
        };

        // Only attempt cookie deletion if user has made an active consent decision
        // (not just auto-suggested consent from detected cookies)
        const deletionResult = updatedConsent.timestamp > 0 ?
            deleteCookiesBasedOnConsent(updatedConsent) :
            { attempted: [], deleted: [], failed: [], protectedCookies: [] };

        // Debug logging for development
        if (process.env.NODE_ENV === 'development') {
            console.log('Consent update debug:', {
                hasTimestamp: updatedConsent.timestamp > 0,
                consent: updatedConsent,
                deletionAttempted: deletionResult.attempted.length > 0,
                deletionResult
            });
        }

        setConsent(updatedConsent);
        setHasConsented(true);
        setForceShowBanner(false);

        try {
            // Store in localStorage for persistence across sessions
            localStorage.setItem(CONSENT_KEY, JSON.stringify(consentWithVersion));
        } catch (error) {
            console.warn('Failed to save cookie consent:', error);
        }

        // Dispatch custom event for other components to listen to, including deletion results
        window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
            detail: {
                consent: updatedConsent,
                cookieDeletion: deletionResult
            }
        }));

        // Log deletion results for user transparency (in development)
        if (process.env.NODE_ENV === 'development' && deletionResult.attempted.length > 0) {
            console.log('Cookie deletion attempt results:', deletionResult);
        }
    };

    const showConsentBanner = () => {
        setForceShowBanner(true);
    };

    const resetConsent = () => {
        localStorage.removeItem(CONSENT_KEY);
        setConsent(defaultConsent);
        setHasConsented(false);
        setForceShowBanner(true);
    };

    const value: CookieConsentContextType = {
        consent,
        updateConsent,
        hasConsented: isHydrated && hasConsented && !forceShowBanner,
        showConsentBanner,
        resetConsent
    };

    return (
        <CookieConsentContext.Provider value={value}>
            {children}
        </CookieConsentContext.Provider>
    );
}

export function useCookieConsent() {
    const context = useContext(CookieConsentContext);
    if (!context) {
        throw new Error('useCookieConsent must be used within a CookieConsentProvider');
    }
    return context;
}

// Hook to check if specific cookie categories are enabled
export function useCookieCategory(category: keyof Omit<ConsentState, 'timestamp'>) {
    const { consent, hasConsented } = useCookieConsent();

    // If user hasn't consented yet, assume false for optional cookies
    if (!hasConsented && category !== 'necessary') {
        return false;
    }

    return consent[category];
}

// Hook to listen to cookie consent changes
export function useCookieConsentListener(callback: (data: {
    consent: ConsentState;
    cookieDeletion?: {
        attempted: string[];
        deleted: string[];
        failed: string[];
        protectedCookies: string[];
    };
}) => void) {
    useEffect(() => {
        const handleConsentUpdate = (event: CustomEvent) => {
            // Handle both old format (just consent) and new format (consent + deletion results)
            if (event.detail.consent) {
                callback(event.detail);
            } else {
                // Legacy format - just consent object
                callback({ consent: event.detail });
            }
        };

        window.addEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);

        return () => {
            window.removeEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
        };
    }, [callback]);
}