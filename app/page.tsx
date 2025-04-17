// app/page.tsx
import Link from 'next/link';
import { Button } from '../src/components/ui/button';

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white flex flex-col justify-center items-center p-6">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Welcome to the Forecaster
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your one-stop destination for AI-driven market insights and predictions.
        </p>
        <p className="text-md mb-8">
          Dive into our market list and get instant trade signals with confidence.
        </p>
        <Link href="/Marketlist">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full text-lg transition duration-300">
            Get Started
          </Button>

        </Link>
      </section>
    </main>
  );
}
