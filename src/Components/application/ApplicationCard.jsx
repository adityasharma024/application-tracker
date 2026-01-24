import React, { useState } from "react";
import {
  Calendar,
  Briefcase,
  ExternalLink,
  StickyNote,
  Pencil,
  Trash2,
  Clock,
  Square,
  CheckSquare,
} from "lucide-react";

function ApplicationCard({
  application,
  onEdit,
  onDelete,
  onStatusChange,
  isSelected,          // ✅ added
  onToggleSelect       // ✅ added
}) {
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      applied: "bg-gray-100 text-gray-800 border-gray-300",
      "hr-round": "bg-blue-100 text-blue-800 border-blue-300",
      "technical-round": "bg-yellow-100 text-yellow-800 border-yellow-300",
      offer: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const formatStatus = (status) => {
    const statusMap = {
      applied: "Applied",
      "hr-round": "HR Round",
      "technical-round": "Technical Round",
      offer: "Offer",
      rejected: "Rejected",
    };
    return statusMap[status] || status;
  };

  const formatJobType = (type) =>
    type === "internship" ? "Internship" : "Full-time";

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const diffDays = Math.floor((Date.now() - date) / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const statusOptions = [
    { value: "applied", label: "Applied" },
    { value: "hr-round", label: "HR Round" },
    { value: "technical-round", label: "Technical Round" },
    { value: "offer", label: "Offer" },
    { value: "rejected", label: "Rejected" },
  ];

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus !== application.status) {
      onStatusChange(application.id, newStatus);
    }
    setIsChangingStatus(false);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-2 p-6 transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => onToggleSelect(application.id)}
            className="mt-1"
          >
            {isSelected ? (
              <CheckSquare className="w-5 h-5 text-blue-600" />
            ) : (
              <Square className="w-5 h-5 text-gray-400 hover:text-blue-600" />
            )}
          </button>

          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {application.company}
            </h3>
            <p className="text-lg text-gray-700 font-medium">
              {application.role}
            </p>
          </div>
        </div>

        <div>
          {!isChangingStatus ? (
            <button
              onClick={() => setIsChangingStatus(true)}
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                application.status
              )}`}
            >
              {formatStatus(application.status)}
            </button>
          ) : (
            <select
              value={application.status}
              onChange={handleStatusChange}
              onBlur={() => setIsChangingStatus(false)}
              autoFocus
              className="px-3 py-1 rounded-full text-sm border"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Briefcase className="w-4 h-4 text-blue-600" />
          {formatJobType(application.jobType)}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-blue-600" />
          Applied: {formatDate(application.dateApplied)}
        </div>
        {application.updatedAt && (
          <div className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3" />
            Updated {timeAgo(application.updatedAt)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t pt-4">
        {application.applicationUrl ? (
          <a
            href={application.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm flex items-center gap-1"
          >
            View Job <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <div />
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(application)}
            className="px-3 py-1.5 border border-blue-300 text-blue-600 rounded-lg"
          >
            <Pencil className="w-4 h-4 inline" /> Edit
          </button>
          <button
            onClick={() => onDelete(application.id)}
            className="px-3 py-1.5 border border-red-300 text-red-600 rounded-lg"
          >
            <Trash2 className="w-4 h-4 inline" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
