'use client';

import { useState, useEffect } from 'react';
import { X, Cookie, Shield, Settings, ExternalLink, Info } from 'lucide-react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { generateConsentSummary, getCurrentCookies } from '@/utils/cookieUtils';

interface CookieCategory {
    id: string;
    name: string;
    description: string;
    required: boolean;
    cookies: {
        name: string;
        description: string;
        duration: string;
        purpose: string;
    }[];
}

const CLOUDFLARE_COOKIES: CookieCategory[] = [
    {
        id: 'necessary',
        name: 'Strictly Necessary Cookies',
        description: 'These cookies are essential for the website to function properly and cannot be disabled.',
        required: true,
        cookies: [
            {
                name: '__cf_bm',
                description: 'Cloudflare bot management cookie that identifies and mitigates automated traffic to protect the site from malicious bots.',
                duration: '30 minutes of continuous inactivity',
                purpose: 'Security and bot protection'
            },
            {
                name: 'cf_clearance',
                description: 'Required for JavaScript detections and stores proof of challenge passed. Necessary to reach the origin server.',
                duration: 'Variable based on security settings',
                purpose: 'Security challenge verification'
            },
            {
                name: '__cfruid',
                description: 'Strictly necessary to support Cloudflare Rate Limiting. Manages incoming traffic and provides visibility on request origins.',
                duration: 'Session-based',
                purpose: 'Rate limiting and traffic management'
            },
            {
                name: '_cfuvid',
                description: 'Used by Rate Limiting Rules to distinguish individual users who share the same IP address (e.g., behind NAT).',
                duration: 'Session-based',
                purpose: 'Rate limiting for shared IP addresses'
            },
            {
                name: '__cflb',
                description: 'Session affinity cookie for Cloudflare Load Balancer. Routes users to the same origin server for optimized performance.',
                duration: 'Several seconds up to 24 hours',
                purpose: 'Load balancing and session affinity'
            }
        ]
    },
    {
        id: 'performance',
        name: 'Performance Cookies',
        description: 'These cookies help improve website performance and provide a better user experience.',
        required: false,
        cookies: [
            {
                name: 'cf_ob_info',
                description: 'Provides information on HTTP status codes, Ray IDs, and data center information for Always Online functionality.',
                duration: '30 seconds',
                purpose: 'Performance optimization and error handling'
            },
            {
                name: 'cf_use_ob',
                description: 'Informs Cloudflare to fetch requested resources from Always Online cache on the designated port.',
                duration: '30 seconds',
                purpose: 'Cache optimization'
            }
        ]
    },
    {
        id: 'functional',
        name: 'Functional Cookies',
        description: 'These cookies enable enhanced functionality and personalization.',
        required: false,
        cookies: [
            {
                name: '__cfwaitingroom',
                description: 'Tracks visitors accessing waiting room enabled pages. Provides queue management for high-traffic scenarios.',
                duration: 'Variable based on waiting room configuration',
                purpose: 'Traffic queue management'
            },
            {
                name: '__cfseq',
                description: 'Sequence rules cookie that tracks the order and timing of user requests for advanced security rules.',
                duration: 'Variable based on sequence rule configuration',
                purpose: 'Advanced security and sequence validation'
            }
        ]
    }
];

