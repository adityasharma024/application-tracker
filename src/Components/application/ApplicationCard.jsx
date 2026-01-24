import React, { useState } from "react";
import {
  Calendar,
  Briefcase,
  ExternalLink,
  StickyNote,
  Pencil,
  Trash2,
  Clock,
} from "lucide-react";

function ApplicationCard({ application, onEdit, onDelete, onStatusChange }) {
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  // Get status color based on status
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

  // Format status text
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

  // Format job type
  const formatJobType = (type) =>
    type === "internship" ? "Internship" : "Full-time";

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Time ago helper
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {application.company}
          </h3>
          <p className="text-lg text-gray-700 font-medium">
            {application.role}
          </p>
        </div>

        <div className="relative">
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
              className="px-3 py-1 rounded-full text-sm font-semibold border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Info Row */}
      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1.5">
          <Briefcase className="w-4 h-4 text-blue-600" />
          <span className="font-medium">
            {formatJobType(application.jobType)}
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Applied: {formatDate(application.dateApplied)}</span>
        </div>

        {application.updatedAt && (
          <div className="flex items-center space-x-1.5 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated {timeAgo(application.updatedAt)}</span>
          </div>
        )}
      </div>

      {/* Status History */}
      {application.statusHistory?.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs font-semibold text-blue-900 mb-2">
            Status History:
          </p>
          <div className="space-y-1">
            {application.statusHistory
              .slice(-3)
              .reverse()
              .map((history, index) => (
                <div
                  key={index}
                  className="text-xs text-blue-700 flex items-center space-x-2"
                >
                  <span>{formatStatus(history.from)}</span>
                  <span>→</span>
                  <span className="font-semibold">
                    {formatStatus(history.to)}
                  </span>
                  <span className="text-blue-500">
                    • {timeAgo(history.changedAt)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {application.notes?.trim() && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <StickyNote className="w-4 h-4 text-amber-600 mt-0.5" />
            <p className="text-sm text-gray-700">{application.notes}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        {application.applicationUrl?.trim() ? (
          <a
            href={application.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <span>View Job Posting</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <div />
        )}

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(application)}
            className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 border border-blue-300 rounded-lg text-sm font-medium"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </button>

          <button
            onClick={() => onDelete(application.id)}
            className="flex items-center space-x-1 px-3 py-1.5 text-red-600 hover:bg-red-50 border border-red-300 rounded-lg text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
