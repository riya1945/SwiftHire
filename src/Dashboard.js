import React, { useEffect, useState } from "react";
import { fetchJobs } from './JobService';
import { supabase } from "./SupabaseClient";
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, MapPin, Building2, Zap } from "lucide-react";
import './Dashboard.css';

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const fetchFormSubmissions = async (uid) => {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('user_id', uid)
      .order('submitted_at', { ascending: false });

    if (error) {
      return;
    }

    setFormSubmissions(data);
  };

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        return;
      }
      if (user) {
        setUserId(user.id);
        fetchFormSubmissions(user.id);
      }
    };

    fetchUserAndData();
  }, []);

  useEffect(() => {
    const fetchFromAPI = async () => {
      if (!query.trim()) {
        setJobs([]);
        return;
      }
      setLoading(true);
      try {
        const data = await fetchJobs(query);
        setJobs(data || []);
      } catch (error) {
        setJobs([]);
      }
      setLoading(false);
    };

    const handler = setTimeout(fetchFromAPI, 1000);
    return () => clearTimeout(handler);
  }, [query]);

  const handleApply = (job) => {
    navigate("/form", { state: { job } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SwiftHire
              </span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-gray-600">
                          <Link to="/" className="hover:text-purple-600 transition-colors duration-200 relative group">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
                          </Link>
                          <Link to="/dashboard" className="text-purple-600 font-bold relative group">
                            Dashboard
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
                          </Link>
                          <Link to="/profile" className="hover:text-purple-600 transition-colors duration-200 relative group">
                            Profile
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
                          </Link>
                          <Link to="/aiassitant" className="hover:text-purple-600 transition-colors duration-200  relative">
                            AI Assistant
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
                          </Link>
                        </div>
          </div>
        </div>
      </nav>
      <div className="welcome">
        <p>Welcome Back!</p>
        <p>Ready to find your next opportunity? Lets get started.</p>

      </div>

      <div className="dashboard_container max-w-7xl mx-auto px-6 py-8">
        {/* Job Search Section */}
        <div className="job_search">
  <div className="inner_job">
    <div className="top">
      <h2>Job Search</h2>
    </div>
    <div className="middle">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          </svg>
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search for your dream job..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}  
        />
      </div>
    </div>
  </div>


          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
              </div>
            </div>
          )}

          {!loading && jobs.length > 0 && (
            <div className="job_list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="job_card border rounded-xl p-6 flex flex-col justify-between bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{job.job_title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <Building2 className="w-4 h-4" />
                      <span>{job.employer_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.job_city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Zap className="w-4 h-4" />
                      <span>{job.job_category}</span>
                    </div>
                  </div>
                  <button
                    className="apply_button mt-4 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
                    onClick={() => handleApply(job)}
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          )}

          {!loading && query && jobs.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              No jobs found for "{query}".
            </div>
          )}
        </div>
       <div></div>
        {/* Submitted Jobs Section */}
        <div className="applications mt-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">My Submitted Jobs</h2>
          <div className="application_list bg-white rounded-3xl shadow-xl p-8">
            {formSubmissions.length === 0 ? (
              <p className="text-gray-600">No submitted jobs found.</p>
            ) : (
              formSubmissions.map((submission, index) => (
                <div key={index} className="application_item border-b border-gray-200 py-4 job_card border rounded-xl p-6 flex flex-col justify-between bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(99,102,241,0.1)] hover:border-indigo-500">
                  <div className="flex justify-between items-start ">
                    <div className="">
                      <p className="font-semibold text-gray-800 text-lg">
                        {submission.job_title || 'No job title'}
                      </p>
                      <p className="text-gray-500">
                        {submission.company_name || 'No company name'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Applied on: {new Date(submission.submitted_at).toLocaleDateString()}
                      </p>
                    </div>
                  
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
