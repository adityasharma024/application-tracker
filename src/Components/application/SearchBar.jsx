import { Search, SlidersHorizontal, X } from 'lucide-react';
import React, { useState } from 'react'

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onAdvancedToggle,
  showAdvanced
}) => {
  const [isfocused, setIsFocused] =useState(false);
  const handClear=()=>{
    onSearchChange('');

  };

  
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4'>
      <div className="flex items-center space-x-3">
        <div className={`flex-1 relative transiton-all ${isfocused? 'ring-2 ring-blue-500 rounded-lg':''}`}>
          <div className="flex items-center">
            <Search className='absolute left-4 w-5 h-5 text-gray-400'/>
            <input type='text' value={searchTerm}
            onChange={(e)=>onSearchChange(e.target.value)}
            onFocus={()=>setIsFocused(true)}
            onBlur={()=>setIsFocused(false)}
            placeholder='Search by company, role, or any keyword...'
            className='w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            {searchTerm && (
              <button onClick={handClear} className='absolute right-3 text-gray-400 hover:text-gray-600 transition-colors'>
                <X className='w-5 h-5'/>


              </button>
            )}
          </div>
        </div>
        <button onClick={onAdvancedToggle} className={`flex items-center space-x-2 px-4 py-2.5 border rounded-lg font-medium transition-colors ${showAdvanced ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
          <SlidersHorizontal className='w-5 h-5'/>
          <span>Filters</span>
        </button>
      </div>
      {searchTerm && (
        <div className="mt-2 text-sm text-gray-600">
          Searching for: <strong className='text-gray-900'>{searchTerm}</strong>
        </div>
      )}

    </div>
  )
}

export default SearchBar