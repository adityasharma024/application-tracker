import Button from "./Components/common/Button";

function App() {
  // Function that runs when button is clicked
  const handleSave = () => {
    alert("Application Saved!");
  }
  
  const handleDelete = () => {
    alert("Application Deleted!");
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Day 2: Interactive Buttons
        </h1>
        
        <div className="space-y-3">
          <Button variant="primary" onClick={handleSave}>
            Save Application
          </Button>
          
          <Button variant="danger" onClick={handleDelete}>
            Delete Application
          </Button>
          <Button variant="success" onClick={() => alert("Success!")}>
            Submit Application
          </Button>
          
          <Button variant="secondary" onClick={() => alert("Cancelled!")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App;
