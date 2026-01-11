
function Input(props){
    const{
        label,
        type,
        placeholder,
        value,
        onChange,
        required

    } = props;
  
    return(
        <div className="mb-4">
        {label && (
            <label className="block text-gray-700 mb-2 font-semibold">{label}
            {required && <span className="text-red-500 ml-1">*</span>}
            </label>
        )}
        <input
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg foucus:right-2 foucs:ring-blue-500 foucs:border-transparent putline-none transition-all"
        />
        
        </div>
    
    );

}
export default Input;