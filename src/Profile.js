import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Edit3, Camera, Download } from "lucide-react";
import "./Profile.css";
import { Link } from 'react-router-dom';

const SkillBar = ({ skill, level }) => (
    <div className="skill-bar">
        <div className="skill-header">
            <span className="skill-name">{skill}</span>
            <span className="skill-level">{level}%</span>
        </div>
        <div className="skill-track">
            <div className="skill-fill" style={{ width: `${level}%` }}></div>
        </div>
    </div>
);

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "Alex Johnson",
        title: "Senior Full Stack Developer",
        email: "alex.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        about:
            "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Always eager to learn new technologies and solve complex problems.",
        experience: [
            {
                company: "TechCorp Inc.",
                position: "Senior Full Stack Developer",
                duration: "2022 - Present",
                description:
                    "Lead development of customer-facing applications serving 100K+ users. Implemented microservices architecture reducing load times by 40%.",
            },
            {
                company: "StartupXYZ",
                position: "Full Stack Developer",
                duration: "2020 - 2022",
                description:
                    "Built and maintained e-commerce platform. Collaborated with cross-functional teams to deliver features ahead of schedule.",
            },
        ],
        education: [
            {
                school: "University of California, Berkeley",
                degree: "Bachelor of Science in Computer Science",
                year: "2016 - 2020",
                gpa: "3.8/4.0",
            },
        ],
    });

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChangeAbout = (e) => {
        setProfileData({ ...profileData, about: e.target.value });
    };

    const handleExperienceChange = (index, field, value) => {
        const updatedExp = [...profileData.experience];
        updatedExp[index] = { ...updatedExp[index], [field]: value };
        setProfileData({ ...profileData, experience: updatedExp });
    };

    const handleEduChange = (index, field, value) => {
        const updatedEdu = [...profileData.education];
        updatedEdu[index] = { ...updatedEdu[index], [field]: value };
        setProfileData({ ...profileData, education: updatedEdu });
    };

    return (
        <div className="profile-container">
            <nav className="navbar">
                <div className="navbar-content">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SwiftHire
              </span>
             <div className="flex gap-8 text-sm font-medium text-gray-600">
              <Link to="/" className="hover:text-purple-600 transition-colors duration-200 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link to="/dashboard" className="hover:text-purple-600 transition-colors duration-200 relative group">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link to="/profile" className="text-purple-600 font-bold relative group">
                Profile
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
              </Link>
              <Link to="/aiassitant" className="hover:text-purple-600 transition-colors duration-200 relative group">
                AI Assistant
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </div>
                </div>
            </nav>

            <div className="main-content">
                <div className="grid-container">
                    {/* Profile Card */}
                    <div className="profile-card">
                        <div className="profile-header"></div>
                        <div className="profile-body">
                            <div className="avatar-container">
                                <div className="avatar">
                                    <User size={48} />
                                    <button className="camera-btn">
                                        <Camera size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="text-center">
                                <h1 className="name">{profileData.name}</h1>
                                <p className="title">{profileData.title}</p>
                                <div className="contact-info">
                                    <div>
                                        <Mail size={16} /> {profileData.email}
                                    </div>
                                    <div>
                                        <Phone size={16} /> {profileData.phone}
                                    </div>
                                    <div>
                                        <MapPin size={16} /> {profileData.location}
                                    </div>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button onClick={handleEdit} className="edit-btn">
                                    <Edit3 size={16} />
                                    <span>{isEditing ? "Save" : "Edit Profile"}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="profile-info">
                        {/* About */}
                        <div className="section">
                            <h2 className="section-title">About</h2>
                            {isEditing ? (
                                <textarea
                                    className="textarea"
                                    value={profileData.about}
                                    onChange={handleChangeAbout}
                                    rows="4"
                                />
                            ) : (
                                <p className="about-text">{profileData.about}</p>
                            )}
                        </div>

                        {/* Experience */}
                        <div className="section">
                            <h2 className="section-title">Professional Experience</h2>
                            {profileData.experience.map((exp, index) => (
                                <div key={index} className="entry">
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                className="input"
                                                value={exp.position}
                                                onChange={(e) =>
                                                    handleExperienceChange(index, "position", e.target.value)
                                                }
                                                placeholder="Position"
                                            />
                                            <input
                                                type="text"
                                                className="input"
                                                value={exp.company}
                                                onChange={(e) =>
                                                    handleExperienceChange(index, "company", e.target.value)
                                                }
                                                placeholder="Company"
                                            />
                                            <input
                                                type="text"
                                                className="input"
                                                value={exp.duration}
                                                onChange={(e) =>
                                                    handleExperienceChange(index, "duration", e.target.value)
                                                }
                                                placeholder="Duration"
                                            />
                                            <textarea
                                                className="textarea"
                                                value={exp.description}
                                                onChange={(e) =>
                                                    handleExperienceChange(index, "description", e.target.value)
                                                }
                                                placeholder="Description"
                                                rows="3"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <h3>{exp.position}</h3>
                                            <p className="company">{exp.company}</p>
                                            <p className="duration">{exp.duration}</p>
                                            <p>{exp.description}</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Education */}
                        <div className="section">
                            <h2 className="section-title">Education</h2>
                            {profileData.education.map((edu, index) => (
                                <div key={index} className="entry">
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                className="input"
                                                value={edu.degree}
                                                onChange={(e) =>
                                                    handleEduChange(index, "degree", e.target.value)
                                                }
                                                placeholder="Degree"
                                            />
                                            <input
                                                type="text"
                                                className="input"
                                                value={edu.school}
                                                onChange={(e) =>
                                                    handleEduChange(index, "school", e.target.value)
                                                }
                                                placeholder="School"
                                            />
                                            <input
                                                type="text"
                                                className="input"
                                                value={edu.year}
                                                onChange={(e) =>
                                                    handleEduChange(index, "year", e.target.value)
                                                }
                                                placeholder="Year"
                                            />
                                            <input
                                                type="text"
                                                className="input"
                                                value={edu.gpa}
                                                onChange={(e) =>
                                                    handleEduChange(index, "gpa", e.target.value)
                                                }
                                                placeholder="GPA"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <h3>{edu.degree}</h3>
                                            <p className="school">{edu.school}</p>
                                            <div className="details">
                                                <span>{edu.year}</span> <span>GPA: {edu.gpa}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
