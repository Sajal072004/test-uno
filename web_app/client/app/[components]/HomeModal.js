import React from 'react'

const HomeModal = ({handleModalOption}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-md shadow-md w-96 text-center">
      <h2 className="text-lg font-semibold mb-4">Welcome to Unoclave Chat</h2>
      <p className="mb-6 text-gray-600">
        You can sign up to save your chat history or continue without signing up.
      </p>
      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => handleModalOption("signUp")}
          className="bg-[#40065D] text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
        <button
          onClick={() => handleModalOption("continue")}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Continue Without Signup
        </button>
      </div>
    </div>
  </div>
  )
}

export default HomeModal