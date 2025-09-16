'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

interface PolicyHeaderProps {
    title: string;
    showBackToHome?: boolean;
}

export default function PolicyHeader({ title, showBackToHome = true }: PolicyHeaderProps) {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        {showBackToHome && (
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="text-sm font-medium">Back to Home</span>
                            </Link>
                        )}
                        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            <span className="text-sm font-medium">Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}