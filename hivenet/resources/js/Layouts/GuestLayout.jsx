import React from 'react';
import Navbar from '@/Components/floating-navbar-demo'; // Import the Navbar component
import BackgroundFX from '@/Components/BackgroundFX'; // Import BackgroundFX

export default function GuestLayout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* BackgroundFX Component: Now placed outside content and fills the whole screen */}
      <BackgroundFX /> 

      {/* Navbar */}
      <div className="relative z-30 w-full">
        <Navbar /> {/* Add the Navbar component here */}
      </div>

      {/* Main Content Area */}
      <div className="relative top-20 mt-6 w-full px-6 py-4 sm:max-w-xl sm:rounded-lg">
        {children} {/* The children (form, etc.) will go here */}
      </div>
    </div>
  );
}
