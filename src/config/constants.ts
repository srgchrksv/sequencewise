/**
 * Company and Legal Constants
 * 
 * Centralized configuration for company information, legal policies,
 * and compliance settings used throughout the application.
 */

export const COMPANY = {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Sequencewise',
    tagline: process.env.NEXT_PUBLIC_COMPANY_TAGLINE || 'Research. Create. Market.',
    jurisdiction: process.env.NEXT_PUBLIC_COMPANY_JURISDICTION || 'United Arab Emirates',
    jurisdictionShort: process.env.NEXT_PUBLIC_COMPANY_JURISDICTION_SHORT || 'UAE',
} as const;

export const CONTACT = {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'admin@sequencewise.com',
    website: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://sequencewise.srjchsv.workers.dev',
} as const;

export const LEGAL = {
    privacyPolicyEffectiveDate: process.env.NEXT_PUBLIC_PRIVACY_POLICY_EFFECTIVE_DATE || 'September 2025',
    cookiePolicyEffectiveDate: process.env.NEXT_PUBLIC_COOKIE_POLICY_EFFECTIVE_DATE || 'September 2025',
    minimumAge: parseInt(process.env.NEXT_PUBLIC_MINIMUM_AGE || '13'),
    // Age explanation: 18+ ensures full legal capacity across all jurisdictions
    // This adult-only policy exceeds all international requirements and eliminates compliance complexity
    ageExplanation: {
        under18: 'Adults only - service restricted to users 18 years and older for full legal capacity',
        age18plus: 'Full legal capacity to consent and enter binding agreements in all jurisdictions',
        businessJustification: 'Eliminates parental consent complexity and regulatory risk across all markets'
    }
} as const;

export const DATA_PROCESSING = {
    locations: process.env.NEXT_PUBLIC_DATA_PROCESSING_LOCATIONS || 'United States, Europe, and other jurisdictions',
    primaryServiceProvider: process.env.NEXT_PUBLIC_PRIMARY_SERVICE_PROVIDER || 'Cloudflare',
} as const;

// Helper functions
export const getCompanyInfo = () => COMPANY;
export const getContactInfo = () => CONTACT;
export const getLegalInfo = () => LEGAL;
export const getDataProcessingInfo = () => DATA_PROCESSING;

// Age-related helpers
export const getAgeRequirements = () => ({
    minimumAge: LEGAL.minimumAge,
    isAdult: (age: number) => age >= 18,
    canFullyConsent: (age: number) => age >= 18,
    requiresAccountTermination: (age: number) => age < 18,
    explanation: LEGAL.ageExplanation
});

const constants = {
    COMPANY,
    CONTACT,
    LEGAL,
    DATA_PROCESSING,
    getCompanyInfo,
    getContactInfo,
    getLegalInfo,
    getDataProcessingInfo,
    getAgeRequirements
};

export default constants;