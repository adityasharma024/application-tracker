import React from 'react'
import { useState } from 'react'
import Textarea from '../common/Textarea.jsx'
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
const Settings = () => {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notificationPref, setNotificationPref] = useState("");
  const [errors, setErrors] = useState({});

  const notificationOptions = [
    { value: 'email', label: 'Email Only' },
    { value: 'sms', label: 'SMS Only' },
    { value: 'push', label: 'Push Notifications' },
    { value: 'both', label: 'Email and SMS' },
    { value: 'none', label: 'None' },
  ];
  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";

    }
    else if (fullName.trim().length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters";


    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes('@')) {
      newErrors.email = "Please enter a valid email address";
    }
    if (phone && phone.trim()) {
      const phoneDigits = phone.replace(/\D/g, ''); // Remove non-digits
      if (phoneDigits.length !== 10) {
        newErrors.phone = "Phone number must be 10 digits";
      }
    }
    if (!notificationPref) {
      newErrors.notificationPref = "Please select a notification preference";
    }
    if (bio.length > 200) {
      newErrors.bio = "Bio must be less than 200 characters";
    }
    return newErrors;

  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    const formErrors=validateForm();
    if(Object.keys(formErrors).length>0){
      setErrors(formErrors);
      window.scrollTo({top:0,behavior:'smooth'});
      return;

    }
    setErrors({});
    const userData={
      fullName:fullName.trim(),
      bio:bio.trim(),
      email:email.trim(),
      phone:phone.trim(),
      notificationPref,
      updatedAt:new Date().toISOString(),
    };
    console.log("✅ Settings saved:", userData);
    alert(`✅ Settings saved successfully!\n\nName: ${userData.fullName}\nEmail: ${userData.email}`);

  };
  const handleCancel = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setNotificationPref("");
    setBio("");
    setErrors({});
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-6'>User Settings</h1>
        <p className='text-gray-600'>Manage your profile and notification preferences</p>
      </div>

      {Object.keys(errors).length>0 && (
        <div className='mb-6 bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='flex items-start'>
            <span className='text-red-600 text-xl mr-3'>⚠️</span>
            <div>
              <h3 className='text-red-800 font-semibold mb-2'>
                Please fix the following errors:
              </h3>
              <ul className='list-disc list-inside text-red-700 text-sm space-y-1'>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="fullName"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) {
                setErrors({ ...errors, fullName: null });
              }
            }}
            required
            error={errors.fullName}
            helperText="Enter your full name"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors({ ...errors, email: null });
              }
            }}
            required
            error={errors.email}
            helperText="Your primary email address"
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="1234567890"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) {
                setErrors({ ...errors, phone: null });
              }
            }}
            error={errors.phone}
            helperText="Optional: 10 digit phone number without spaces or dashes"
          />
          <Select
            label="Notification Preference"
            name="notificationPref"
            placeholder="Select your preference"
            value={notificationPref}
            onChange={(e) => {
              setNotificationPref(e.target.value);
              if (errors.notificationPref) {
                setErrors({ ...errors, notificationPref: null });
              }
            }}
            options={notificationOptions}
            required
            error={errors.notificationPref}
            helperText="How would you like to receive notifications?"
          />
          <Textarea
            label="Bio"
            name="bio"
            placeholder="Tell us about yourself..."
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              if (errors.bio) {
                setErrors({ ...errors, bio: null });
              }
            }}
            rows={4}
            error={errors.bio}
            helperText="Optional: A short bio about yourself (max 200 characters)"
          />
           <div className="flex space-x-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Save Settings
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          
        </form>
      </div>
       <div className="mt-6 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          Current Form Values (State):
        </h3>
        <div className="space-y-1 text-sm">
          <p><strong>Full Name:</strong> {fullName || "(empty)"}</p>
          <p><strong>Email:</strong> {email || "(empty)"}</p>
          <p><strong>Phone:</strong> {phone || "(empty)"}</p>
          <p><strong>Notification Pref:</strong> {notificationPref || "(empty)"}</p>
          <p><strong>Bio:</strong> {bio || "(empty)"} {bio && `(${bio.length} chars)`}</p>
        </div>
      </div>
     
    </div>
  );
}

export default Settings;