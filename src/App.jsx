import Layout from './Components/Layout/Layout.jsx';
import AddApplication from './Components/pages/AddApplication.jsx';
import Settings from './Components/pages/Settings.jsx';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('addApplication');
  return (
    <Layout>
      
      <div className="mb-4 flex space-x-2">
        <button 
          onClick={() => setCurrentPage('addApplication')}
          className={`px-4 py-2 rounded ${currentPage === 'addApplication' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Add Application
        </button>
        <button 
          onClick={() => setCurrentPage('settings')}
          className={`px-4 py-2 rounded ${currentPage === 'settings' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Settings
        </button>
      </div>
      
      {/* Show page based on state */}
      {currentPage === 'addApplication' && <AddApplication />}
      {currentPage === 'settings' && <Settings />}
      
    </Layout>
  );
}

export default App;