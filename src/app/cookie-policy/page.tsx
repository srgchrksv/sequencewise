'use client';

import { Shield, Settings } from 'lucide-react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import PolicyHeader from '@/components/PolicyHeader';
import { CONTACT, LEGAL } from '@/config/constants';

const COOKIE_CATEGORIES = [
    {
        category: 'Necessary Cookies',
        description: 'Essential for security and website functionality. Cannot be disabled.',
        cookies: ['__cf_bm', 'cf_clearance', '__cfruid', '_cfuvid', '__cflb']
    },
    {
        category: 'Performance Cookies',
        description: 'Help improve website performance and user experience.',
        cookies: ['cf_ob_info', 'cf_use_ob']
    },
    {
        category: 'Functional Cookies',
        description: 'Enable enhanced functionality and traffic management.',
        cookies: ['__cfwaitingroom', '__cfseq']
    }
];

export default function CookiePolicyPage() {
    const { consent, showConsentBanner, resetConsent } = useCookieConsent();

    return (
        <>
            <PolicyHeader title="Cookie Policy" />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Shield className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
                                <p className="text-gray-600 mt-1">Last updated: {LEGAL.cookiePolicyEffectiveDate}</p>
                            </div>
                        </div>

                        <div className="prose prose-gray max-w-none">
                            <p className="text-lg text-gray-700">
                                This website uses cookies for security, performance, and functionality.
                            </p>
                        </div>

                        {/* Current Consent Status */}
                        <div className="bg-gray-50 rounded-lg p-6 mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Your Current Cookie Preferences
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                    <span className="text-sm font-medium text-gray-700">Necessary</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                                        Always Active
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                    <span className="text-sm font-medium text-gray-700">Performance</span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded ${consent.performance
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {consent.performance ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                    <span className="text-sm font-medium text-gray-700">Functional</span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded ${consent.functional
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {consent.functional ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={showConsentBanner}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                                >
                                    Update Preferences
                                </button>
                                <button
                                    onClick={resetConsent}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors"
                                >
                                    Reset All Cookies
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cookie Categories */}
                    <div className="space-y-6">
                        {COOKIE_CATEGORIES.map((category, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{category.category}</h2>
                                <p className="text-gray-600 mb-4">{category.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {category.cookies.map((cookieName, cookieIndex) => (
                                        <span key={cookieIndex} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-mono">
                                            {cookieName}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-2">Contact</h2>
                        <p className="text-gray-700 text-sm">
                            Questions? Email <a href={`mailto:${CONTACT.email}`} className="text-blue-600 hover:text-blue-700 underline">{CONTACT.email}</a>
                        </p>
                        <p className="text-gray-700 text-sm mt-2">
                            See our <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</a> for data handling details.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}