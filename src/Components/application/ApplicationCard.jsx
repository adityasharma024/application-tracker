import React from 'react'
import { Briefcase, Calendar, StickyNote, ExternalLink } from 'lucide-react';

const ApplicationCard = ({ application }) => {

  const getStatusColor = (status) => {
    const colors = {
      applied: 'bg-gray-100 text-gray-800',
      'hr-round': 'bg-blue-100 text-blue-800',
      'technical-round': 'bg-yellow-100 text-yellow-800',
      offer: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatStatus = (status) => {
    const statusMap = {
      applied: 'Applied',
      'hr-round': 'HR Round',
      'technical-round': 'Technical Round',
      offer: 'Offer',
      rejected: 'Rejected',
    };
    return statusMap[status] || status;
  };

  const formatJobType = (type) => {
    return type === 'internship' ? 'Internship' : 'Full-time';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
            application.status
          )}`}
        >
          {formatStatus(application.status)}
        </span>
      </div>

      {/* Job info */}
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
      </div>

      {/* Notes */}
      {application.notes && application.notes.trim() && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <StickyNote className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700 flex-1">
              {application.notes}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">

        {/* Application URL */}
        {application.applicationUrl && application.applicationUrl.trim() ? (
          <a
            href={application.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium group"
          >
            <span>View Job Posting</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <div />
        )}

        {/* Meta */}
        <span className="text-xs text-gray-400">
          ID: {application.id}
        </span>
      </div>
    </div>
  );
};

export default ApplicationCard;
