
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Briefcase, CheckSquare, Square } from "lucide-react";
import StatusChangeModal from '../application/StatusChangeModal'
import UndoButton from "../application/UndoButton";
import ApplicationCard from "../application/ApplicationCard";
import FilterBar from "../application/FilterBar";
import StatsDashboard from "../application/StatsDashboard";
import BulkActionToolbar from "../application/BulkActionToolbar";
import SearchBar from "../application/SearchBar";
import AdvancedFilters from "../application/AdvancedFilters";

import {
  deleteApplication,
  updateApplicationStatus,
  bulkDeleteApplications,
  undoLastAction
} from "../../redux/slices/sliceApplication";

function Applications({onEdit}) {
  const applications = useSelector((state) => state.applications.applications);
  const lastAction = useSelector((state) => state.applications.lastAction);
  const dispatch = useDispatch();
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedIds, setSelectedIds] = useState([]);
  
  const [statusChangeModal, setStatusChangeModal] = useState({
    isOpen: false,
    applicationId: null,
    applicationName: '',
    currentStatus: '',
    newStatus: ''
  });
  
  // NEW: Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    statuses: [],
    jobTypes: [],
    dateFrom: '',
    dateTo: ''
  });
  
  // UPDATED: Enhanced filter and search logic
  const filteredAndSortedApplications = useMemo(() => {
    let result = applications.filter(app => !app.archived);
    
    // Search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      result = result.filter(app => 
        app.company.toLowerCase().includes(search) ||
        app.role.toLowerCase().includes(search) ||
        (app.applicationUrl && app.applicationUrl.toLowerCase().includes(search))
      );
    }
    
    // Advanced filters - Status
    if (advancedFilters.statuses.length > 0) {
      result = result.filter(app => advancedFilters.statuses.includes(app.status));
    } else if (statusFilter !== 'all') {
      // Use old status filter if no advanced status filter
      result = result.filter(app => app.status === statusFilter);
    }
    
    // Advanced filters - Job Type
    if (advancedFilters.jobTypes.length > 0) {
      result = result.filter(app => advancedFilters.jobTypes.includes(app.jobType));
    }
    
    // Advanced filters - Date Range
    if (advancedFilters.dateFrom) {
      result = result.filter(app => 
        new Date(app.dateApplied) >= new Date(advancedFilters.dateFrom)
      );
    }
    if (advancedFilters.dateTo) {
      result = result.filter(app => 
        new Date(app.dateApplied) <= new Date(advancedFilters.dateTo)
      );
    }
    
    // Sorting
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
  }, [applications, statusFilter, sortBy, searchTerm, advancedFilters]);
  
  // Reset advanced filters
  const handleResetFilters = () => {
    setAdvancedFilters({
      statuses: [],
      jobTypes: [],
      dateFrom: '',
      dateTo: ''
    });
    setSearchTerm('');
    setStatusFilter('all');
  };
  
  // ... existing handlers (handleDelete, handleEdit, etc.) ...
  
  const handleDelete = (id) => {
    const app = applications.find(a => a.id === id);
    if (!app) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete the application for ${app.role} at ${app.company}?\n\nThis action cannot be undone.`
    );
    
    if (confirmed) {
      dispatch(deleteApplication(id));
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };
  
  const handleEdit = (application) => {
    onEdit(application);
  };
  
  const handleStatusChange = (id, newStatus) => {
    const app = applications.find(a => a.id === id);
    if (!app) return;
    
    const validTransitions = {
      'applied': ['hr-round', 'technical-round', 'rejected'],
      'hr-round': ['technical-round', 'rejected'],
      'technical-round': ['offer', 'rejected'],
      'offer': [],
      'rejected': []
    };
    
    if (!validTransitions[app.status]?.includes(newStatus)) {
      alert(`Cannot change from "${app.status}" to "${newStatus}". Invalid transition.`);
      return;
    }
    
    setStatusChangeModal({
      isOpen: true,
      applicationId: id,
      applicationName: `${app.role} at ${app.company}`,
      currentStatus: app.status,
      newStatus: newStatus
    });
  };
  
  const handleConfirmStatusChange = (reason) => {
    dispatch(updateApplicationStatus({
      id: statusChangeModal.applicationId,
      newStatus: statusChangeModal.newStatus,
      reason
    }));
    
    setStatusChangeModal({
      isOpen: false,
      applicationId: null,
      applicationName: '',
      currentStatus: '',
      newStatus: ''
    });
  };
  
  const handleToggleSelect = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const handleSelectAll = () => {
    const allVisibleIds = filteredAndSortedApplications.map(app => app.id);
    setSelectedIds(allVisibleIds);
  };
  
  const handleDeselectAll = () => {
    setSelectedIds([]);
  };
  
  const allSelected = filteredAndSortedApplications.length > 0 && 
    filteredAndSortedApplications.every(app => selectedIds.includes(app.id));
  
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} selected application${selectedIds.length > 1 ? 's' : ''}?\n\nThis action cannot be undone.`
    );
    
    if (confirmed) {
      dispatch(bulkDeleteApplications(selectedIds));
      setSelectedIds([]);
    }
  };
  
  const handleBulkStatusChange = (newStatus) => {
    if (selectedIds.length === 0) return;
    
    const confirmed = window.confirm(
      `Change status to "${newStatus}" for ${selectedIds.length} selected application${selectedIds.length > 1 ? 's' : ''}?`
    );
    
    if (confirmed) {
      dispatch(bulkUpdateStatus({ ids: selectedIds, newStatus }));
      setSelectedIds([]);
    }
  };
  
  const handleUndo = () => {
    dispatch(undoLastAction());
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
      
      {/* Stats Dashboard */}
      {applications.length > 0 && <StatsDashboard applications={applications} />}
      
      
     
      
      {/* Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <BulkActionToolbar
          selectedCount={selectedIds.length}
          onBulkDelete={handleBulkDelete}
          onBulkStatusChange={handleBulkStatusChange}
          onDeselectAll={handleDeselectAll}
        />
      )}
      
      {/* NEW: Search Bar */}
      {applications.length > 0 && (
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAdvancedToggle={() => setShowAdvancedFilters(!showAdvancedFilters)}
          showAdvanced={showAdvancedFilters}
        />
      )}
      
      {/* NEW: Advanced Filters */}
      {showAdvancedFilters && (
        <AdvancedFilters
          filters={advancedFilters}
          onFiltersChange={setAdvancedFilters}
          onClose={() => setShowAdvancedFilters(false)}
          onReset={handleResetFilters}
        />
      )}
      
      {/* Filter bar */}
      {applications.length > 0 && !showAdvancedFilters && (
        <div className="space-y-4 mb-6">
          <FilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalCount={filteredAndSortedApplications.length}
          />
          
          {/* Select All */}
          {filteredAndSortedApplications.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={allSelected ? handleDeselectAll : handleSelectAll}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {allSelected ? (
                  <>
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Deselect All</span>
                  </>
                ) : (
                  <>
                    <Square className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Select All</span>
                  </>
                )}
              </button>
              
              {selectedIds.length > 0 && (
                <span className="text-sm text-gray-600">
                  {selectedIds.length} of {filteredAndSortedApplications.length} selected
                </span>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Applications List or Empty State */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No Applications Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start tracking your job applications by adding your first one!
          </p>
        </div>
      ) : filteredAndSortedApplications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No Applications Found
          </h2>
          <p className="text-gray-600 mb-4">
            {searchTerm 
              ? `No results for "${searchTerm}"`
              : 'No applications match the current filters'
            }
          </p>
          <button
            onClick={handleResetFilters}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Clear All Filters & Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredAndSortedApplications.map((app) => (
            <ApplicationCard 
              key={app.id} 
              application={app}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              isSelected={selectedIds.includes(app.id)}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </div>
      )}
      
      {/* Status Change Modal */}
      <StatusChangeModal
        isOpen={statusChangeModal.isOpen}
        onClose={() => setStatusChangeModal({ ...statusChangeModal, isOpen: false })}
        onConfirm={handleConfirmStatusChange}
        currentStatus={statusChangeModal.currentStatus}
        newStatus={statusChangeModal.newStatus}
        applicationName={statusChangeModal.applicationName}
      />
      
      {/* Undo Button */}
      <UndoButton
        onUndo={handleUndo}
        lastAction={lastAction}
      />
      
    </div>
  );
}

export default Applications;