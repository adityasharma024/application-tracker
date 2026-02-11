import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

function UndoButton({onUndo, lastAction}){
    const[showUndo, setShowUndo]=useState(false);
    useEffect(()=>{
        if(lastAction){
            setShowUndo(true);
            const timer=setTimeout(()=>{
                setShowUndo(false);
            },10000);
            return ()=>clearTimeout(timer);
        }
    },[lastAction]);
    if(!showUndo || !lastAction) return null;
    const getActionText=()=>{
        switch (lastAction.type) {
      case 'ADD':
        return 'Added application';
      case 'DELETE':
        return 'Deleted application';
      case 'BULK_DELETE':
        return `Deleted ${lastAction.payload.length} applications`;
      case 'UPDATE':
        return 'Updated application';
      case 'STATUS_CHANGE':
        return 'Changed status';
      case 'BULK_STATUS_CHANGE':
        return `Changed status for ${lastAction.payload.length} applications`;
      default:
        return 'Last action';
    }
        
    };
    return(
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className="bg-gray-900 text-white rounded-lg shadow-2xl p-4 flex items-center space-x-3">
        <span className="text-sm font-medium">
          {getActionText()}
        </span>
        <button
          onClick={() => {
            onUndo();
            setShowUndo(false);
          }}
          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Undo</span>
        </button>
      </div>
    </div>

    );
}
export default UndoButton;