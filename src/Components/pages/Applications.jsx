import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Briefcase, CheckSquare, Square } from "lucide-react";

import ApplicationCard from "../application/ApplicationCard";
import FilterBar from "../application/FilterBar";
import StatsDashboard from "../application/StatsDashboard";
import BulkActionToolbar from "../application/BulkActionToolbar";

import {
  deleteApplication,
  updateApplicationStatus,
  bulkDeleteApplications,
} from "../../redux/slices/sliceApplication";

function Applications({ onEdit }) {
  const applications = useSelector(
    (state) => state.applications.applications
  );
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedIds, setSelectedIds] = useState([]);

  /* ---------------- FILTER + SORT ---------------- */
  const filteredAndSortedApplications = useMemo(() => {
    let result = [...applications];

    if (statusFilter !== "all") {
      result = result.filter((app) => app.status === statusFilter);
    }

    switch (sortBy) {
      case "newest":
        result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "oldest":
        result.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "company":
        result.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case "status":
        result.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }

    return result;
  }, [applications, statusFilter, sortBy]);

  /* ---------------- SELECTION LOGIC ---------------- */
  const allSelected =
    filteredAndSortedApplications.length > 0 &&
    selectedIds.length === filteredAndSortedApplications.length;

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(filteredAndSortedApplications.map((app) => app.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  /* ---------------- ACTIONS ---------------- */
  const handleDelete = (id) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${app.role} at ${app.company}?`
    );

    if (confirmed) {
      dispatch(deleteApplication(id));
      setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    }
  };

  const handleEdit = (application) => {
    onEdit(application);
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateApplicationStatus({ id, newStatus }));
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected application(s)?`
    );

    if (confirmed) {
      dispatch(bulkDeleteApplications(selectedIds));
      setSelectedIds([]);
    }
  };

  /* ---------------- JSX ---------------- */
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Applications
        </h1>
        <p className="text-gray-600">
          Track and manage all your job applications
        </p>
      </div>

      {applications.length > 0 && (
        <StatsDashboard applications={applications} />
      )}

      {selectedIds.length > 0 && (
        <BulkActionToolbar
          selectedCount={selectedIds.length}
          onBulkDelete={handleBulkDelete}
          onDeselectAll={handleDeselectAll}
        />
      )}

      {applications.length > 0 && (
        <FilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={filteredAndSortedApplications.length}
        />
      )}

      {/* Select All */}
      {filteredAndSortedApplications.length > 0 && (
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={allSelected ? handleDeselectAll : handleSelectAll}
            className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg"
          >
            {allSelected ? (
              <>
                <CheckSquare className="w-4 h-4 text-blue-600" />
                <span>Deselect All</span>
              </>
            ) : (
              <>
                <Square className="w-4 h-4 text-gray-400" />
                <span>Select All</span>
              </>
            )}
          </button>

          {selectedIds.length > 0 && (
            <span className="text-sm text-gray-600">
              {selectedIds.length} selected
            </span>
          )}
        </div>
      )}

      {/* Content */}
      {applications.length === 0 ? (
        <div className="bg-white border p-12 text-center rounded-lg">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">No Applications Yet</h2>
        </div>
      ) : filteredAndSortedApplications.length === 0 ? (
        <div className="bg-white border p-12 text-center rounded-lg">
          <h2 className="text-xl font-semibold">
            No applications match filter
          </h2>
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
              onToggleSelect={handleToggleSelect}
              isSelected={selectedIds.includes(app.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;