export default function CookieConsent() {
    const { consent, updateConsent, hasConsented } = useCookieConsent();
    const [showSettings, setShowSettings] = useState(false);
    const [localConsent, setLocalConsent] = useState(consent);
    const [isMounted, setIsMounted] = useState(false);
    const [cookieSummary, setCookieSummary] = useState<ReturnType<typeof generateConsentSummary> | null>(null);

    // Prevent SSR issues by only showing after mount
    useEffect(() => {
        setIsMounted(true);
        // Check what Cloudflare cookies are actually present
        const summary = generateConsentSummary();
        setCookieSummary(summary);

        console.log('CookieConsent component debug:', {
            isMounted: true,
            hasConsented,
            showSettings,
            cookieSummary: summary,
            consent
        });
    }, [hasConsented, consent]);

    // Update local consent when global consent changes
    useEffect(() => {
        setLocalConsent(consent);
    }, [consent]);

    const saveConsent = (newConsent: Partial<typeof consent>) => {
        updateConsent(newConsent);
        setShowSettings(false);
    };

    const acceptAll = () => {
        saveConsent({
            performance: true,
            functional: true
        });
    };

    const acceptNecessaryOnly = () => {
        saveConsent({
            performance: false,
            functional: false
        });
    };

    const toggleCategory = (categoryId: string) => {
        if (categoryId === 'necessary') return; // Cannot disable necessary cookies

        setLocalConsent(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId as keyof typeof consent]
        }));
    };

    // Don't render on server-side or if user has already consented
    if (!isMounted || (hasConsented && !showSettings)) return null;

    return (
        <>
            {/* Cookie Banner */}
            {!hasConsented && !showSettings && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
                    <div className="max-w-6xl mx-auto p-4">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                            <div className="flex items-start gap-3 flex-1">
                                <Cookie className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        Cloudflare Security & Performance Cookies
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        This website is protected by Cloudflare, which sets cookies for security, bot protection,
                                        and performance optimization. Most cookies are strictly necessary for security and cannot be disabled.
                                        {cookieSummary && cookieSummary.detectedCookies.length > 0 && (
                                            <span className="font-medium"> Currently using: {cookieSummary.detectedCookies.length} cookie(s).</span>
                                        )}
                                    </p>
                                    <button
                                        onClick={() => setShowSettings(true)}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Customize preferences
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                                <button
                                    onClick={acceptNecessaryOnly}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm transition-colors"
                                >
                                    Accept Necessary Only
                                </button>
                                <button
                                    onClick={acceptAll}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                                >
                                    Accept All Cookies
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-6 h-6 text-blue-600" />
                                    <h2 className="text-xl font-bold text-gray-900">Cookie Preferences</h2>
                                </div>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Description */}
                            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    This website uses Cloudflare's security and performance services.
                                    The cookies listed below are set by Cloudflare to protect your browsing
                                    experience and optimize website performance. You can customize your
                                    preferences, but some cookies are strictly necessary for security.
                                </p>

                                {cookieSummary && (
                                    <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Info className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm font-medium text-blue-900">
                                                Currently Detected: {cookieSummary.detectedCookies.length} Cloudflare cookie(s)
                                            </span>
                                        </div>
                                        <div className="text-xs text-blue-700">
                                            {cookieSummary.detectedCookies.map(cookie => cookie.name).join(', ') || 'No Cloudflare cookies detected yet'}
                                        </div>
                                    </div>
                                )}

                                <a
                                    href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                                >
                                    Learn more about Cloudflare cookies
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>

                            {/* Cookie Categories */}
                            <div className="space-y-6">
                                {CLOUDFLARE_COOKIES.map((category) => (
                                    <div key={category.id} className="border border-gray-200 rounded-lg">
                                        <div className="p-4 bg-gray-50 rounded-t-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    {category.required ? (
                                                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                                            Always Active
                                                        </span>
                                                    ) : (
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={localConsent[category.id as keyof typeof consent] as boolean}
                                                                onChange={() => toggleCategory(category.id)}
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <div className="space-y-4">
                                                {category.cookies.map((cookie) => (
                                                    <div key={cookie.name} className="border-l-2 border-gray-200 pl-4">
                                                        <h4 className="font-mono text-sm font-semibold text-gray-900 mb-1">
                                                            {cookie.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 mb-2">{cookie.description}</p>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
                                                            <div>
                                                                <span className="font-medium">Duration:</span> {cookie.duration}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Purpose:</span> {cookie.purpose}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={acceptNecessaryOnly}
                                    className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                >
                                    Accept Necessary Only
                                </button>
                                <button
                                    onClick={() => saveConsent(localConsent)}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Save Preferences
                                </button>
                                <button
                                    onClick={acceptAll}
                                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}