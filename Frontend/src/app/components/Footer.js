import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-gray-300 pt-12 pb-6 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Shrinkit<span className="text-sky-500">.io</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Shorten your URLs. Simplify your links. Track and manage your short URLs effortlessly with our modern tool.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
          </ul>
        </div>

        {/* Features / Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Features</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">URL Shortener</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">QR Code Generator</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Link Analytics</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Custom Alias</a></li>
          </ul>
        </div>

        {/* Legal & Support */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Legal & Help</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-8 mx-6" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>&copy; {new Date().getFullYear()} Shrinkit.io. All rights reserved.</p>
        
        {/* Social Links or Extra Info */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-cyan-400 transition-colors">Twitter / X</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
