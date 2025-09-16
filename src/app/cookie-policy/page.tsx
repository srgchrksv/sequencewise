'use client';

import { Shield, Cookie, ExternalLink, Settings } from 'lucide-react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

const CLOUDFLARE_COOKIES = [
    {
        category: 'Strictly Necessary Cookies',
        description: 'These cookies are essential for the website to function properly and cannot be disabled. They are set by Cloudflare to ensure security and proper functioning of our services.',
        cookies: [
            {
                name: '__cf_bm',
                description: 'Cloudflare bot management cookie that identifies and mitigates automated traffic to protect the site from malicious bots. This cookie contains information related to Cloudflare\'s proprietary bot score and session identifiers when anomaly detection is enabled.',
                duration: '30 minutes of continuous inactivity',
                purpose: 'Security and bot protection',
                provider: 'Cloudflare',
                type: 'HTTP Cookie'
            },
            {
                name: 'cf_clearance',
                description: 'Required for JavaScript detections and stores proof of challenge passed. This cookie is necessary to reach the origin server and contains clearance information for security challenges.',
                duration: 'Variable based on security settings (typically 30 minutes to several hours)',
                purpose: 'Security challenge verification and JavaScript detection',
                provider: 'Cloudflare',
                type: 'HTTP Cookie'
            },
            {
                name: '__cfruid',
                description: 'Strictly necessary to support Cloudflare Rate Limiting products. This cookie manages incoming traffic and provides better visibility on the origin of particular requests.',
                duration: 'Session-based (expires when browser session ends)',
                purpose: 'Rate limiting and traffic management',
                provider: 'Cloudflare',
                type: 'HTTP Cookie'
            },
            {
                name: '_cfuvid',
                description: 'Used by Rate Limiting Rules to distinguish individual users who share the same IP address (e.g., users behind NAT). Only set when a site uses unique visitor ID in rate limiting configuration.',
                duration: 'Session-based',
                purpose: 'Rate limiting for shared IP addresses',
                provider: 'Cloudflare',
                type: 'HTTP Cookie'
            },
            {
                name: '__cflb',
                description: 'Session affinity cookie for Cloudflare Load Balancer. Routes future requests to the same origin server to optimize network resource usage and provide seamless user experience.',
                duration: 'Several seconds up to 24 hours (configurable)',
                purpose: 'Load balancing and session affinity',
                provider: 'Cloudflare',
                type: 'HTTP Cookie'
            }
        ]
    },
    {
        category: 'Performance Cookies',
        description: 'These cookies help improve website performance and provide a better user experience by optimizing content delivery and error handling.',
        cookies: [
            {
                name: 'cf_ob_info',
                description: 'Provides information on HTTP Status Code returned by the origin web server, Ray ID of original failed requests, and the data center serving the traffic for Always Online functionality.',
                duration: '30 seconds',
                purpose: 'Performance optimization and error handling',
                provider: 'Cloudflare',
                type: 'Persistent Cookie'
            },
            {
                name: 'cf_use_ob',
                description: 'Informs Cloudflare to fetch the requested resource from Always Online cache on the designated port (values: 0, 80, or 443).',
                duration: '30 seconds',
                purpose: 'Cache optimization and Always Online functionality',
                provider: 'Cloudflare',
                type: 'Persistent Cookie'
            }
        ]
    },
    {
        category: 'Functional Cookies',
        description: 'These cookies enable enhanced functionality and personalization features for managing traffic flow and advanced security measures.',
        cookies: [
            {
                name: '__cfwaitingroom',
                description: 'Used to track visitors that access a waiting room enabled host and path combination. Provides queue management and estimated wait times when the main application is not immediately available.',
                duration: 'Variable based on waiting room configuration',
                purpose: 'Traffic queue management and waiting room functionality',
                provider: 'Cloudflare',
                type: 'HTTP Cookie'
            },
            {
                name: '__cfseq',
                description: 'Sequence rules cookie that tracks the order and timing of user requests. Makes request sequence data available via Cloudflare Rules for advanced security validation.',
                duration: 'Variable based on sequence rule configuration',
                purpose: 'Advanced security and sequence validation',
                provider: 'Cloudflare',
                type: 'HTTP Cookie'
            }
        ]
    }
];

