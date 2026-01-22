import { useState, useEffect } from 'react';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
import Textarea from '../common/Textarea.jsx';
import { useDispatch } from 'react-redux';
import { addApplication, updateApplication } from '../../redux/slices/sliceApplication.js';

function AddApplication({ editingApplication, onCancelEdit, onEditComplete }) {
  // Form state
  const dispatch = useDispatch();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobType, setJobType] = useState("");
  const [status, setStatus] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");
  const [notes, setNotes] = useState("");
  const isEditMode = !!editingApplication;

  // Error state for each field
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (editingApplication) {
      setCompany(editingApplication.company || "");
      setRole(editingApplication.role || "");
      setJobType(editingApplication.jobType || "");
      setStatus(editingApplication.status || "");
      setDateApplied(editingApplication.dateApplied || "");
      setApplicationUrl(editingApplication.applicationUrl || "");
      setNotes(editingApplication.notes || "");
    }
  }, [editingApplication]);

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

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Company validation
    if (!company.trim()) {
      newErrors.company = "Company name is required";
    } else if (company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
    }

    // Role validation
    if (!role.trim()) {
      newErrors.role = "Job role is required";
    } else if (role.trim().length < 2) {
      newErrors.role = "Job role must be at least 2 characters";
    }

    // Job Type validation
    if (!jobType) {
      newErrors.jobType = "Please select a job type";
    }

    // Status validation
    if (!status) {
      newErrors.status = "Please select current status";
    }

    // Date validation
    if (!dateApplied) {
      newErrors.dateApplied = "Date applied is required";
    } else {
      // Check if date is not in the future
      const selectedDate = new Date(dateApplied);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        newErrors.dateApplied = "Date cannot be in the future";
      }
    }

    // URL validation (optional field, but validate format if provided)
    if (applicationUrl && applicationUrl.trim()) {
      // Simple URL validation
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(applicationUrl)) {
        newErrors.applicationUrl = "Please enter a valid URL (must start with http:// or https://)";
      }
    }

    // Notes validation (optional, but check length if provided)
    if (notes && notes.length > 500) {
      newErrors.notes = "Notes must be less than 500 characters";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();

    // If there are errors, set them and stop submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Scroll to top to see errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Clear any previous errors
    setErrors({});

    if (isEditMode) {
      const updatedApplication = {
        id: editingApplication.id,
        updatedData: {
          company: company.trim(),
          role: role.trim(),
          jobType,
          status,
          dateApplied,
          applicationUrl: applicationUrl.trim(),
          notes: notes.trim(),
          updatedAt: new Date().toISOString()
        }
      };
      dispatch(updateApplication(updatedApplication));
      alert(`✅ Application for ${role} at ${company} updated successfully!`);
      if (onEditComplete) {
        onEditComplete();
      }
      clearForm();
    } else {
      const newApplication = {
        id: Date.now(),
        company: company.trim(),
        role: role.trim(),
        jobType,
        status,
        dateApplied,
        applicationUrl: applicationUrl.trim(),
        notes: notes.trim(),
        createdAt: new Date().toISOString()
      };
      dispatch(addApplication(newApplication));
      alert(`✅ Application for ${role} at ${company} added successfully!`);
      clearForm();
    }
  };

  // Clear form function
  const clearForm = () => {
    setCompany("");
    setRole("");
    setJobType("");
    setStatus("");
    setDateApplied("");
    setApplicationUrl("");
    setNotes("");
    setErrors({});
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    clearForm();
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isEditMode ? 'Edit Application' : 'Add New Application'}
        </h1>
        <p className="text-gray-600">
          {isEditMode ? 'Update the details of your job application' : 'Fill in the details of your job application'}
        </p>
      </div>

      {/* Error Summary (if there are errors) */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <span className="text-red-600 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="text-red-800 font-semibold mb-2">
                Please fix the following errors:
              </h3>
              <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>

          {/* Company Name */}
          <Input
            label="Company Name"
            name="company"
            placeholder="e.g., Google, Microsoft, Amazon"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              // Clear error when user starts typing
              if (errors.company) {
                setErrors({ ...errors, company: null });
              }
            }}
            required
            error={errors.company}
            helperText="Enter the name of the company you're applying to"
          />

          {/* Job Role */}
          <Input
            label="Job Role"
            name="role"
            placeholder="e.g., Frontend Developer, Software Engineer"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              if (errors.role) {
                setErrors({ ...errors, role: null });
              }
            }}
            required
            error={errors.role}
            helperText="What position are you applying for?"
          />

          {/* Two columns for Job Type and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Job Type */}
            <Select
              label="Job Type"
              name="jobType"
              placeholder="Select job type"
              value={jobType}
              onChange={(e) => {
                setJobType(e.target.value);
                if (errors.jobType) {
                  setErrors({ ...errors, jobType: null });
                }
              }}
              options={jobTypeOptions}
              required
              error={errors.jobType}
            />

            {/* Status */}
            <Select
              label="Current Status"
              name="status"
              placeholder="Select status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                if (errors.status) {
                  setErrors({ ...errors, status: null });
                }
              }}
              options={statusOptions}
              required
              error={errors.status}
            />

          </div>

          {/* Date Applied */}
          <Input
            label="Date Applied"
            name="dateApplied"
            type="date"
            value={dateApplied}
            onChange={(e) => {
              setDateApplied(e.target.value);
              if (errors.dateApplied) {
                setErrors({ ...errors, dateApplied: null });
              }
            }}
            required
            error={errors.dateApplied}
            helperText="When did you submit this application?"
          />

          {/* Application URL (Optional) */}
          <Input
            label="Application URL"
            name="applicationUrl"
            type="url"
            placeholder="https://company.com/jobs/123"
            value={applicationUrl}
            onChange={(e) => {
              setApplicationUrl(e.target.value);
              if (errors.applicationUrl) {
                setErrors({ ...errors, applicationUrl: null });
              }
            }}
            error={errors.applicationUrl}
            helperText="Link to the job posting (optional)"
          />

          {/* Notes */}
          <Textarea
            label="Notes"
            name="notes"
            placeholder="Add any notes about this application (interview tips, contact person, etc.)"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (errors.notes) {
                setErrors({ ...errors, notes: null });
              }
            }}
            rows={5}
            error={errors.notes}
            helperText="Optional: Add any relevant notes (max 500 characters)"
          />

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <span>{isEditMode ? 'Update Application' : 'Add Application'}</span>
            </button>

            {isEditMode ? (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={clearForm}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

        </form>
      </div>

    </div>
  );
}

export default AddApplication;