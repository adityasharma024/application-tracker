function Input(props) {
  const { 
    label,          // Label text above input
    type,           // Input type (text, email, date, number, url, etc.)
    placeholder,    // Placeholder text
    value,          // Current value
    onChange,       // Function to call when value changes
    required,       // Is this field required?
    error,          // Error message (new!)
    helperText,     // Helper text below input (new!)
    disabled,       // Is input disabled? (new!)
    name            // Input name attribute (new!)
  } = props;
  
  return (
    <div className="mb-4">
      
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Field */}
      <input
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 rounded-lg border outline-none transition-all
          ${error 
            ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          }
          ${disabled 
            ? 'bg-gray-100 cursor-not-allowed text-gray-500' 
            : 'bg-white'
          }
        `}
      />
      
      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
      
      {/* Helper Text */}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
      
    </div>
  );
}

export default Input;