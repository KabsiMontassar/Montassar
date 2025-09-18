import React from 'react'

const SectionF = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Section F</h1>
        <p className="text-xl text-gray-300">This is a test section with Tailwind CSS</p>
        <button className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300">
          Test Button
        </button>
      </div>
    </div>
  )
}

export default SectionF