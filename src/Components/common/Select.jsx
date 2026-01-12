import React from 'react'

const Select = (props) => {
    const {
        label,          // Label text
        value,          // Current selected value
        onChange,       // Function when selection changes
        options,        // Array of options to display
        placeholder,    // Placeholder text
        required,       // Is this required?
        error,          // Error message
        helperText,     // Helper text
        disabled,       // Is disabled?
        name            // Input name
    } = props;
    
  return (
    <div className='mb-4'>
        {label && (
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
                {required && <span className='text-red-500 ml-1'>*</span>}


            </label>
        )}
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all appearance-none curson-pointer
                ${error? 'border-red-500 focus:ring-2 focus:ring-red-200': 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'}
                ${disabled? 'bg-gray-100 cursor-not-allowed text-gray-500': 'bg-white'}
            `}>
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}

                    </option>
                )}
                {options.map((option)=>(
                    <option key={option.value} value={option.value}>
                        {option.label}

                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-11 text-gray-400">
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.58613.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule="evenodd"/>

                </svg>
            </div>
            {error && (
                <p className='mt-1 text-sm text-red-600 flex items-center'>
                    <span className='mr-1'>⚠️</span>
                    {error}
                </p>
            )}

    </div>
  );
}

export default Select;