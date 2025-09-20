import React, { useState } from 'react';
import { Link } from '@inertiajs/react';  // Inertia.js Link component

export default function Footer() {
  const [email, setEmail] = useState("");

  // Handle subscription logic
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed with email:", email);
      setEmail("");
      alert("Thank you for subscribing to HiveNet updates!");
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-start">
          
          {/* Left Section - Logo and Newsletter Subscription */}
          <div className="w-full sm:w-1/4 space-y-6">
            {/* HiveNet Logo */}
            <div className="flex items-center mb-6">
              <img
                src="https://ik.imagekit.io/vutfc4tgw/HiveNet%20navbar-02.png?updatedAt=1758323289144"
                alt="HiveNet Logo"
                className="w-36 mb-8 object-contain"
              />
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h2 className="text-xl font-medium mb-4">Stay Updated</h2>
              <p className="text-gray-400 text-sm mb-4">Subscribe to receive the latest news and updates from HiveNet.</p>
              <form onSubmit={handleSubscribe} className="flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 rounded-l-lg text-black flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 p-3 rounded-r-lg text-white hover:bg-blue-600 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Links (Documentation, Resources, Company, and Social Handles) */}
           <div className="w-full text-sm sm:w-3/4 flex flex-wrap justify-end space-x-20">
            {/* Documentation Section */}
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-blue-400">Documentation</h3>
              <ul className="space-y-2">
                <li><Link href="/docs" className="text-gray-300 hover:text-white">API Documentation</Link></li>
                <li><Link href="/docs/guide" className="text-gray-300 hover:text-white">User Guide</Link></li>
                <li><Link href="/docs/tutorials" className="text-gray-300 hover:text-white">Tutorials</Link></li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-blue-400">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/help-center" className="text-gray-300 hover:text-white">Help Center</Link></li>
                <li><Link href="/community" className="text-gray-300 hover:text-white">Community Forums</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-white">FAQs</Link></li>
              </ul>
            </div>

            {/* Company Section */}
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-blue-400">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Social Handles Section */}
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-blue-400">Social Handles</h3>
              <ul className="space-y-2">
                <li><Link href="https://facebook.com" target="_blank" className="text-gray-300 hover:text-white">Facebook</Link></li>
                <li><Link href="https://twitter.com" target="_blank" className="text-gray-300 hover:text-white">Twitter</Link></li>
                <li><Link href="https://linkedin.com" target="_blank" className="text-gray-300 hover:text-white">LinkedIn</Link></li>
                <li><Link href="https://github.com" target="_blank" className="text-gray-300 hover:text-white">GitHub</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center text-gray-400 mt-8">
          <p>&copy; {new Date().getFullYear()} HiveNet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
