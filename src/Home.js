import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Home.css';
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='job-tracker'>
    <div className="container">
      <header className="header">
        <div className="logo">SwiftHire</div>
        <div>
          <button className='btn-secondary' onClick={() => navigate("/login")}>📊 Login</button>
        </div>
      </header>
      
      <section className="hero">
        <div className="hero-content">
          <h1>Smart job tracking, organized success</h1>
          <p>Take control of your job search with intelligent tracking, automated reminders, and insightful analytics to land your dream role.</p>
        </div>

        <div className="dashboard-mockup">
          <div className="floating-elements">
            <div className="glass-card stats-card">
              <div className="card-title">Total Applications</div>
              <div className="card-content">47</div>
              <div className="card-subtitle">+12 this week</div>
            </div>

            <div className="glass-card progress-card">
              <div className="card-title">Application Progress</div>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <div className="card-subtitle">68% completion rate</div>
              <div className="status-badge status-offer">3 Offers</div>
              <div className="status-badge status-interview">8 Interviews</div>
            </div>

            <div className="glass-card notification-card">
              <div className="card-title">📅 Upcoming</div>
              <div className="card-content">Interview Tomorrow</div>
              <div className="card-subtitle">Google - Software Engineer</div>
              <div className="status-badge status-interview">2:00 PM</div>
            </div>

            <div className="glass-card recent-card">
              <div className="card-title">🎯 Recent Activity</div>
              <div className="card-content">Applied</div>
              <div className="card-subtitle">Meta - Product Manager</div>
              <div className="status-badge status-applied">2 hours ago</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">🚀</span>
          <h3>Smart Application Tracking</h3>
          <p>Stay organized with a centralized view of all your job applications. Easily track statuses, interview stages, and follow-ups from one intuitive dashboard.</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">📊</span>
          <h3>Job Hunt Analytics</h3>
          <p>Gain valuable insights into your job search. Analyze response rates, interview outcomes, and application trends to improve your strategy over time.</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">🎯</span>
          <h3>Goal Management</h3>
          <p>Set personal application goals and monitor your progress with visual trackers. Stay motivated and consistent throughout your job search journey.</p>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Home;
