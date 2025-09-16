'use client';

import Link from 'next/link';
import { Shield, Cookie, Mail } from 'lucide-react';
import { COMPANY, CONTACT } from '@/config/constants';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-750 text-gray-300 py-12 border t border-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-3 md:grid-cols-3 gap-3 justify-center ">

                    {/* Services */}
                    <div className='mx-auto'>
                        <h4 className="text-lg font-semibold text-white mb-4 ">Pages</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* Legal */}
                    <div className='mx-auto'>
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
                    <div className='mx-auto'>
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
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-500">
                        © {currentYear} {COMPANY.name}. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
}