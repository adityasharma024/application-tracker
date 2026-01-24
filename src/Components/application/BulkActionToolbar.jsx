import React from "react";
import { Trash2, Edit3, X, CheckSquare } from "lucide-react";

const BulkActionToolbar = ({
  selectedCount,
  onBulkDelete,          // ✅ fixed name
  onBulkStatusChange,    // ✅ must be passed from parent
  onDeselectAll,
}) => {
  const statusOptions = [
    { value: "applied", label: "Applied" },
    { value: "hr-round", label: "HR Round" },
    { value: "technical-round", label: "Technical Round" },
    { value: "offer", label: "Offer" },
    { value: "rejected", label: "Rejected" },
  ];

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus && onBulkStatusChange) {
      onBulkStatusChange(newStatus);
      e.target.value = ""; // reset dropdown
    }
  };

  return (
    <div className="bg-blue-600 text-white rounded-lg shadow-lg p-4 mb-6 animate-slideDown">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CheckSquare className="w-5 h-5" />
          <span className="font-semibold">
            {selectedCount}{" "}
            {selectedCount === 1 ? "application" : "applications"} selected
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Bulk Status Change */}
          <div className="flex items-center space-x-2">
            <Edit3 className="w-4 h-4" />
            <select
              onChange={handleStatusChange}
              defaultValue=""
              className="bg-white text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="" disabled>
                Change Status
              </option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Bulk Delete */}
          <button
            onClick={onBulkDelete}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-700 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Selected</span>
          </button>

          {/* Deselect */}
          <button
            onClick={onDeselectAll}
            className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="text-sm">Deselect All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionToolbar;
