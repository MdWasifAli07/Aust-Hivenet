import React from 'react';
import Navbar from '@/Components/floating-navbar-demo'; // Import the Navbar component
import BackgroundFX from '@/Components/BackgroundFX'; // Import BackgroundFX
import Footer from '@/Components/Footer'; // Import Footer

export default function GuestLayout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* BackgroundFX Component: Now placed outside content and fills the whole screen */}
      <BackgroundFX /> 

      {/* Navbar */}
      <div className="relative z-30 w-full">
        <Navbar /> {/* Add the Navbar component here */}
      </div>

      {/* Main Content Area */}
      <div className="relative flex-grow top-10 mt-10 w-full px-6 sm:max-w-xl mx-auto sm:rounded-lg"> {/* Adjusted margin-top and centered content */}
        {children} {/* The children (form, etc.) will go here */}
      </div> 

      {/* Footer */}
      <div className="relative z-30 w-full mt-12"> {/* Increased margin-top for footer */}
        <Footer /> {/* Add the Footer component here */}
      </div>
    </div>
  );
}
