import React from 'react'

const Textarea = (props) => {
    const {
       label,
    value,
    onChange,
    placeholder,
    required,
    error,
    helperText,
    disabled,
    name,
    rows
    }=props;
  return (
    <div className='mb-4'>
        {label && (
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
        )}
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows || 4}
            className={
                `w-full px-4 py-2.5 rounded-lg border outline-none transition-all resize-none
                ${error? 'border-red-500 focus:ring-2 focus:ring-red-200':
                    'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'}
                    ${disabled? 'bg-gray-100 cursor-not-allowed text-gray-500':
                    'bg-white'
                    }

                }`
            }
            />
        <div className='flex justify-between items-center mt-1'>
            <div>
                {error && (
                    <p className='text-sm text-red-600 flex items-center'>
                        <span className='mr-1'>⚠️</span>
                        {error}
                    </p>
                )}


            </div>
            {value && (
                <span className='text-xs text-gray-400'>
                    {value.length} characters
                </span>
            )}
        </div>
    </div>
  )
}

export default Textarea;