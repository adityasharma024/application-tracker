import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase } from 'lucide-react';
import ApplicationCard from '../application/ApplicationCard';
import FilterBar from '../application/FilterBar';
import { deleteApplication } from '../../redux/slices/sliceApplication';


function Applications({onEdit}) {
  // Get applications from Redux
  const applications = useSelector((state) => state.applications.applications);
  const dispatch = useDispatch();  // Get dispatch function
  
  // Filter and sort state
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter and sort applications
  const filteredAndSortedApplications = useMemo(() => {
    let result = [...applications];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(app => app.status === statusFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'company':
        result.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'status':
        result.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }
    
    return result;
  }, [applications, statusFilter, sortBy]);
  
  // Handle delete with confirmation
  const handleDelete = (id) => {
    // Find the application to show in confirmation
    const app = applications.find(a => a.id === id);
    
    if (!app) return;
    
    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete the application for ${app.role} at ${app.company}?\n\nThis action cannot be undone.`
    );
    
    if (confirmed) {
      dispatch(deleteApplication(id));
      
      // Optional: Show success message
      alert(`✅ Application for ${app.role} at ${app.company} has been deleted.`);
    }
  };
  
  // Handle edit - will implement in next part
  const handleEdit = (application) => {
    onEdit(application);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Applications
        </h1>
        <p className="text-gray-600">
          Track and manage all your job applications in one place
        </p>
      </div>
      
      {/* Show filter bar only if there are applications */}
      {applications.length > 0 && (
        <FilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={filteredAndSortedApplications.length}
        />
      )}
      
      {/* Applications List or Empty State */}
      {applications.length === 0 ? (
        
        /* Empty State - No applications at all */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No Applications Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start tracking your job applications by adding your first one!
          </p>
          <p className="text-sm text-gray-500">
            Click "Add Application" above to get started
          </p>
        </div>
        
      ) : filteredAndSortedApplications.length === 0 ? (
        
        /* Empty State - Filter returned no results */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No Applications Found
          </h2>
          <p className="text-gray-600 mb-4">
            No applications match the current filter
          </p>
          <button
            onClick={() => setStatusFilter('all')}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Clear Filters
          </button>
        </div>
        
      ) : (
        
        /* Applications Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredAndSortedApplications.map((app) => (
            <ApplicationCard 
              key={app.id} 
              application={app}
              onEdit={handleEdit}     
              onDelete={handleDelete}  
            />
          ))}
        </div>
        
      )}
      
    </div>
  );
}

export default Applications;
