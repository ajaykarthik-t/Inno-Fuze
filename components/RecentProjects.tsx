"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import MagicButton from "./MagicButton";

// Define a type for the form data
interface FormData {
  name: string;
  collegeName: string;
  department: string;
  phoneNumber: string;
  domain: string;
  programmingLanguage: string;
  priceBundle: string;
  projectTitle: string;
  referredBy: string;
  referralCode: string;
  referrerPhone: string;
}

// Define a type for the field objects in the array
interface FieldConfig {
  id: keyof FormData;
  label: string;
  type?: string;
}

interface ProjectRegistrationFormProps {
  id?: string;
}

const ProjectRegistrationForm: React.FC<ProjectRegistrationFormProps> = ({ id }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    collegeName: "",
    department: "",
    phoneNumber: "",
    domain: "Machine Learning",
    programmingLanguage: "Python",
    priceBundle: "Bundle 1",
    projectTitle: "",
    referredBy: "Ajay", // Pre-filled with Ajay
    referralCode: "AJ500", // Pre-filled with AJ500
    referrerPhone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  // Define the fields array with proper typing
  const fields: FieldConfig[] = [
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
  ];

  return (
    <div id={id} className="min-h-screen bg-[#040720] text-white">
      <div className="w-full py-16 px-4 text-center bg-gradient-to-b from-[#060a30] to-[#040720]">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-purple-400">Transform Your Ideas</span> Into Standout Projects
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          Share your project requirements with us and take the first step toward creating an innovative, industry-recognized final year project that showcases your skills
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
            {fields.map((field) => (
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
                  placeholder={field.label}
                  readOnly={field.id === "referredBy" || field.id === "referralCode"} // Make referral fields read-only
                />
                {(field.id === "referredBy" || field.id === "referralCode") && (
                  <p className="text-xs text-purple-400 mt-1">Pre-filled referral information</p>
                )}
              </div>
            ))}

            <div className="mb-6">
              <fieldset>
                <legend className="block text-sm font-medium mb-2 text-gray-300">
                  Project Packages <span className="text-purple-400">*</span>
                </legend>
                <p className="text-sm text-purple-400 mb-3">
                  Choose the package that fits your needs
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
              <MagicButton
                title="Start Your Final Year Project"
                icon={<FaGraduationCap className="text-lg" />}
                position="right"
                type="submit"
              />

              <p className="text-xs text-gray-400 text-center mt-4">
                You can modify your project details anytime
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectRegistrationForm;