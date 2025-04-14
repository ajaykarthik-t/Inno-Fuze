"use client";

import { useState } from "react";

const ProjectRegistrationForm = () => {
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
    referrerPhone: "9600309140",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formParams = new FormData();
      formParams.append("entry.2005620554", formData.name);
      formParams.append("entry.1065046570", formData.collegeName);
      formParams.append("entry.1158397446", formData.department);
      formParams.append("entry.1166974658", formData.phoneNumber);
      formParams.append("entry.1644994827", formData.domain);
      formParams.append("entry.1307986203", formData.programmingLanguage);
      formParams.append("entry.576275178", formData.priceBundle);
      formParams.append("entry.839337160", formData.projectTitle);
      formParams.append("entry.50540533", formData.referredBy);
      formParams.append("entry.1246606210", formData.referralCode);
      formParams.append("entry.973899661", formData.referrerPhone);

      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfW5S3Jqfr7exRzEsG-l5abq3RSEH-zq8r_c5ujjx9mdLyRFg/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formParams,
        }
      );

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#040720] text-white">
      <div className="w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to take <span className="text-purple-400">your digital presence</span> to the next level?
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          Reach out to me today and let's discuss how I can help you achieve your goals.
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 pb-20">
        <form
          onSubmit={handleSubmit}
          className="bg-[#060A27] border border-[#1A1E3A] rounded-lg shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-5">
            <h2 className="text-xl font-bold">Project Registration</h2>
            <p className="text-sm text-purple-200">* Required fields</p>
          </div>

          <div className="p-5 space-y-4">
            {[
              { id: "name", label: "Name" },
              { id: "collegeName", label: "College Name" },
              { id: "department", label: "Department" },
              { id: "phoneNumber", label: "Phone Number", type: "tel" },
              { id: "domain", label: "Domain" },
              { id: "programmingLanguage", label: "Programming Language" },
              { id: "projectTitle", label: "Project Title" },
              { id: "referredBy", label: "Referred by" },
              { id: "referralCode", label: "Referral Code" },
              { id: "referrerPhone", label: "Referrer's Phone Number", type: "tel" },
            ].map((field) => (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.id} className="block text-sm font-medium mb-1 text-gray-300">
                  {field.label} {(field.id !== "projectTitle" && field.id !== "referredBy" && field.id !== "referralCode" && field.id !== "referrerPhone") && (
                    <span className="text-purple-400">*</span>
                  )}
                </label>
                <input
                  type={field.type || "text"}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required={!["projectTitle", "referredBy", "referralCode", "referrerPhone"].includes(field.id)}
                  className="w-full p-3 bg-[#0A0F33] border border-[#1A1E3A] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            ))}

            <div className="mb-6">
              <fieldset>
                <legend className="block text-sm font-medium mb-2 text-gray-300">
                  Price for Phase 1 &amp; 2 <span className="text-purple-400">*</span>
                </legend>
                <p className="text-sm text-purple-400 mb-3">
                  Get up to ₹500 discount using referral code
                </p>

                <div className="space-y-2 bg-[#0A0F33] p-4 rounded-lg border border-[#1A1E3A]">
                  {["Bundle 1", "Bundle 2", "Bundle 3", "Bundle 4"].map((bundle, index) => (
                    <div key={index} className="flex items-start">
                      <input
                        type="radio"
                        id={bundle}
                        name="priceBundle"
                        value={bundle}
                        checked={formData.priceBundle === bundle}
                        onChange={handleChange}
                        className="mt-1 mr-2"
                        required
                      />
                      <label htmlFor={bundle} className="text-sm text-gray-300">
                        <span className="font-medium">{bundle}</span> -{" "}
                        {{
                          "Bundle 1": "Report + PPT + Project + Live Demo & Setup + Tutorial Video + Journal Paper",
                          "Bundle 2": "Report + PPT + Project + Live Demo & Setup + Tutorial Video",
                          "Bundle 3": "Report content + Project + Tutorial Video",
                          "Bundle 4": "Project + Tutorial Video",
                        }[bundle]}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
                aria-label="Submit form"
              >
                <span>Let's get in touch</span>
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
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
