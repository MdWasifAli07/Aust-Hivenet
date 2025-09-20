"use client";

import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion'; // For animation

export default function NavLink({
  href,
  children,
  className = '',
  exact = false,  // Allow exact match for active state
  icon,
  ...props
}) {
  const { url } = usePage(); // Get the current URL from Inertia

  // Check if the link is active
  const isActive = exact ? url === href : url.startsWith(href);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={`relative inline-flex items-center space-x-2 ${className}`}
    >
      <Link
        href={href}
        className={`relative flex items-center justify-center space-x-2 text-sm font-medium leading-5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-50
          ${isActive ? 'text-indigo-600 font-bold' : 'text-white hover:text-neutral-300'}
          ${className}`}
        {...props}
      >
        {/* Icon and Text */}
        <span className="block sm:hidden">{icon}</span>
        <span className="hidden sm:block">{children}</span>

        {/* Dark Blue Underline Glow Effect on Active Link */}
        {isActive && (
          <motion.span
            className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-indigo-600 to-transparent h-[2px]"
            layoutId="underline"
          />
        )}
      </Link>
    </motion.div>
  );
}
