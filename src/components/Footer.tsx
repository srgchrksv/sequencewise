'use client';

import Link from 'next/link';
import { Shield, Cookie, Mail } from 'lucide-react';
import { COMPANY, CONTACT } from '@/config/constants';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-750 text-gray-300 py-12 border t border-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-xl font-bold text-white mb-4">{COMPANY.name}</h3>
                        <p className="text-sm text-gray-400">
                            {COMPANY.tagline}
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Pages</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Legal & Privacy</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="hover:text-white transition-colors inline-flex items-center gap-2"
                                >
                                    <Shield className="w-3 h-3" />
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookie-policy"
                                    className="hover:text-white transition-colors inline-flex items-center gap-2"
                                >
                                    <Cookie className="w-3 h-3" />
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                        <div className="space-y-2 text-sm">
                            <a
                                href={`mailto:${CONTACT.email}`}
                                className="inline-flex items-center gap-2 hover:text-white transition-colors"
                            >
                                <Mail className="w-3 h-3" />
                                {CONTACT.email}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <p className="text-sm text-gray-300">Based in {COMPANY.jurisdiction}.</p>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500">
                            © {currentYear} {COMPANY.name}. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <Link
                                href="/privacy-policy"
                                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/cookie-policy"
                                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}