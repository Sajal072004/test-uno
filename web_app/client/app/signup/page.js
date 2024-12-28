"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "../utils/authApi"; // Import the signup API function



export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false); // To manage loading state

  const router = useRouter(); // Initialize the useNavigate hook for redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          country,
          state,
          city,
          street,
        }),
      });

      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      const data = await response.json();

      localStorage.setItem("unoClave-token", data.token);

      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

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
          <Link href="/login">
            <button className="px-4 py-2 bg-[#40065D] text-white rounded hover:bg-[#5E2A82]">
              Login
            </button>
          </Link>
          <button className="px-4 py-2 bg-[#40065D] text-white rounded hover:bg-[#5E2A82]">
            Help us improve Unoclave
          </button>
          <Link href={"/dashboard"}>
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
                <button className="block w-full px-4 py-2 rounded border border-black text-black hover:bg-gray-100 mt-4">
                  Home
                </button>
              </Link>
              <Link href="/login">
                <button className="block w-full px-4 py-2 rounded border border-black text-black hover:bg-gray-100 mt-4">
                  Login
                </button>
              </Link>
              <button className="block w-full px-4 py-2 rounded border border-black text-black hover:bg-gray-100 mt-4">
                Help us improve
              </button>
              <Link href={"/dashboard"}>
                <button className="block w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400 mt-4">
                  Try Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Sign Up Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center px-4 py-8">
        <h2 className="text-3xl font-extrabold mb-4">Create Your Account</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          {/* Full Name, Email, Password, and Confirm Password in two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-left font-semibold mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-[#40065D] rounded-lg"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="block text-left font-semibold mb-1"
                htmlFor="email"
              >
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
                required
              />
            </div>
            <div>
              <label
                className="block text-left font-semibold mb-1"
                htmlFor="password"
              >
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
                required
              />
            </div>
            <div>
              <label
                className="block text-left font-semibold mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-2 border border-[#40065D] rounded-lg"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Address fields (Country, State, City, Street) in two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-left font-semibold mb-1"
                htmlFor="country"
              >
                Country (Optional)
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className="w-full px-4 py-2 border border-[#40065D] rounded-lg"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-left font-semibold mb-1"
                htmlFor="state"
              >
                State (Optional)
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="w-full px-4 py-2 border border-[#40065D] rounded-lg"
                placeholder="Enter your state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-left font-semibold mb-1"
                htmlFor="city"
              >
                City (Optional)
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full px-4 py-2 border border-[#40065D] rounded-lg"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-left font-semibold mb-1"
                htmlFor="street"
              >
                Street (Optional)
              </label>
              <input
                type="text"
                id="street"
                name="street"
                className="w-full px-4 py-2 border border-[#40065D] rounded-lg"
                placeholder="Enter your street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#40065D] text-white rounded-lg hover:bg-[#5E2A82] disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </section>
    </div>
  );
}
