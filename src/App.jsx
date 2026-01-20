import { useSelector } from 'react-redux';
import Layout from './Components/Layout/Layout.jsx';
import AddApplication from './Components/pages/AddApplication.jsx';
import Applications from './Components/pages/Applications.jsx';  // ← Add this import
import Settings from './Components/pages/Settings.jsx';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('addApplication');
  const applications = useSelector((state) => state.applications.applications);

  return (
    <Layout>
      
      {/* Navigation Buttons */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 p-4">
        <div className="mb-3">
         
          <p className="text-blue-700">
            Total Applications: <strong className="text-purple-600">{applications.length}</strong>
          </p>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentPage('addApplication')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentPage === 'addApplication' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            ➕ Add Application
          </button>
          
          <button
            onClick={() => setCurrentPage('view')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentPage === 'view'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            📋 View Applications ({applications.length})
          </button>
          
          <button 
            onClick={() => setCurrentPage('settings')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentPage === 'settings' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            ⚙️ Settings
          </button>
        </div>
      </div>
      
      {/* Show page based on state */}
      {currentPage === 'addApplication' && <AddApplication />}
      {currentPage === 'view' && <Applications />}  {/* ← Add this line */}
      {currentPage === 'settings' && <Settings />}
      
    </Layout>
  );
}

export default App;