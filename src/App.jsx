import { useState } from 'react';
import Input from './Components/common/Input.jsx';

function App() {
  // State for each input field
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    
    // Log the values
    console.log("Company:", company);
    console.log("Role:", role);
    console.log("Date:", dateApplied);
    
    // Show alert
    alert(`Application for ${role} at ${company} saved!`);
    
    // Clear form
    setCompany("");
    setRole("");
    setDateApplied("");
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Add Job Application
        </h1>
        
        <form onSubmit={handleSubmit}>
          {/* Company Input */}
          <Input
            label="Company Name"
            placeholder="e.g., Google, Microsoft"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          
          {/* Role Input */}
          <Input
            label="Job Role"
            placeholder="e.g., Frontend Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          
          {/* Date Input */}
          <Input
            label="Date Applied"
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            required
          />
          
          {/* Display current values (for learning) */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Current Values (State):
            </p>
            <p className="text-sm text-gray-600">Company: {company || "(empty)"}</p>
            <p className="text-sm text-gray-600">Role: {role || "(empty)"}</p>
            <p className="text-sm text-gray-600">Date: {dateApplied || "(empty)"}</p>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Save Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
