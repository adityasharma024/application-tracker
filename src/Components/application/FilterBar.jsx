import React from 'react'

function FilterBar({
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    totalCount
}) {
    const statusOptions = [
        { value: 'all', label: 'All Statuses' },
        { value: 'applied', label: 'Applied' },
        { value: 'hr-round', label: 'HR Round' },
        { value: 'technical-round', label: 'Technical Round' },
        { value: 'offer', label: 'Offer' },
        { value: 'rejected', label: 'Rejected' }

    ];
    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'company', label: 'Company (A-Z)' },
        { value: 'status', label: 'Status' }

    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center  md:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    <div className="flex-1">
                        <label className="block text-cs font-semibold text-gray-600 mb-1">
                            Filter By Staus
                        </label>
                        <select value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:broder-transparent outline-none'>
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>
                <div className="text-sm text-gray-600">
                    Showing <strong className='text-blue-600'>{totalCount}</strong> application{totalCount !== 1 ? 's' : ''}
                </div>
            </div>
        </div>
    )

}

export default FilterBar;