'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { shouldShowConsentBanner, generateConsentSummary } from '@/utils/cookieUtils';

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

        // Check for existing consent in sessionStorage first (temporary), then localStorage (persistent)
        const checkConsent = () => {
            // Check session storage for current session consent
            const sessionConsent = sessionStorage.getItem(CONSENT_KEY);
            if (sessionConsent) {
                try {
                    const parsed = JSON.parse(sessionConsent);
                    setConsent(parsed);
                    setHasConsented(true);
                    return true;
                } catch (error) {
                    console.warn('Invalid session consent data:', error);
                }
            }

            // Check localStorage for persistent consent
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
                        // Also store in session for faster access during this session
                        sessionStorage.setItem(CONSENT_KEY, JSON.stringify(parsed));
                        return true;
                    }
                } catch (error) {
                    console.warn('Invalid stored consent data:', error);
                }
            }

            return false;
        };

        // No valid consent found - check if we actually need to show consent
        if (!checkConsent()) {
            // For now, always show consent to test the component
            // TODO: Change back to shouldShowConsentBanner() when ready
            const needsConsent = true; // shouldShowConsentBanner();
            setHasConsented(!needsConsent); // If no consent needed, mark as consented

            console.log('Cookie consent debug:', {
                needsConsent,
                hasConsented: !needsConsent,
                cookieSummary: generateConsentSummary()
            });
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

        setConsent(updatedConsent);
        setHasConsented(true);
        setForceShowBanner(false);

        try {
            // Store in both sessionStorage (for immediate access) and localStorage (for persistence)
            sessionStorage.setItem(CONSENT_KEY, JSON.stringify(consentWithVersion));
            localStorage.setItem(CONSENT_KEY, JSON.stringify(consentWithVersion));
        } catch (error) {
            console.warn('Failed to save cookie consent:', error);
        }

        // Dispatch custom event for other components to listen to
        window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
            detail: updatedConsent
        }));
    };

    const showConsentBanner = () => {
        setForceShowBanner(true);
    };

    const resetConsent = () => {
        localStorage.removeItem(CONSENT_KEY);
        sessionStorage.removeItem(CONSENT_KEY);
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
export function useCookieConsentListener(callback: (consent: ConsentState) => void) {
    useEffect(() => {
        const handleConsentUpdate = (event: CustomEvent) => {
            callback(event.detail);
        };

        window.addEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);

        return () => {
            window.removeEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
        };
    }, [callback]);
}