'use client';

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-gray-800 dark:to-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="40"
                viewBox="0 0 500 100"
                className="text-white fill-current"
              >
                <text
                  x="10"
                  y="80"
                  className="font-sayyeda"
                  fontSize="100"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  VAL DATABASE
                </text>
              </svg>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink href="/">Movie</NavLink>
                <NavLink href="/anime">Anime</NavLink>
                <NavLink href="/drama">Drama Series</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-4"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink href="/" onClick={toggleMenu}>Movie</MobileNavLink>
          <MobileNavLink href="/anime" onClick={toggleMenu}>Anime</MobileNavLink>
          <MobileNavLink href="/drama" onClick={toggleMenu}>Drama Series</MobileNavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, onClick, children }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-white hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
  >
    {children}
  </Link>
);

export default NavBar;