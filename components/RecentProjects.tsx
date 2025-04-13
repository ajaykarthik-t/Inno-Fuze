"use client";

import { useState } from "react";

const ProjectRegistrationForm = () => {
  // State to manage form data with default values
  const [formData, setFormData] = useState({
    name: "Name",
    collegeName: "Anna University",
    department: "CSE",
    phoneNumber: "9876543210",
    domain: "Machine Learning",
    programmingLanguage: "Python",
    priceBundle: "Bundle 1",
    projectTitle: "Any Disease Predictions using AI and ML",
    referredBy: "Ajay",
    referralCode: "AJ500",
    referrerPhone: "9600309140"
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Create URLSearchParams for Google Forms
      const formParams = new URLSearchParams();
      
      // Map form fields to Google Form entry IDs
      formParams.append('entry.2005620554', formData.name);
      formParams.append('entry.1065046570', formData.collegeName);
      formParams.append('entry.1158397446', formData.department);
      formParams.append('entry.1166974658', formData.phoneNumber);
      formParams.append('entry.1644994827', formData.domain);
      formParams.append('entry.1307986203', formData.programmingLanguage);
      formParams.append('entry.576275178', formData.priceBundle);
      formParams.append('entry.839337160', formData.projectTitle);
      formParams.append('entry.50540533', formData.referredBy);
      formParams.append('entry.1246606210', formData.referralCode);
      formParams.append('entry.973899661', formData.referrerPhone);
      
      // Google Form submission URL
      const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfW5S3Jqfr7exRzEsG-l5abq3RSEH-zq8r_c5ujjx9mdLyRFg/formResponse';
      
      // Redirect to submit the form
      window.location.href = `${googleFormUrl}?${formParams.toString()}`;
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#040720] text-white">
      {/* Hero Section */}
      <div className="w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to take <span className="text-purple-400">your digital presence</span> to the next level?
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
        </p>
      </div>
      
      {/* Form Container */}
      <div className="max-w-md mx-auto px-4 pb-20">
        <form 
          onSubmit={handleSubmit} 
          className="bg-[#060A27] border border-[#1A1E3A] rounded-lg shadow-xl overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-5">
            <h2 className="text-xl font-bold">Project Registration</h2>
            <p className="text-sm text-purple-200">* Required fields</p>
          </div>
          
          {/* Form Fields */}
          <div className="p-5 space-y-4">
            {/* Personal Information */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Name <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-[#0A0F33] border border-[#1A1E3A] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                College Name <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full p-3 bg-[#0A0F33] border border-[#1A1E3A] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Department <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-3 bg-[#0A0F33] border border-[#1A1E3A] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Phone Number <span className="text-purple-400">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 bg-[#0A0F33] border border-[#1A1E3A] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Domain <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                className="w-full p-3 bg-[#0A0F33] border border-[#1A1E3A] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Programming Language <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                name="programmingLanguage"
                value={formData.programmingLanguage}
                onChange={handleChange}
                className="w-full p-3 bg-[#0A0F33] border border-[#1A1E3A] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Project Title
              </label>
              <input
                type="text"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                className="w-full p-3 bg-[#0A0F33] border border-[#1A1E3A] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            
            {/* Bundle Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Price for Phase 1 &amp; 2 <span className="text-purple-400">*</span>
              </label>
              <p className="text-sm text-purple-400 mb-3">
                Get up to ₹500 discount using referral code
              </p>
              
              <div className="space-y-2 bg-[#0A0F33] p-4 rounded-lg border border-[#1A1E3A]">
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="bundle1"
                    name="priceBundle"
                    value="Bundle 1"
                    checked={formData.priceBundle === "Bundle 1"}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="bundle1" className="text-sm text-gray-300">
                    <span className="font-medium">Bundle 1</span> - Report + PPT + Project + Live Demo &amp; Setup + Tutorial Video + Journal Paper
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="bundle2"
                    name="priceBundle"
                    value="Bundle 2"
                    checked={formData.priceBundle === "Bundle 2"}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="bundle2" className="text-sm text-gray-300">
                    <span className="font-medium">Bundle 2</span> - Report + PPT + Project + Live Demo &amp; Setup + Tutorial Video
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="bundle3"
                    name="priceBundle"
                    value="Bundle 3"
                    checked={formData.priceBundle === "Bundle 3"}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="bundle3" className="text-sm text-gray-300">
                    <span className="font-medium">Bundle 3</span> - Report content + Project + Tutorial Video
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="bundle4"
                    name="priceBundle"
                    value="Bundle 4"
                    checked={formData.priceBundle === "Bundle 4"}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="bundle4" className="text-sm text-gray-300">
                    <span className="font-medium">Bundle 4</span> - Project + Tutorial Video
                  </label>
                </div>
              </div>
            </div>
            
            {/* Referral Information */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Referred by
              </label>
              <input
                type="text"
                name="referredBy"
                value={formData.referredBy}
                onChange={handleChange}
                className="w-full p-3 bg-[#0A0F33] border border-[#1A1E3A] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Referral Code
              </label>
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                className="w-full p-3 bg-[#0A0F33] border border-[#1A1E3A] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300">
                Referrer&apos;s Phone Number
              </label>
              <input
                type="tel"
                name="referrerPhone"
                value={formData.referrerPhone}
                onChange={handleChange}
                className="w-full p-3 bg-[#0A0F33] border border-[#1A1E3A] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            
            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                <span>Let&apos;s get in touch</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                Never submit passwords through this form
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectRegistrationForm;