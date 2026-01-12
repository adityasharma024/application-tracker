import { useState } from 'react';
import Input from '../common/Input.jsx';
import Select from  './../common/Select.jsx';

function AddApplication() {
  // State for each form field
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobType, setJobType] = useState("");
  const [status, setStatus] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");
  
  // Job Type options
  const jobTypeOptions = [
    { value: 'internship', label: 'Internship' },
    { value: 'fulltime', label: 'Full-time' }
  ];
  
  // Status options
  const statusOptions = [
    { value: 'applied', label: 'Applied' },
    { value: 'hr-round', label: 'HR Round' },
    { value: 'technical-round', label: 'Technical Round' },
    { value: 'offer', label: 'Offer' },
    { value: 'rejected', label: 'Rejected' }
  ];
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create application object
    const applicationData = {
      company,
      role,
      jobType,
      status,
      dateApplied,
      applicationUrl,
      createdAt: new Date().toISOString()
    };
    
    // For now, just log it (we'll use Redux later)
    console.log("Application Data:", applicationData);
    alert(`Application for ${role} at ${company} added successfully!`);
    
    // Clear form
    setCompany("");
    setRole("");
    setJobType("");
    setStatus("");
    setDateApplied("");
    setApplicationUrl("");
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add New Application
        </h1>
        <p className="text-gray-600">
          Fill in the details of your job application
        </p>
      </div>
      
      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          
          {/* Company Name */}
          <Input
            label="Company Name"
            name="company"
            placeholder="e.g., Google, Microsoft, Amazon"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            helperText="Enter the name of the company you're applying to"
          />
          
          {/* Job Role */}
          <Input
            label="Job Role"
            name="role"
            placeholder="e.g., Frontend Developer, Software Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            helperText="What position are you applying for?"
          />
          
          {/* Job Type */}
          <Select
            label="Job Type"
            name="jobType"
            placeholder="Select job type"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            options={jobTypeOptions}
            required
          />
          
          {/* Status */}
          <Select
            label="Current Status"
            name="status"
            placeholder="Select current status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={statusOptions}
            required
            helperText="Where are you in the application process?"
          />
          
          {/* Date Applied */}
          <Input
            label="Date Applied"
            name="dateApplied"
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            required
          />
          
          {/* Application URL (Optional) */}
          <Input
            label="Application URL"
            name="applicationUrl"
            type="url"
            placeholder="https://company.com/jobs/123"
            value={applicationUrl}
            onChange={(e) => setApplicationUrl(e.target.value)}
            helperText="Link to the job posting (optional)"
          />
          
          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Add Application
            </button>
            
            <button
              type="button"
              onClick={() => {
                // Clear all fields
                setCompany("");
                setRole("");
                setJobType("");
                setStatus("");
                setDateApplied("");
                setApplicationUrl("");
              }}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
          
        </form>
      </div>
      
      {/* Preview Card (For Learning) */}
      <div className="mt-6 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          Current Form Values (State):
        </h3>
        <div className="space-y-1 text-sm">
          <p><strong>Company:</strong> {company || "(empty)"}</p>
          <p><strong>Role:</strong> {role || "(empty)"}</p>
          <p><strong>Job Type:</strong> {jobType || "(empty)"}</p>
          <p><strong>Status:</strong> {status || "(empty)"}</p>
          <p><strong>Date Applied:</strong> {dateApplied || "(empty)"}</p>
          <p><strong>URL:</strong> {applicationUrl || "(empty)"}</p>
        </div>
      </div>
      
    </div>
  );
}

export default AddApplication;