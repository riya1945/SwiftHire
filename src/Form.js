import { useState, useEffect } from 'react';
import { supabase } from './SupabaseClient';
import './Form.css';
import { useNavigate, useLocation } from 'react-router-dom';

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resumeFile: null,
  });

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;
  const jobTitle = job?.job_title || '';
 const companyName = job?.publisher_name || '';

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setErrorMsg('You must be logged in to apply for jobs.');
      } else {
        setUserId(data.user.id);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, files,number} = e.target;
    if (name === 'resumeFile') {
      setFormData((prev) => ({ ...prev, resumeFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setFormData((prev) => ({ ...prev, resumeFile: file }));
      } else {
        setErrorMsg('Please upload a PDF file only.');
      }
    }
  };

  const uploadResume = async () => {
    const file = formData.resumeFile;
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    const { error } = await supabase.storage.from('resumes').upload(filePath, file);
    if (error) {
      throw new Error('Failed to upload resume: ' + error.message);
    }

    const { data: publicUrlData } = supabase.storage.from('resumes').getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitLoading(true);

    if (!userId) {
      setErrorMsg('User not authenticated.');
      setSubmitLoading(false);
      return;
    }

    if (!formData.resumeFile) {
      setErrorMsg('Please upload a resume file.');
      setSubmitLoading(false);
      return;
    }

    try {
      const resumeUrl = await uploadResume();

      const { error } = await supabase.from('form_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone, 
          resume_url: resumeUrl,
          user_id: userId,
          job_title: jobTitle,
          company_name: companyName,
          submitted_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        setErrorMsg(error.message);
      } else {
        setFormData({ name: '', email: '', resumeFile: null });
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">Apply for Job</h2>
        </div>

        <div className="job-details">
          <p className="job-info">
            <strong>Position:</strong> {jobTitle || 'N/A'}
          </p>
          <p className="job-info">
            <strong>Company:</strong> {companyName || 'N/A'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Upload Resume (PDF):</label>
            <div 
              className={`file-upload-area ${dragActive ? 'drag-active' : ''} ${formData.resumeFile ? 'file-selected' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                name="resumeFile"
                accept=".pdf"
                className="file-input"
                onChange={handleChange}
                required
              />
              <div className="file-upload-content">
                {formData.resumeFile ? (
                  <>
                    <span className="file-icon">✅</span>
                    <span className="file-name">{formData.resumeFile.name}</span>
                  </>
                ) : (
                  <>
                    <span className="file-icon">📄</span>
                    <span className="file-text">Choose File or Drop PDF Here</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {errorMsg}
            </div>
          )}

          <button 
            type="submit" 
            className={`submit-button ${submitLoading ? 'loading' : ''}`}
            disabled={submitLoading}
          >
            {submitLoading ? (
              <>
                <span className="button-spinner"></span>
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;