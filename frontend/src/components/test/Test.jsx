/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const StepOne = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentEmail: '',
    phoneNo: '',
    registrationNo: '',
    courseEnrolled: '',
    nameOfInstitution: '',
    facultySchool: '',
    department: '',
    yearEnrolled: '',
    graduationYear: '',
    consentToContact: false,
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const response = await axios.post('/api/step-one/', formData);
    //   console.log('Form submitted successfully', response.data);
      // Handle successful submission (e.g., move to next step)
    } catch (error) {
      console.error('Error submitting form', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">1. Step one</h2>
      <h3 className="text-xl mb-6">Complete your Information</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Full Names', name: 'fullName', type: 'text', placeholder: 'Enter your full names as they appear in students ID' },
          { label: 'Student Email', name: 'studentEmail', type: 'email', placeholder: "Enter your student's email" },
          { label: 'Phone No.', name: 'phoneNo', type: 'tel', placeholder: 'Enter your active phone number' },
          { label: 'Registration No.', name: 'registrationNo', type: 'text', placeholder: 'Enter your registration number in Caps' },
          { label: 'Course Enrolled', name: 'courseEnrolled', type: 'text', placeholder: 'Enter your course name' },
          { label: 'Name of Institution', name: 'nameOfInstitution', type: 'text', placeholder: 'Enter name of your institution' },
          { label: 'Faculty/School', name: 'facultySchool', type: 'text', placeholder: "Enter name of your faculty/school, don't use abbreviations" },
          { label: 'Department', name: 'department', type: 'text', placeholder: 'Enter name of your department' },
          { label: 'Year Enrolled', name: 'yearEnrolled', type: 'text', placeholder: 'Enter date of enrollment' },
          { label: 'Graduation Year', name: 'graduationYear', type: 'text', placeholder: 'Expected graduation year' },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        ))}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="consentToContact"
            name="consentToContact"
            checked={formData.consentToContact}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="consentToContact" className="ml-2 block text-sm text-gray-900">
            I consent to you contacting me about wHTAs products and services.
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
            I have read the Privacy Policy, and I agree to the Terms of services.
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Agree and Continue
        </button>
      </form>
    </div>
  );
};

export default StepOne;