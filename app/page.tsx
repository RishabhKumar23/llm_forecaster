'use client';

import Link from 'next/link';
import { ArrowRight, Mouse } from 'lucide-react';


export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden font-sans">

      {/* Background glow gradients */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-400 opacity-20 rounded-full blur-3xl animate-float-slow z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-500 opacity-20 rounded-full blur-3xl animate-float-slow z-0" />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-10">
        <h2 className="text-xl font-bold tracking-tight">Forecaster</h2>
        <nav className="hidden md:flex gap-6 text-sm text-white/80">
          <Link href="#">Defi App</Link>
          <Link href="#">Assets</Link>
          <Link href="#">Features</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">FAQ</Link>
          <Link href="#" className="flex items-center gap-1">Protection <ArrowRight size={14} /></Link>
        </nav>
        <Link href="/Marketlist" className="cursor-pointer text-sm bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition">Create Account</Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center min-h-screen px-6 z-10 relative">
        <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Unlock Your Investing Spark!</p>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          One-click for <span className="text-white/60">AI Forcaster</span>
        </h1>
        <p className="text-white/60 max-w-xl text-base md:text-lg mb-10">
          Dive into the World of Crypto, Let AI Agent help you with your Investing.
        </p>

        <div className="flex gap-4 mb-16">
          <Link href="/Marketlist">
            <button className="cursor-pointer bg-white text-black px-6 py-3 rounded-full font-medium text-sm hover:bg-white/90 transition-all shadow-md">
              Discover More
            </button>
          </Link>
          <Link href="#">
            <button className="cursor-pointer bg-white/10 border border-white/20 px-6 py-3 rounded-full font-medium text-sm hover:bg-white/5 transition-all">
              Open App
            </button>
          </Link>
        </div>

        {/* Scroll Down Indicator */}
        {/* <div className="absolute bottom-10 flex flex-col items-center text-white/50 text-xs animate-bounce-slow">
          <Mouse className="w-5 h-5 mb-1" />
          Scroll down
        </div> */}
      </section>

      {/* Partner Logos */}
      <footer className="absolute bottom-0 left-0 w-full px-6 py-4 flex flex-wrap justify-center gap-4 text-white/30 text-xs">
        <span>Vercel</span>
        <span>loom</span>
        <span>Cash App</span>
        <span>Loops</span>
        <span>Zapier</span>
        <span>ramp</span>
        <span>Raycast</span>
      </footer>
    </main>
  );
}
