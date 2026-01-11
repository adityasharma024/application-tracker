import Layout from './Components/Layout/Layout.jsx';

function App() {
  return (
    <Layout>
      {/* Everything here appears in the main content area */}
      
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Job Tracker! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Day 4: Layout structure is complete!
        </p>
        
        {/* Example Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Dashboard
            </h2>
            <p className="text-gray-600">
              Track all your applications in one place. See stats, active interviews, and recent updates.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Applications
            </h2>
            <p className="text-gray-600">
              Manage your job applications. Add new ones, update status, and track progress.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Calendar
            </h2>
            <p className="text-gray-600">
              Schedule and track your interviews. Never miss an important date.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Settings
            </h2>
            <p className="text-gray-600">
              Customize your experience. Set reminders and preferences.
            </p>
          </div>
          
        </div>
      </div>
      
    </Layout>
  );
}

export default App;