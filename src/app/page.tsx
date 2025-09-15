// Force static generation
export const dynamic = 'force-static';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 to-black">
      <main className="flex flex-col items-center text-center space-y-8 max-w-4xl">
        <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
          Sequencewise
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed">
          Research. Create. Market.
        </p>
      </main>

      <footer className="mt-16 flex items-center justify-center">
        contact:
        <a
          className="flex items-center gap-2 text-gray-400 hover:text-gray-200 hover:underline hover:underline-offset-4 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-800/50"
          href="mailto:admin@sequencewise.com"
          rel="noopener noreferrer"
        >
          admin@sequencewise.com
        </a>
      </footer>
    </div>
  );
}
