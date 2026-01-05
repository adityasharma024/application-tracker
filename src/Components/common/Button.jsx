function Button(props){
    const {children, variant,onClick}=props;
    let buttonClass="px-4 py-2 rounded fond-semibold transition-colors";
    if(variant==="primary"){
        buttonClass+=" bg-blue-600 text-white hover:bg-blue-700";
    }else if(variant==="secondary"){
        buttonClass+=" bg-gray-200 text-gray-800 hover:bg-gray-400";
    }else if(variant==="danger"){
        buttonClass+=" bg-red-600 text-white hover:bg-red-700";
    }else if(variant==="success"){
        buttonClass+=" bg-green-600 text-white hover:bg-green-700";
    }
    else{
        buttonClass+=" bg-blue-600 text-white hover:bg-blue-700";
    }
    return(
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    )
}
export default Button;