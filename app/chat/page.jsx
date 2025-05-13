"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaLinkedin, FaEnvelope, FaSearch, FaCopy, FaCheckCircle } from "react-icons/fa";

const JobAssistantBot = () => {
    // User information
    const userInfo = {
        name: "Ajay Karthik",
        email: "ajaykarthik.eng@gmail.com",
        phone: "+91-9600309140",
        linkedin: "https://www.linkedin.com/in/ajaykarthik-t",
        github: "https://github.com/ajaykarthik-t",
        portfolio: "https://innoprojects.tech"
    };

    // IMPORTANT: Store your API key securely in environment variables
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBoMGlEh_6pXMdjRv5FRDGRono036x3ZQQ";

    // Bot states
    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm your Job Application Assistant powered by Gemini AI. Please paste the full job description (including company name).",
            isBot: true
        }
    ]);

    const [inputText, setInputText] = useState("");
    const [botState, setBotState] = useState("awaiting_job_description");
    const [jobData, setJobData] = useState({
        description: "",
        hrName: "",
        hrEmail: ""
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [copyState, setCopyState] = useState({});
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        if (inputText.trim() === "") return;

        // Add user message
        const userMessage = inputText.trim();
        setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
        setInputText("");

        // Process based on current state
        processUserInput(userMessage);
    };

    const processUserInput = (userInput) => {
        setIsGenerating(true);

        setTimeout(() => {
            switch (botState) {
                case "awaiting_job_description":
                    setJobData(prev => ({ ...prev, description: userInput }));
                    setMessages(prev => [...prev, {
                        text: "Thanks for the job description! What's the HR contact name?",
                        isBot: true
                    }]);
                    setBotState("awaiting_hr_name");
                    break;

                case "awaiting_hr_name":
                    setJobData(prev => ({ ...prev, hrName: userInput }));
                    setMessages(prev => [...prev, {
                        text: "Great! Finally, what's the HR's email address?",
                        isBot: true
                    }]);
                    setBotState("awaiting_hr_email");
                    break;

                case "awaiting_hr_email":
                    const updatedJobData = { ...jobData, hrEmail: userInput };
                    setJobData(updatedJobData);
                    // Generate responses using Gemini API
                    generateResponsesWithGemini(updatedJobData);
                    setBotState("completed");
                    break;

                case "completed":
                    // Start over
                    if (userInput.toLowerCase().includes("new") ||
                        userInput.toLowerCase().includes("another") ||
                        userInput.toLowerCase().includes("start") ||
                        userInput.toLowerCase().includes("different")) {

                        setMessages(prev => [...prev, {
                            text: "Let's start a new application! Please paste the full job description.",
                            isBot: true
                        }]);
                        setJobData({
                            description: "",
                            hrName: "",
                            hrEmail: ""
                        });
                        setBotState("awaiting_job_description");
                        setCopyState({});  // Reset copy states
                    } else {
                        setMessages(prev => [...prev, {
                            text: "Is there anything else you'd like me to help with? Or would you like to start a new application?",
                            isBot: true
                        }]);
                    }
                    break;

                default:
                    setMessages(prev => [...prev, {
                        text: "I'm not sure what to do next. Would you like to start a new application?",
                        isBot: true
                    }]);
            }
            setIsGenerating(false);
        }, 1000);
    };

    const generateResponsesWithGemini = async (data) => {
        setIsGenerating(true);
        setMessages(prev => [...prev, {
            text: "Generating application materials with Gemini AI...",
            isBot: true
        }]);

        try {
            // Contact info block formatted for clean display
            const contactInfoBlock = `Ajay Karthik
📧 ${userInfo.email}
📞 ${userInfo.phone}
🔗 LinkedIn: ${userInfo.linkedin}
💻 GitHub: ${userInfo.github}
🌐 Portfolio: ${userInfo.portfolio}`;

            // Prepare the prompt for Gemini with improved formatting instructions
            const prompt = `
You are a Job Application Assistant for Ajay Karthik with these details:
- Name: ${userInfo.name}
- Email: ${userInfo.email}
- Phone: ${userInfo.phone}
- LinkedIn: ${userInfo.linkedin}
- GitHub: ${userInfo.github}
- Portfolio: ${userInfo.portfolio}

Based on the following information:
- Job Description: ${data.description}
- HR Name: ${data.hrName}
- HR Email: ${data.hrEmail}

Generate three distinct application materials with precise formatting as described below:

1. A LinkedIn Connection Request (maximum 200 characters) to ${data.hrName}. This must be under 200 characters.

2. A Wellfound "Why are you interested in this job?" answer. Make this sincere and personalized, with clear paragraph breaks. At the end, add TWO line breaks and then include the following contact information block exactly as formatted:

${contactInfoBlock}

3. A professional email to ${data.hrName} applying for the role. Format it exactly like this:
Subject: Application for [Position] at [Company Name] - Ajay Karthik

Dear ${data.hrName},

[First paragraph about interest in the role]

[Second paragraph about relevant qualifications]

[Third paragraph with closing statement and call to action]

Best regards,
Ajay Karthik
📧 ${userInfo.email}
📞 ${userInfo.phone}
🔗 LinkedIn: ${userInfo.linkedin}
💻 GitHub: ${userInfo.github}
🌐 Portfolio: ${userInfo.portfolio}

Format your response exactly like this, with the triple dashes as separators:
---LinkedIn---
[connection request text here]
---Wellfound---
[answer text here]
---Email---
[full email text here]
`;

            // Call Gemini API
            const response = await fetchGeminiResponse(prompt);

            // Parse the response with more robust regex
            const linkedinMatch = response.match(/---LinkedIn---([\s\S]*?)---Wellfound---/);
            const wellfoundMatch = response.match(/---Wellfound---([\s\S]*?)---Email---/);
            const emailMatch = response.match(/---Email---([\s\S]*)/);

            const linkedinMessage = linkedinMatch && linkedinMatch[1] ? linkedinMatch[1].trim() : "Could not generate LinkedIn message.";
            const wellfoundAnswer = wellfoundMatch && wellfoundMatch[1] ? wellfoundMatch[1].trim() : "Could not generate Wellfound answer.";
            const emailContent = emailMatch && emailMatch[1] ? emailMatch[1].trim() : "Could not generate email content.";

            // Send all outputs as separate messages
            setMessages(prev => [
                ...prev,
                {
                    text: "1️⃣ LinkedIn Connection Request (200 chars max):",
                    displayText: linkedinMessage,
                    isBot: true,
                    type: "linkedin",
                    id: "linkedin-" + Date.now()
                },
                {
                    text: "2️⃣ Wellfound \"Why are you interested?\" Answer:",
                    displayText: wellfoundAnswer,
                    isBot: true,
                    type: "wellfound",
                    id: "wellfound-" + Date.now()
                },
                {
                    text: "3️⃣ Email to HR:",
                    displayText: emailContent,
                    isBot: true,
                    type: "email",
                    id: "email-" + Date.now()
                },
                {
                    text: "Would you like to start another application?",
                    isBot: true
                }
            ]);
        } catch (error) {
            console.error("Error generating responses:", error);
            setMessages(prev => [
                ...prev,
                {
                    text: "I encountered an error while generating your responses. Please check your API key or try again later.",
                    isBot: true
                }
            ]);
        } finally {
            setIsGenerating(false);
        }
    };

    const fetchGeminiResponse = async (prompt) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048, // Ensure we get full responses
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            throw new Error("Unexpected API response format");
        }
        return data.candidates[0].content.parts[0].text;
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleCopy = (id, content) => {
        navigator.clipboard.writeText(content);
        setCopyState(prev => ({ ...prev, [id]: true }));

        // Reset copy confirmation after 2 seconds
        setTimeout(() => {
            setCopyState(prev => ({ ...prev, [id]: false }));
        }, 2000);
    };

    const renderMessage = (message, index) => {
        // Regular message
        if (!message.type) {
            return (
                <div
                    key={index}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-fadeIn mb-4`}
                >
                    <div className={`flex max-w-[80%]`}>
                        {message.isBot && (
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2 mt-1">
                                <FaRobot className="text-sm" />
                            </div>
                        )}
                        <div
                            className={`rounded-2xl px-4 py-3 shadow-md ${message.isBot
                                    ? "bg-gray-700 text-white rounded-tl-none"
                                    : "bg-blue-600 text-white rounded-tr-none"
                                }`}
                        >
                            {message.text}
                        </div>
                        {!message.isBot && (
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ml-2 mt-1">
                                <FaUser className="text-sm" />
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // Special message types with custom styling
        let icon = <FaRobot />;
        let bgColor = "bg-gray-700";
        let borderColor = "border-gray-600";
        let cardStyle = "";

        if (message.type === "linkedin") {
            icon = <FaLinkedin />;
            bgColor = "bg-blue-900";
            borderColor = "border-blue-700";
        } else if (message.type === "email") {
            icon = <FaEnvelope />;
            bgColor = "bg-purple-900";
            borderColor = "border-purple-700";
            cardStyle = "font-mono text-sm"; // Monospace for email formatting
        } else if (message.type === "wellfound") {
            icon = <FaSearch />;
            bgColor = "bg-green-900";
            borderColor = "border-green-700";
        }

        // Format special message display with proper copy/paste handling
        return (
            <div key={index} className="my-6 animate-fadeIn">
                <div className={`rounded-xl p-4 shadow-lg border ${borderColor} ${bgColor} text-white`}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                            {icon}
                            <span className="ml-2 font-medium">{message.text}</span>
                        </div>
                        <button
                            onClick={() => handleCopy(message.id, message.displayText)}
                            className={`text-xs px-3 py-1.5 rounded flex items-center transition-colors ${copyState[message.id]
                                    ? "bg-green-600 text-white"
                                    : "bg-white/10 hover:bg-white/20 text-white"
                                }`}
                        >
                            {copyState[message.id] ? (
                                <>
                                    <FaCheckCircle className="mr-1" /> Copied!
                                </>
                            ) : (
                                <>
                                    <FaCopy className="mr-1" /> Copy
                                </>
                            )}
                        </button>
                    </div>

                    <div className={`mt-3 whitespace-pre-wrap overflow-auto max-h-96 bg-black/20 p-4 rounded-lg ${cardStyle}`}>
                        {message.displayText}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                {/* Chat header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center">
                            <FaRobot className="mr-2" /> Job Application Assistant
                        </h2>
                        <p className="text-blue-100 text-sm mt-1">Powered by Gemini AI</p>
                    </div>
                    <div className="bg-indigo-500/30 px-3 py-1 rounded-full text-xs font-medium">
                        Active
                    </div>
                </div>

                {/* Messages area */}
                <div className="h-[500px] overflow-y-auto p-6 space-y-3 bg-gray-900/50">
                    {messages.map((message, index) => renderMessage(message, index))}

                    {isGenerating && (
                        <div className="flex justify-start animate-fadeIn">
                            <div className="flex max-w-[80%]">
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2 mt-1">
                                    <FaRobot className="text-sm" />
                                </div>
                                <div className="bg-gray-700 text-white rounded-2xl rounded-tl-none px-4 py-4 shadow-md">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="border-t border-gray-700 p-4 bg-gray-800">
                    <div className="flex items-center bg-gray-700 rounded-lg px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={
                                botState === "awaiting_job_description" ? "Paste full job description here..." :
                                    botState === "awaiting_hr_name" ? "Enter HR name..." :
                                        botState === "awaiting_hr_email" ? "Enter HR email..." :
                                            "Type your message..."
                            }
                            className="flex-1 bg-transparent border-none py-3 px-2 focus:outline-none text-white placeholder-gray-400"
                            disabled={isGenerating}
                        />
                        <button
                            onClick={handleSendMessage}
                            className={`p-3 rounded-full focus:outline-none ${isGenerating || !inputText.trim()
                                    ? "text-gray-500 cursor-not-allowed"
                                    : "text-blue-400 hover:text-white hover:bg-blue-600"
                                }`}
                            disabled={isGenerating || !inputText.trim()}
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                    <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                        <p>
                            {botState === "awaiting_job_description" ? "Step 1: Paste job description" :
                                botState === "awaiting_hr_name" ? "Step 2: Enter HR name" :
                                    botState === "awaiting_hr_email" ? "Step 3: Enter HR email" :
                                        "Powered by Gemini AI"}
                        </p>
                        <p>
                            {inputText.length > 0 ? `${inputText.length} characters` : ""}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobAssistantBot;