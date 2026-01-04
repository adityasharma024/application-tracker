function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-md">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Tailwind CSS Working! 🎉
        </h1>
        <p className="text-gray-700 text-lg">
          If you see this styled beautifully, we're good to go!
        </p>
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Test Button
        </button>
      </div>
    </div>
  )
}

export default App