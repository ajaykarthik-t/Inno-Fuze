"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";

// Define a type for our domain keys
type ProjectDomain = 
  | "Artificial Intelligence"
  | "Machine Learning"
  | "Web Development"
  | "Blockchain"
  | "IoT (Internet of Things)"
  | "Cybersecurity";

// Project data organized by domains
const projectData: Record<ProjectDomain, string[]> = {
  "Artificial Intelligence": [
    "Emotion Recognition System Using Facial Expressions",
    "AI-Powered Personalized Learning Platform",
    "Automated Medical Diagnosis Assistant",
    "Conversational AI for Mental Health Support",
    "Smart Traffic Management System Using Computer Vision"
  ],
  "Machine Learning": [
    "Predictive Maintenance System for Industrial Equipment",
    "ML-Based Crop Disease Detection",
    "Customer Churn Prediction Model for SaaS Businesses",
    "Stock Market Prediction Using LSTM Networks",
    "Fraud Detection System for Financial Transactions"
  ],
  "Web Development": [
    "Decentralized E-commerce Platform",
    "Real-time Collaborative Code Editor",
    "Healthcare Management System with EMR Integration",
    "Virtual Classroom Platform with Interactive Features",
    "Social Media Analytics Dashboard"
  ],
  "Blockchain": [
    "Blockchain-Based Supply Chain Traceability System",
    "Decentralized Identity Verification Platform",
    "Smart Contract-Based Voting System",
    "Cryptocurrency Portfolio Management Tool",
    "NFT Marketplace for Digital Art"
  ],
  "IoT (Internet of Things)": [
    "Smart Home Automation System",
    "IoT-Based Agricultural Monitoring Solution",
    "Wearable Health Monitoring Device",
    "Smart Waste Management System",
    "Indoor Air Quality Monitoring Network"
  ],
  "Cybersecurity": [
    "Network Intrusion Detection System",
    "Automated Vulnerability Scanner",
    "Phishing Email Detection Using NLP",
    "Secure File Sharing System with End-to-End Encryption",
    "Malware Classification Using Deep Learning"
  ]
};

const ProjectsPage = () => {
  // Fix the type of activeTab
  const [activeTab, setActiveTab] = useState<ProjectDomain>("Artificial Intelligence");
  
  // Function to open WhatsApp with general inquiry
  const openWhatsApp = () => {
    window.open("https://wa.me/919600309140", "_blank");
  };
  
  // Function to open WhatsApp with pre-filled project inquiry
  const inquireAboutProject = (projectTitle: string) => {
    const message = encodeURIComponent(`Hello, I'm interested in the project: "${projectTitle}". Could you provide more information?`);
    window.open(`https://wa.me/919600309140?text=${message}`, "_blank");
  };
  
  return (
    <div className="min-h-screen w-full overflow-hidden relative pb-20 pt-24">
      {/* Spotlights - same as Hero */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="green"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Grid background - same as Hero */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.03]
         absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container */}
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
           bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      {/* WhatsApp floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={openWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
          aria-label="Contact on WhatsApp"
        >
          <FaWhatsapp className="text-2xl" />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="uppercase tracking-widest text-xl text-blue-100">
            Final Year Projects
          </p>
          <TextGenerateEffect
            words="Project Ideas"
            className="text-center text-[32px] sm:text-[36px] md:text-5xl lg:text-6xl"
          />
          <p className="mt-4 text-white/80">
            Click on any project to inquire via WhatsApp
          </p>
        </div>

        {/* Simple tab navigation */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {(Object.keys(projectData) as ProjectDomain[]).map((domain) => (
            <button
              key={domain}
              onClick={() => setActiveTab(domain)}
              className={cn(
                "px-4 py-2 rounded-md text-sm transition-all",
                activeTab === domain 
                  ? "bg-purple-700 text-white" 
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              )}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Simple project list */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-black/30 backdrop-blur-sm rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">
            {activeTab}
          </h2>
          
          <ul className="space-y-3">
            {projectData[activeTab].map((project, index) => (
              <li 
                key={index}
                onClick={() => inquireAboutProject(project)}
                className="py-3 px-4 bg-white/5 hover:bg-green-900/30 hover:border-green-500/30 border border-transparent rounded-lg transition-all cursor-pointer group flex justify-between items-center"
              >
                <span className="text-white text-lg group-hover:text-green-200 transition-colors">
                  {project}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400 flex items-center gap-1 text-sm">
                  <FaWhatsapp /> Inquire
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* WhatsApp inquiry button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={openWhatsApp}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <FaWhatsapp className="text-xl" />
            General Inquiry via WhatsApp
          </button>
        </div>

        {/* Simple footer */}
        <div className="mt-6 text-center text-white/60 text-sm">
          <p>Contact us for customized final year project guidance</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;