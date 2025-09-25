import React from "react";
import { IconHome, IconCalendar, IconSearch, IconInfoCircle, IconUser, IconLogout } from "@tabler/icons-react";
import NavLink from "./NavLink";  // Import the NavLink component
import { Link, usePage } from "@inertiajs/react"; // ⬅️ added

export default function FloatingNavDemo() {
  // Define the nav items, including the Logo
  const navItems = [
    { name: "Home", link: "/", icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" /> },
    { name: "Events", link: "/events", icon: <IconCalendar className="h-4 w-4 text-neutral-500 dark:text-white" /> },
    { name: "About Us", link: "/aboutus", icon: <IconInfoCircle className="h-4 w-4 text-neutral-500 dark:text-white" /> },
     { name: "My Favourites", link: "/favourites", icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" /> },
     { name: "Going", link: "/going", icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" /> },
  
  
  ];

  const { props } = usePage();
  const user = props?.auth?.user || null;
  const r = (name, fallback) => {
    try { return typeof route === "function" ? route(name) : fallback; } catch { return fallback; }
  };

  return (
    <div className="relative w-full">
      {/* Glassmorphism Navbar Container */}
      <div className="fixed top-0 left-0 right-0 z-40 mx-auto w-full bg-opacity-50 backdrop-blur-lg bg-white/10 px-4 py-4 flex justify-between items-center space-x-8 rounded-b-lg">
        
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-5">
          <img 
            src="https://ik.imagekit.io/vutfc4tgw/HiveNet%20navbar-02-02.png?updatedAt=1758325438898" 
            alt="HiveNet Logo" 
            className="h-4 px-9" // Reduced the logo height to h-6
          />
        </a>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          {navItems.map((item, idx) => (
            <NavLink key={idx} href={item.link} icon={item.icon} exact={item.name === "Home"}>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Auth-aware Buttons */}
        <div className="flex space-x-4">
          {user ? (
            <>
              {/* Profile */}
              <Link
                href={r("profile.edit", "/profile")}
                className="shadow-[inset_0_0_0_2px_#616467] text-white text-sm px-4 py-2 rounded-full font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 flex items-center gap-2"
              >
                <IconUser className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              {/* Logout (POST) */}
              <Link
                href={r("logout", "/logout")}
                method="post"
                as="button"
                className="shadow-[inset_0_0_0_2px_#616467] text-white text-sm px-6 py-2 rounded-full font-bold bg-gradient-to-r from-red-600 to-pink-600 hover:bg-gradient-to-l hover:from-pink-700 hover:to-red-500 dark:text-neutral-200 transition duration-200 flex items-center gap-2"
              >
                <IconLogout className="h-4 w-4" />
                Log out
              </Link>
            </>
          ) : (
            <>
              {/* Sign In Button - Redirect to /login */}
              <a href="/login" className="shadow-[inset_0_0_0_2px_#616467] text-white text-sm px-6 py-2 rounded-full font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
                Sign In
              </a>

              {/* Sign Up Button - Redirect to /register */}
              <a href="/register" className="shadow-[inset_0_0_0_2px_#616467] text-white text-sm px-6 py-2 rounded-full font-bold bg-gradient-to-r from-blue-600 to-indigo-700 hover:bg-gradient-to-l hover:from-indigo-800 hover:to-blue-300 dark:text-neutral-200 transition duration-200">
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
