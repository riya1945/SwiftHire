import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Bot, Star, ArrowRight, Briefcase, TrendingUp } from "lucide-react";

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm your AI Job Assistant. I'll help you discover perfect job opportunities based on your skills and interests. Let's find your dream career together! 🚀",
      timestamp: new Date(),
    },
    {
      id: 2,
      type: "bot",
      content:
        "To get started, please tell me your top 5 skills. You can add them one by one or list them all together!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [userSkills, setUserSkills] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState("collecting");
  const messagesEndRef = useRef(null);

  const sampleJobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp",
      match: "95%",
      skills: ["React", "JavaScript", "CSS"],
      salary: "$120k - $160k",
      location: "San Francisco, CA"
    },
    {
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      match: "88%",
      skills: ["Node.js", "React", "MongoDB"],
      salary: "$100k - $140k",
      location: "Remote"
    },
    {
      title: "UI/UX Designer",
      company: "DesignStudio",
      match: "82%",
      skills: ["Figma", "CSS", "User Research"],
      salary: "$90k - $120k",
      location: "New York, NY"
    },
    {
      title: "DevOps Engineer",
      company: "CloudTech",
      match: "79%",
      skills: ["AWS", "Docker", "Python"],
      salary: "$110k - $150k",
      location: "Austin, TX"
    },
  ];

  const popularSkills = [
    "JavaScript", "Python", "React", "Node.js", "AWS", "Docker",
    "Machine Learning", "Data Analysis", "Project Management", "UI/UX Design",
    "Marketing", "Sales", "Communication", "Leadership"
  ];

  const extractSkills = (text) => {
    const skillKeywords = [
      "react", "javascript", "python", "java", "css", "html", "node.js", "mongodb", "sql", "aws", "docker", "figma", "photoshop", "marketing", "sales", "communication", "leadership", "project management", "data analysis", "machine learning",
    ];
    const words = text.toLowerCase().split(/[,\s]+/);
    return words.filter((word) =>
      skillKeywords.some(
        (skill) => skill.includes(word) || word.includes(skill)
      )
    );
  };

  const addBotMessage = (content, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "bot",
          content,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (currentStep === "collecting") {
      const newSkills = extractSkills(inputValue);
      const updatedSkills = [...userSkills, ...newSkills].slice(0, 5);
      setUserSkills(updatedSkills);

      if (updatedSkills.length >= 5) {
        setCurrentStep("suggesting");
        addBotMessage(
          `Perfect! I've identified your skills: ${updatedSkills.join(
            ", "
          )}. Let me find the best job matches for you...`,
          1000
        );

        setTimeout(() => {
          addBotMessage(
            "Here are some amazing job opportunities that match your skillset:",
            2000
          );
        }, 2000);

        setTimeout(() => {
          setCurrentStep("complete");
        }, 4000);
      } else {
        const remaining = 5 - updatedSkills.length;
        addBotMessage(
          `Great! I've added: ${newSkills.join(", ")}. You have ${updatedSkills.length} skill${
            updatedSkills.length > 1 ? "s" : ""
          } so far. Please share ${remaining} more skill${
            remaining > 1 ? "s" : ""
          } to get personalized job recommendations.`
        );
      }
    } else if (currentStep === "complete") {
      addBotMessage(
        "Thanks for your interest! You can add more skills or ask me to refine the job search results."
      );
    }

    setInputValue("");
  };

  const handleSkillClick = (skill) => {
    setInputValue(inputValue ? inputValue + ", " + skill : skill);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const SkillChip = ({ skill }) => (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 mr-2 mb-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
      <Star className="w-3 h-3 mr-1.5 fill-current" />
      {skill}
    </span>
  );
  const JobCard = ({ job }) => (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-600 font-medium">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
              {job.match} match
            </span>
            <p className="text-sm font-semibold text-gray-700 mt-1">{job.salary}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SwiftHire
              </span>
            </div>
            
            <div className="flex gap-8 text-sm font-medium text-gray-600">
              <a href="/" className="hover:text-purple-600 transition-colors duration-200 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="/dashboard" className="hover:text-purple-600 transition-colors duration-200 relative group">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="/profile" className="hover:text-purple-600 transition-colors duration-200 relative group">
                Profile
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="/aiassistant" className="text-purple-600 font-bold relative">
                AI Assistant
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col h-[calc(100vh-80px)]">
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-4 duration-500`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`flex items-start gap-4 max-w-2xl ${
                    message.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-green-500 to-emerald-600"
                        : "bg-gradient-to-br from-purple-500 to-blue-600"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-6 py-4 shadow-sm ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                        : "bg-white border border-gray-100"
                    }`}
                  >
                    <p className="text-sm leading-relaxed font-medium">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {currentStep === "collecting" && messages.length === 2 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Popular Skills
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {popularSkills.slice(0, 8).map((skill, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSkillClick(skill)}
                      className="text-sm bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 text-purple-800 px-3 py-2 rounded-full font-medium transition-all duration-200 hover:shadow-md hover:scale-105"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {userSkills.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600 fill-current" />
                  Your Skills ({userSkills.length}/5)
                </h3>
                <div className="flex flex-wrap">
                  {userSkills.map((skill, idx) => (
                    <SkillChip key={idx} skill={skill} />
                  ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(userSkills.length / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            {currentStep === "complete" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    🎯 Perfect Job Matches for You
                  </h3>
                  <p className="text-gray-600">Based on your skills, here are the top opportunities</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sampleJobs.map((job, idx) => (
                    <JobCard key={idx} job={job} />
                  ))}
                </div>
              </div>
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-4 max-w-2xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200/50 px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tell me about your skills, experience, or ask me anything..."
                  rows={1}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none resize-none min-h-[56px] max-h-32 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
                  }}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-4 rounded-2xl transition-all duration-200 flex items-center justify-center flex-shrink-0 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;