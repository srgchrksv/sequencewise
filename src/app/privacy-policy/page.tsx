'use client';

import { Shield, Mail, Globe, Lock, Eye, FileText, Calendar } from 'lucide-react';
import Link from 'next/link';
import PolicyHeader from '@/components/PolicyHeader';
import { COMPANY, CONTACT, LEGAL } from '@/config/constants';

export default function PrivacyPolicyPage() {

    return (
        <>
            <PolicyHeader title="Privacy Policy" />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Shield className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                                <p className="text-gray-600 mt-1">Effective Date: {LEGAL.privacyPolicyEffectiveDate}</p>
                            </div>
                        </div>

                        <div className="prose prose-gray max-w-none">
                            <p className="text-lg text-gray-700">
                                This Privacy Policy explains how we collect, use, and protect your information.
                            </p>
                        </div>
                    </div>        {/* Information We Collect */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Eye className="w-6 h-6 text-blue-600" />
                            Information We Collect
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Automatically Collected Information</h3>
                                <p className="text-gray-700 mb-4">
                                    When you visit our website, we automatically collect certain information about your device and usage:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                    <li>IP address and approximate geographic location</li>
                                    <li>Browser type and version</li>
                                    <li>Device information (operating system, screen resolution)</li>
                                    <li>Pages visited and time spent on our site</li>
                                    <li>Referring website or source</li>
                                    <li>Date and time of access</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Contact Information</h3>
                                <p className="text-gray-700 mb-4">
                                    When you contact us through email or contact forms, we collect:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                    <li>Name and email address</li>
                                    <li>Message content and any attachments</li>
                                    <li>Communication preferences</li>
                                </ul>


                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Cookies</h3>
                                <p className="text-gray-700 mb-4">
                                    We use cookies for security, performance, and functionality. See our{' '}
                                    <Link href="/cookie-policy" className="text-blue-600 hover:text-blue-700 underline">
                                        Cookie Policy
                                    </Link> for details.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How We Use Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <FileText className="w-6 h-6 text-blue-600" />
                            How We Use Your Information
                        </h2>

                        <div className="space-y-4">
                            <p className="text-gray-700">We use the collected information for the following purposes:</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li><strong>Service Provision:</strong> To provide and maintain our website and services</li>
                                <li><strong>Security:</strong> To protect against fraud, abuse, and security threats</li>
                                <li><strong>Communication:</strong> To respond to your inquiries and provide customer support</li>
                                <li><strong>Improvement:</strong> To analyze usage patterns and improve our services</li>
                                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                            </ul>
                        </div>
                    </div>

                    {/* Data Security */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Lock className="w-6 h-6 text-blue-600" />
                            Data Security
                        </h2>

                        <div className="space-y-6">
                            <p className="text-gray-700">
                                We use industry-standard security measures including SSL/TLS encryption and access controls.
                                However, no internet transmission is 100% secure.
                            </p>
                        </div>
                    </div>

                    {/* Data Sharing and Disclosure */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Sharing and Disclosure</h2>

                        <div className="space-y-4">
                            <p className="text-gray-700">
                                We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4">
                                <li>
                                    <strong>Service Providers:</strong> With trusted service providers (such as Cloudflare) who assist in operating our website and services
                                </li>
                                <li>
                                    <strong>Legal Requirements:</strong> When required by law, court order, or government request
                                </li>
                                <li>
                                    <strong>Business Protection:</strong> To protect our rights, property, or safety, or that of our users
                                </li>
                                <li>
                                    <strong>Consent:</strong> With your explicit consent for specific purposes
                                </li>
                            </ul>


                        </div>
                    </div>

                    {/* International Data Transfers */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Globe className="w-6 h-6 text-blue-600" />
                            International Data Transfers
                        </h2>

                        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                            <p className="text-amber-800 text-sm">
                                <strong>Important:</strong> Your data may be processed outside the {COMPANY.jurisdictionShort} through our
                                service providers. By using our services, you consent to international data transfers.
                            </p>
                        </div>
                    </div>

                    {/* Your Rights */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>

                        <div className="space-y-4">
                            <p className="text-gray-700">
                                Depending on your jurisdiction, you may have the following rights regarding your personal data:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li><strong>Access:</strong> Request information about the personal data we hold about you</li>
                                <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                                <li><strong>Erasure:</strong> Request deletion of your personal data in certain circumstances</li>
                                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                                <li><strong>Objection:</strong> Object to processing of your personal data for certain purposes</li>
                                <li><strong>Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
                            </ul>

                            <p className="text-gray-700 mt-4">
                                To exercise these rights, please contact us through the information provided in the &ldquo;Contact Us&rdquo; section below.
                            </p>
                        </div>
                    </div>

                    {/* Data Retention */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-blue-600" />
                            Data Retention
                        </h2>

                        <div className="space-y-4">
                            <p className="text-gray-700">We retain personal information for the following periods:</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li><strong>Contact Information:</strong> Until you request deletion or up to 3 years from last contact</li>
                                <li><strong>Website Analytics:</strong> Aggregated data may be retained indefinitely</li>
                                <li><strong>Security Logs:</strong> Up to 12 months for security and compliance purposes</li>
                                <li><strong>Cookies:</strong> As specified in our Cookie Policy (typically 30 days to 1 year)</li>
                            </ul>
                        </div>
                    </div>

                    {/* Business Transfers */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Transfers</h2>
                        <p className="text-gray-700 mb-4">
                            If we are involved in a merger, acquisition, or asset sale, we will provide notice
                            and you may delete your data before any transfer occurs.
                        </p>
                    </div>

                    {/* Changes to Privacy Policy */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Privacy Policy</h2>

                        <p className="text-gray-700 mb-4">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                            <li>Posting the new Privacy Policy on this page</li>
                            <li>Updating the &ldquo;Effective Date&rdquo; at the top of this policy</li>
                            <li>Providing prominent notice on our website for significant changes</li>
                        </ul>
                        <p className="text-gray-700">
                            Your continued use of our services after any changes constitutes acceptance of the updated Privacy Policy.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Mail className="w-6 h-6 text-blue-600" />
                            Contact Us
                        </h2>

                        <div className="space-y-4">
                            <p className="text-gray-700 mb-4">
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>

                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div>
                                    <p className="text-gray-700 font-semibold">Data Controller:</p>
                                    <p className="text-gray-700">{COMPANY.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-semibold">Jurisdiction:</p>
                                    <p className="text-gray-700">{COMPANY.jurisdiction}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-semibold">Contact:</p>
                                    <p className="text-gray-700">
                                        Email: <a href={`mailto:${CONTACT.email}`} className="text-blue-600 hover:text-blue-700">
                                            {CONTACT.email}
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 mt-6">
                                This Privacy Policy is effective as of September 2025 and will remain in effect except with
                                respect to any changes in its provisions in the future, which will be in effect immediately
                                after being posted on this page.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}