export default function CookiePolicyPage() {
    const { consent, showConsentBanner, resetConsent } = useCookieConsent();

    return (
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
                            <p className="text-gray-600 mt-1">Last updated: September 2025</p>
                        </div>
                    </div>

                    <div className="prose prose-gray max-w-none">
                        <p className="text-lg text-gray-700 mb-6">
                            This website uses Cloudflare's security and performance services, which set various cookies
                            to protect your browsing experience, optimize website performance, and prevent malicious activity.
                            This policy explains what cookies are used and why.
                        </p>

                        <div className="bg-blue-50 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                <Cookie className="w-5 h-5" />
                                About Cloudflare Cookies
                            </h3>
                            <p className="text-blue-800 text-sm">
                                As defined in Cloudflare's Privacy Policy, all cookies listed below are strictly necessary
                                to provide the services requested, unless otherwise stated. Cloudflare does not track users
                                from site to site or from session to session. Each cookie is generated independently and
                                does not correspond to any user ID in our application.
                            </p>
                        </div>
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
                <div className="space-y-8">
                    {CLOUDFLARE_COOKIES.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{category.category}</h2>
                                <p className="text-gray-600">{category.description}</p>
                            </div>

                            <div className="p-6">
                                <div className="space-y-6">
                                    {category.cookies.map((cookie, cookieIndex) => (
                                        <div key={cookieIndex} className="border-l-4 border-blue-200 pl-6">
                                            <h3 className="font-mono text-lg font-semibold text-gray-900 mb-3">
                                                {cookie.name}
                                            </h3>
                                            <p className="text-gray-700 mb-4">{cookie.description}</p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div className="space-y-2">
                                                    <div>
                                                        <span className="font-semibold text-gray-900">Duration:</span>
                                                        <span className="text-gray-600 ml-2">{cookie.duration}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-900">Purpose:</span>
                                                        <span className="text-gray-600 ml-2">{cookie.purpose}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div>
                                                        <span className="font-semibold text-gray-900">Provider:</span>
                                                        <span className="text-gray-600 ml-2">{cookie.provider}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-900">Type:</span>
                                                        <span className="text-gray-600 ml-2">{cookie.type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>

                    <div className="prose prose-gray max-w-none space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Data Processing Location</h3>
                        <p className="text-gray-700">
                            By default, cookie data may be processed in Cloudflare's data centers in the United States
                            and is subject to cross-border data transfer provisions. Customers using Cloudflare's
                            Data Localization Suite can control where cookie data is processed and logged.
                        </p>

                        <h3 className="text-lg font-semibold text-gray-900">HTTPS Requirement</h3>
                        <p className="text-gray-700">
                            Some Cloudflare cookies, particularly cf_clearance, may experience issues if the website
                            is not using HTTPS. This website uses HTTPS to ensure proper cookie functionality.
                        </p>

                        <h3 className="text-lg font-semibold text-gray-900">Browser Compatibility</h3>
                        <p className="text-gray-700">
                            Visitors using browsers that do not accept cookies may not be able to access certain
                            features, particularly when security features like Waiting Room are active.
                        </p>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                            For more detailed information about Cloudflare's cookie practices, please visit:
                        </p>
                        <a
                            href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                        >
                            Cloudflare Cookie Documentation
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
                    <p className="text-gray-700 mb-4">
                        If you have any questions about this Cookie Policy or our use of cookies, please contact us.
                    </p>
                    <p className="text-sm text-gray-500">
                        This policy is effective as of September 2025 and will remain in effect except with respect
                        to any changes in its provisions in the future, which will be in effect immediately after
                        being posted on this page.
                    </p>
                </div>
            </div>
        </div>
    );
}