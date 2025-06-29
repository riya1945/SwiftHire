import React, { useState ,useEffect } from "react";
import { User, Mail, Phone, MapPin, Edit3, Camera, Download } from "lucide-react";
import "./Profile.css";
import { Link } from 'react-router-dom';
import { supabase } from "./SupabaseClient";


const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
     const [uid, setUid] = useState(null);
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [phone,setPhone]=useState("");
    const [profileData, setProfileData] = useState({
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        about:
            "",
        experience: [
            {
                company: "",
                position: "",
                duration: "",
                description:
                    "",
            },
            {
                company: "",
                position: "",
                duration: "",
                description:
                    "",
            },
        ],
        education: [
            {
                school: "",
                degree: "",
                year: "",
                gpa: "",
            },
        ],
    });
     useEffect(()=>{
      const getName=async()=>{
      const {data:{user}}= await supabase.auth.getUser();
      if(user){
 setUid(user.id);
      const {data,error}=await supabase
      .from("form_submissions")
      .select('name,email,phone')
      .eq("user_id",user.id)
      .limit(1)

      if(error){
        console.log("Error fetching your name",error.message);
      }
      else{
        setName(data[0]?.name);
        setEmail(data[0]?.email);
        setPhone(data[0]?.phone);
        
      }
      }
       
    };
    getName();
  },[]
);
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
                    <div className="profile-card">
                        <div className="profile-header"></div>
                        <div className="profile-body">
                           <div className="profile-body">
  <div className="avatar-container">
    {/* <div className="avatar">
      <User size={48} />
      <button className="camera-btn">
        <Camera size={16} />
      </button>
    </div> */}
  </div>

  <div className="flex flex-col items-center justify-center text-center mt-4">
    <h1 className="text-2xl font-bold text-gray-800 mb-1">{name}</h1>
    <p className="text-sm text-gray-500 mb-4">{profileData.title}</p>

    <div className="flex flex-col items-center gap-2 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4" />
        <span>{email}</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="w-4 h-4" />
        <span>{phone}</span>
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
                    </div>

                    <div className="profile-info">
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
                                                <span>{edu.year}</span> <span> {edu.gpa}</span>
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
