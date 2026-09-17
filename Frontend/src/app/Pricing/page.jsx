import React from 'react';

export default function PricingSection() {
  return (
    <div className="min-h-screen bg-[#060A17] text-white flex flex-col items-center justify-center p-6 relative font-sans overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Badge */}
      <div className="border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs tracking-widest font-semibold uppercase px-4 py-1.5 rounded-full mb-4">
        Simple Pricing
      </div>

      {/* Main Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">
        Shorten More. <span className="text-blue-500">Do More.</span>
      </h1>
      
      {/* Subtitle */}
      <p className="text-gray-400 text-sm md:text-base text-center mb-8">
        Choose the plan that fits your needs. Start free and upgrade anytime.
      </p>

      {/* Toggle Container */}
      {/* <div className="flex items-center bg-[#0d1527] p-1.5 rounded-full border border-gray-800 mb-12 shadow-inner">
        <button className="bg-blue-500 text-white text-sm font-medium px-6 py-2 rounded-full shadow-lg">
          Monthly
        </button>
        <button className="text-gray-400 text-sm font-medium px-6 py-2 rounded-full hover:text-white transition">
          Yearly
        </button>
        <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20 mr-1">
          Save 20%
        </span>
      </div> */}

      {/* Cards Container (Only Free and Pro) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full items-stretch z-10">
        
        {/* FREE PLAN */}
        <div className="bg-[#0b1220]/80 border border-gray-800/80 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between hover:border-gray-700 transition">
          <div>
            {/* Header / Icon */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              {/* <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-medium px-3 py-1 rounded-full">
                Current Plan
              </span> */}
            </div>

            {/* Plan Info */}
            <h2 className="text-2xl font-bold mb-1">Free</h2>
            <p className="text-gray-400 text-sm mb-6">Great for getting started</p>

            {/* Price */}
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-extrabold">₹0</span>
              <span className="text-gray-400 text-sm ml-2">/ month</span>
            </div>

            <hr className="border-gray-800 mb-6" />

            {/* Features List */}
            <ul className="space-y-3.5 mb-8 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <span className="bg-blue-500/20 text-blue-400 p-0.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                Shorten unlimited links
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-500/20 text-blue-400 p-0.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                Basic link history
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-500/20 text-blue-400 p-0.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                Generate QR codes
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-500/20 text-blue-400 p-0.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                Share anywhere
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-500/20 text-blue-400 p-0.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                No credit card required
              </li>
            </ul>
          </div>

          {/* Action Button */}
        <a href="/">
          <button className="w-full py-3 bg-gray-800/80 border border-gray-700  text-gray-300 rounded-xl font-medium transition hover:bg-blue-600">
            Your Current Plan
          </button></a>
        </div>


        {/* PRO PLAN */}
        <div className="bg-[#0b1220]/90 border-2 border-blue-500 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between shadow-2xl shadow-blue-500/10 relative">
          <div>
            {/* Header / Icon */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md shadow-blue-500/30">
                Most Popular
              </span>
            </div>

            {/* Plan Info */}
            <h2 className="text-2xl font-bold mb-1">Pro</h2>
            <p className="text-gray-400 text-sm mb-6">For power users and creators</p>

            {/* Price */}
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-extrabold">₹149</span>
              <span className="text-gray-400 text-sm ml-2">/ month</span>
            </div>

            <hr className="border-gray-800 mb-6" />

            {/* Features List */}
            <ul className="space-y-3.5 mb-8 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <span className="bg-blue-500 text-white p-0.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                Everything in Free
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-500 text-white p-0.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                Custom short links (abc123)
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-500 text-white p-0.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                Detailed link analytics
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-500 text-white p-0.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                Branded QR codes
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-500 text-white p-0.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                Link expiration & password
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-500 text-white p-0.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                Priority support
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <button className="w-full py-3  hover:bg-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition">
            Upgrade to Pro
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}