"use client";

import React, { useState, useEffect } from "react";
import Header from "../[components]/Header";
import Sidebar from "../[components]/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: "", // Defaulted to email if not provided
    password: "********", // Placeholder
    email: "",
    city: "Not Entered", // Default value
    address: "Not Entered", // Default value
    state: "Not Entered", // Default value
    country: "Not Entered", // Default value
  });

  const [isEditable, setIsEditable] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [loading, setLoading] = useState(true);

  // Fetch User Details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user-details`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("unoClave-token")}`,
            },
          }
        );

        const userData = response.data.user;
        setProfile({
          username: userData.name || userData.email.split("@")[0],
          password: "********",
          email: userData.email || "Not Entered",
          city: userData.city || "Not Entered",
          address: userData.street || "Not Entered",
          state: userData.state || "Not Entered",
          country: userData.country || "Not Entered",
        });

        console.log("Fetched user profile:", userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-user-details`,
        {
          name: profile.username || "Not Entered",
          city: profile.city || "Not Entered",
          street: profile.address || "Not Entered",
          state: profile.state || "Not Entered",
          country: profile.country || "Not Entered",
          email: profile.email || "Not Entered",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("unoClave-token")}`,
          },
        }
      );

      
      const updatedData = response.data.user;
      setProfile({
        username: updatedData.name || updatedData.email.split("@")[0],
        password: "********",
        email: updatedData.email || "Not Entered",
        city: updatedData.city || "Not Entered",
        address: updatedData.street || "Not Entered",
        state: updatedData.state || "Not Entered",
        country: updatedData.country || "Not Entered",
      });

      setIsEditable(false);
      console.log("Profile saved successfully:", updatedData);
      toast.success("Profile Saved Successfully");
    } catch (error) {
      toast.error("Error saving profile");
      console.error("Error saving profile:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 w-full ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} currentPage="Profile" />

        {/* Profile Form */}
        <div className="container mx-auto px-6 mt-8">
          <form className="space-y-6 bg-white p-10 rounded-xl shadow-lg border border-gray-300 w-full md:w-3/4 lg:w-2/3 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="text-lg text-gray-600 font-semibold">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className={`border ${
                    isEditable ? "border-gray-300" : "border-transparent"
                  } rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#40065D] focus:outline-none bg-gray-50`}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg text-gray-600 font-semibold">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  readOnly
                  className="border border-transparent bg-gray-100 rounded-lg px-4 py-3 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg text-gray-600 font-semibold">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  readOnly
                  className="border border-transparent bg-gray-100 rounded-lg px-4 py-3 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg text-gray-600 font-semibold">City:</label>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className={`border ${
                    isEditable ? "border-gray-300" : "border-transparent"
                  } rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#40065D] focus:outline-none bg-gray-50`}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg text-gray-600 font-semibold">Street:</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className={`border ${
                    isEditable ? "border-gray-300" : "border-transparent"
                  } rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#40065D] focus:outline-none bg-gray-50`}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg text-gray-600 font-semibold">State:</label>
                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className={`border ${
                    isEditable ? "border-gray-300" : "border-transparent"
                  } rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#40065D] focus:outline-none bg-gray-50`}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg text-gray-600 font-semibold">Country:</label>
                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className={`border ${
                    isEditable ? "border-gray-300" : "border-transparent"
                  } rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#40065D] focus:outline-none bg-gray-50`}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              {isEditable ? (
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-[#40065D] text-white px-6 py-3 rounded-lg hover:bg-[#5E2A82] transition-all duration-300 shadow-md"
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-md"
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

