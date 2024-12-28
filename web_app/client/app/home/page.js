"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Importing Link from Next.js

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[#40065D] text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#ffffff] flex justify-between items-center py-4 px-8 border-b border-gray-600 relative">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Unoclave Logo"
            width={256}
            height={256}
            className="h-9 w-auto mr-3"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 bg-[#40065D] text-white rounded hover:bg-[#5E2A82]">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-[#40065D] text-white rounded hover:bg-[#5E2A82]">
              Sign Up
            </button>
          </Link>
          <Link href="/help">
            <button className="px-4 py-2 bg-[#40065D] text-white rounded hover:bg-[#5E2A82]">
              Help us improve Unoclave
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400">
              Try Now
            </button>
          </Link>
        </nav>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none text-black"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-12 right-2 bg-white border border-gray-600 rounded-md shadow-md py-4 px-4 space-y-4 w-[50vw] md:w-[30vw] my-2">
              <Link href="/login">
                <button className="block w-full px-4 py-2 rounded border border-black text-black hover:bg-gray-100 my-2">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="block w-full px-4 py-2 rounded border border-black text-black hover:bg-gray-100 my-2">
                  Sign Up
                </button>
              </Link>
              <Link href="/help">
                <button className="block w-full px-4 py-2 rounded border border-black text-black hover:bg-gray-100 my-2">
                  Help us improve
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="block w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400">
                  Try Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center px-4 md:h-[80vh] h-[80vh]">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          AI-Powered Home Equipment Solutions
        </h1>
        <p className="text-sm md:text-lg max-w-2xl mb-8">
          Simplify your life with cutting-edge technology that transforms your
          home into an intelligent, efficient space. Experience the future of
          home equipment today.
        </p>
        <Link href="/dashboard">
          <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-400">
            Try Now
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 px-8 text-gray-600 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-black mb-2">About Unoclave</h3>
            <p className="text-sm">
              We provide AI-powered home equipment solutions to make your life
              smarter and more efficient. Our technology is designed to elevate
              your home experience.
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-black mb-2">Quick Links</h3>
            <div className="grid grid-cols-3">
              <Link href="/terms-of-service">
                <button className="hover:underline">Terms of Service</button>
              </Link>
              <Link href="/privacy-policy">
                <button className="hover:underline">Privacy Policy</button>
              </Link>
              <Link href="/contact-us">
                <button className="hover:underline">Contact Us</button>
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-black mb-2 text-center">
              Follow Us
            </h3>
            <div className="flex justify-center space-x-4">
              <Link href="https://facebook.com">
                <button className="hover:underline">Facebook</button>
              </Link>
              <Link href="https://twitter.com">
                <button className="hover:underline">Twitter</button>
              </Link>
              <Link href="https://linkedin.com">
                <button className="hover:underline">LinkedIn</button>
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center text-sm mt-6">
          © {new Date().getFullYear()} Unoclave. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
