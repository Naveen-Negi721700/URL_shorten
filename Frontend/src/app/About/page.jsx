import React from 'react';
import { Zap, ShieldCheck, Lock, Copy, ArrowRight, ArrowDown } from 'lucide-react';
import Link from "next/link";

export default function AboutUsSection() {
  return (
    <div className="bg-[#030914] text-white min-h-screen flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24 font-sans">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <span className="text-[#38bdf8] text-sm font-semibold tracking-wider uppercase">
            ABOUT US
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Making Long Links <br />
            <span className="text-[#00d8ff]">Shorter and Smarter.</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-lg leading-relaxed">
            Shrinkit.io is a simple and modern URL shortener that helps you transform long, messy links into clean, shareable short links. Our goal is to make link sharing easier, faster and more efficient for everyone.
          </p>

          <div className="pt-2">
            <Link href="/">
  <button className="bg-[#00c8ff] hover:bg-[#00b4e6] text-black font-semibold px-6 py-3 rounded-full flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20">
    <span>Get Started</span>
    <ArrowRight className="w-5 h-5" />
  </button>
</Link>
          </div>
        </div>

        {/* Right Column - Illustration Card */}
        <div className="relative flex justify-center items-center">
          {/* Subtle Decorative Burst Lines (Left side of card) */}
          <div className="absolute -left-4 bottom-12 space-y-2 hidden sm:block">
            <div className="w-6 h-1 bg-cyan-400 rounded-full transform -rotate-45"></div>
            <div className="w-6 h-1 bg-cyan-400 rounded-full"></div>
            <div className="w-6 h-1 bg-cyan-400 rounded-full transform rotate-45"></div>
          </div>

          {/* Main Card Container */}
          <div className="relative w-full max-w-md bg-[#0b172a] border border-cyan-900/40 rounded-2xl p-6 shadow-2xl backdrop-blur-sm transform rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Window Controls Dot */}
            <div className="flex space-x-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            </div>

            {/* Input Box 1: Long URL */}
            <div className="bg-[#132238] border border-slate-700/50 rounded-xl p-3 mb-4 text-slate-400 text-sm flex items-center truncate">
              https://example.com/very/long/url
            </div>

            {/* Arrow Icon Indicator */}
            <div className="flex justify-center my-3 text-cyan-400">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Input Box 2: Shortened URL with Copy Button */}
            <div className="bg-[#132238] border border-cyan-500/30 rounded-xl p-2 pl-4 flex items-center justify-between text-white text-sm">
              <span className="truncate">https://shrinkit.io/abc123</span>
              <button className="bg-[#0b172a] hover:bg-[#1a2f4c] p-2 rounded-lg text-cyan-400 border border-cyan-500/20 transition-colors">
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Features Row */}
      <div className="max-w-6xl mx-auto w-full mt-20 pt-10 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* Feature 1 */}
        <div className="flex items-center space-x-4">
          <div className="text-cyan-400">
            <Zap className="w-8 h-8 fill-cyan-400/20" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Fast</h3>
            <p className="text-slate-400 text-sm">Shorten links in seconds</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center space-x-4 sm:border-l sm:border-slate-800/80 sm:pl-8">
          <div className="text-cyan-400">
            <ShieldCheck className="w-8 h-8 fill-cyan-400/20" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Reliable</h3>
            <p className="text-slate-400 text-sm">Always available</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center space-x-4 sm:border-l sm:border-slate-800/80 sm:pl-8">
          <div className="text-cyan-400">
            <Lock className="w-8 h-8 fill-cyan-400/20" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Secure</h3>
            <p className="text-slate-400 text-sm">Your data is safe</p>
          </div>
        </div>

      </div>
    </div>
  );
}