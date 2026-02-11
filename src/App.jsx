
import { useSelector } from 'react-redux';
import Layout from './Components/Layout/Layout.jsx';
import AddApplication from './Components/pages/AddApplication.jsx';
import Applications from './Components/pages/Applications.jsx';  // ← Add this import
import Settings from './Components/pages/Settings.jsx';
import { useState } from 'react';
import Dashboard from './Components/pages/Dashboard.jsx';
import FirebaseTest from './Components/firebase/FirebaseTest.jsx';
function App() {
  const [currentPage, setCurrentPage] = useState('firebase-test');  // Changed to test page
  const [editingApplication, setEditingApplication] = useState(null);
  const applications = useSelector((state) => state.applications.applications);
  
  const handleEdit = (application) => {
    setEditingApplication(application);
    setCurrentPage('addApplication');
  };
  
  const handleCancelEdit = () => {
    setEditingApplication(null);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setEditingApplication(null);
  };

  return (
    <Layout currentPage={currentPage} onPageChange={handlePageChange}>
      
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-900">
              {currentPage === 'firebase-test' && '🔥 Firebase Setup'}
              {currentPage === 'dashboard' && '📊 Dashboard'}
              {currentPage === 'view' && '📋 My Applications'}
              {currentPage === 'addApplication' && (editingApplication ? '✏️ Edit Application' : '➕ Add New Application')}
              {currentPage === 'settings' && '⚙️ Settings'}
            </h2>
            <p className="text-sm text-blue-700">
              Total Applications: <strong className="text-purple-600">{applications.length}</strong>
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentPage('firebase-test')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 'firebase-test' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-white text-orange-600 hover:bg-orange-50'
              }`}
            >
              🔥 Test Firebase
            </button>
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 'dashboard' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
      
      {/* Render Pages */}
      {currentPage === 'firebase-test' && <FirebaseTest />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'addApplication' && (
        <AddApplication 
          editingApplication={editingApplication}
          onCancelEdit={handleCancelEdit}
          onEditComplete={() => {
            setEditingApplication(null);
            setCurrentPage('view');
          }}
        />
      )}
      {currentPage === 'view' && <Applications onEdit={handleEdit} />}
      {currentPage === 'settings' && <Settings />}
      
    </Layout>
  );
}

export default App;