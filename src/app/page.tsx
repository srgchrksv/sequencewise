import { COMPANY } from '@/config/constants';

// Force static generation
export const dynamic = 'force-static';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 to-black">
      <main className="flex flex-col items-center text-center space-y-8 max-w-4xl">
        <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
          {COMPANY.name.replace('Limited', '').trim()}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed">
          {COMPANY.tagline}
        </p>
      </main>
    </div>
  );
}
