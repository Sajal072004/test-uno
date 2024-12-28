"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Importing Link from Next.js
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("the login url is " , process.env.NEXT_PUBLIC_API_URL);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });
      console.log("the response is ", response);
      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      localStorage.setItem('unoClave-token', data.token);

      router.push('/dashboard');
      
      
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error, e.g., show error message to user
    }
  }

  return (
    <div className="bg-white text-[#40065D] min-h-screen flex flex-col">
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
          <Link href="/">
            <button className="px-4 py-2 bg-[#40065D] text-white rounded hover:bg-[#5E2A82]">
              Home
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
              <Link href="/">
                <button className="block w-full px-4 py-2 rounded border border-black text-black hover:bg-gray-100 my-2">
                  Home
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

      {/* Login Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center px-4 py-8">
        <h2 className="text-3xl font-extrabold mb-4">Login to Your Account</h2>
        <form className="w-full max-w-sm space-y-4">
          <div>
            <label className="block text-left font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-[#40065D] rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-left font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-[#40065D] rounded-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-[#40065D] text-white rounded-lg hover:bg-[#5E2A82]"
          >
            Login
          </button>
          <button
            className="w-full px-4 py-2 bg-[#DB4437] text-white rounded-lg hover:bg-[#D1352D]"
            // OnClick handler for Google login will be added later
          >
            Login with Google
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 px-8 text-gray-600">
        <p className="text-center text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <span className="text-[#40065D] font-semibold hover:underline">Sign Up</span>
          </Link>
        </p>
      </footer>
    </div>
  );
}
