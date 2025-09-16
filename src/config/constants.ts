/**
 * Company and Legal Constants
 * 
 * Centralized configuration for company information, legal policies,
 * and compliance settings used throughout the application.
 */

export const COMPANY = {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Sequencewise',
    tagline: process.env.NEXT_PUBLIC_COMPANY_TAGLINE || 'Research. Create. Market.',
    jurisdiction: process.env.NEXT_PUBLIC_COMPANY_JURISDICTION || 'Masdar City, United Arab Emirates',
    jurisdictionShort: process.env.NEXT_PUBLIC_COMPANY_JURISDICTION_SHORT || 'UAE',
} as const;

export const CONTACT = {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'admin@sequencewise.com',
    website: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://sequencewise.com',
} as const;

export const LEGAL = {
    privacyPolicyEffectiveDate: process.env.NEXT_PUBLIC_PRIVACY_POLICY_EFFECTIVE_DATE || 'September 2025',
    cookiePolicyEffectiveDate: process.env.NEXT_PUBLIC_COOKIE_POLICY_EFFECTIVE_DATE || 'September 2025'
} as const;


// Helper functions
export const getCompanyInfo = () => COMPANY;
export const getContactInfo = () => CONTACT;
export const getLegalInfo = () => LEGAL;


const constants = {
    COMPANY,
    CONTACT,
    LEGAL,
    getCompanyInfo,
    getContactInfo,
    getLegalInfo,
};

export default constants;