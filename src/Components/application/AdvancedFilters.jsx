import { X } from 'lucide-react';
import React from 'react'

const AdvancedFilters = ({
    filters,
    onFiltersChange,
    onClose,
    onReset
}) => {
    const statusOptions = [
        { value: 'applied', label: 'Applied', color: 'gray' },
        { value: 'hr-round', label: 'HR Round', color: 'blue' },
        { value: 'technical-round', label: 'Technical Round', color: 'yellow' },
        { value: 'offer', label: 'Offer', color: 'green' },
        { value: 'rejected', label: 'Rejected', color: 'red' }

    ];
    const jobTypeOptions=[
        {value:'full-time', label:'Full-Time'},
        {value:'internship', label:'Internship'},
       
    ];
    const handleStatusToggle=(status)=>{
        const newStatuses=filters.statuses.includes(status)?
        filters.statuses.filter(s=>s!==status):
        [...filters.statuses, status];
        onFiltersChange({...filters, statuses:newStatuses});
    };
    const handleJobTypeToggle=(jobType)=>{
        const newTypes=filters.jobTypes.includes(jobType)?
        filters.jobTypes.filter(t=>t!==jobType):
        [...filters.jobTypes, jobType];
        onFiltersChange({...filters, jobTypes:newTypes});
    };
    const getStatusColor = (color) => {
    const colors = {
      gray: 'bg-gray-100 text-gray-800 border-gray-300',
      blue: 'bg-blue-100 text-blue-800 border-blue-300',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      green: 'bg-green-100 text-green-800 border-green-300',
      red: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[color] || colors.gray;
  };
  const hasActiveFilters= filters.statuses.length>0 || filters.jobTypes.length>0 || filters.dateFrom || filters.dateTo;


  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4'>
        <div className="flex items-center justify-between mb-6">
            <h3 className='text-lg font-bold text-gray-900'>
                Advanced Filters
            </h3>
            <button onClick={onClose} className='text-gray-400 hover:text-gray-600 transition-colors'>
                <X className='w-5 h-5'/>

            </button>

        </div>
        <div className="mb-6">
            <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Status ({filters.statuses.length>0 ? filters.statuses.length:'All'})

            </label>
            <div className="flex flex-wrap gap-2">
                {statusOptions.map((option=>(
                    <button key={option.value}
                    onClick={()=>handleStatusToggle(option.value)}
                    className={`px-3 py-1.5 border rounded-full text-sm font-medium transition-colors ${filters.statuses.includes(option.value)? getStatusColor(option.color): 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
                        {option.label}
                        {filters.statuses.includes(option.value) && (
                            <span className='ml-2 text-gray-500'>&times;</span>
                        )}
                    </button>
                )))} 
            </div>
            <p className='text-xs text-gray-500 mt-2'>
                Select multiple statuses to show applications in any of these statuses.

            </p>

        </div>
        <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Job Type ({filters.jobTypes.length > 0 ? filters.jobTypes.length : 'All'})
        </label>
        <div className="flex flex-wrap gap-2">
          {jobTypeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleJobTypeToggle(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                filters.jobTypes.includes(option.value)
                  ? 'bg-purple-100 text-purple-800 border-purple-300'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {option.label}
              {filters.jobTypes.includes(option.value) && (
                <span className="ml-1">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Date Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Date Range
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Filter applications by the date they were applied
        </p>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="text-sm font-medium text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Reset All Filters
        </button>
        
        <div className="text-sm text-gray-600">
          {hasActiveFilters ? (
            <span className="font-semibold text-blue-600">
              {[
                filters.statuses.length > 0 && `${filters.statuses.length} status`,
                filters.jobTypes.length > 0 && `${filters.jobTypes.length} job type`,
                (filters.dateFrom || filters.dateTo) && 'date range'
              ].filter(Boolean).join(', ')} active
            </span>
          ) : (
            <span>No filters active</span>
          )}
        </div>
      </div>


    </div>
  )
}

export default AdvancedFilters;
