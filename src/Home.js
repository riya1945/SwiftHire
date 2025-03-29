import React from 'react'
import { useNavigate } from "react-router-dom";
import './Home.css'
const Home=() =>{
  const navigate = useNavigate();

  return (
    <div>
      <nav>
        <div className='name'>
          <img src="" alt="" />
          SwiftHire
        </div>
        <div>
          {/* <div>
          <ul className="nav-links">
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li></ul>
          </div> */}
          <button className='login-btn' onClick={() => navigate("/login")}>Log in</button>
          <button className='signup'>Signup</button>
        </div>
      </nav>
      <div className='container'>
        <div className='left'>
          <div className="insideleft">
          
          <h1>Track Your Applications 
            <br />Like a Pro with 
            <br />Job Tracker</h1>
          <p className='para'>Are you still tracking jobs in Excel or Google Sheets? 
            Track and manage your job listings, applications, 
            and interviews all in one place. It's easy. It's efficient.</p>
          <button className='getstarted'>Check it out?</button>
          </div>
        </div>
        <div>
          <div className='image'>
            <img src="https://static.jobscan.co/blog/uploads/bigger-tracker.webp" alt="hh"  height="680px" width="600px" />
          </div>
        </div>
      </div>

      <section>
        {/* IMAGE ON RIGHT - Image 1 */}
        <div className='content-row right-image'>
          <div className="text-content text-interview'">
            <h2>Get the ideal job</h2>
            <p>Get personalized job listings and track your applications in one place.<br/>
              Just enter a job title, keyword, or location to discover opportunities that align<br/> with your career goals.<br/>
              View job listings, tailor your resume, and keep track of your progress—all <br/>within your job tracker dashboard.</p>
          </div>
          <div className="image-content">
            <img src="https://static.jobscan.co/blog/uploads/bigger-tracker.webp" alt="Job Tracking" height="540px" width="440px" />
          </div>
        </div>

        {/* IMAGE ON LEFT - Image 2 */}
        <div className='content-row left-image text-interview'>
          <div className="image-content">
            <img src="https://static.jobscan.co/blog/uploads/bigger-tracker.webp" alt="Progress Tracking" height="540px" width="440px" />
          </div>
          <div className="text-content ">
            <h2>Monitor your progress</h2>
            <p>Monitor every job application and visualize your journey <br/>from Applied to Interviewed with an intuitive progress tracker.<br/> Easily update the status of your applications and stay organized with<br/> detailed insights into each step of the process.</p>
          </div>
        </div>

        {/* IMAGE ON RIGHT - Image 3 */}
        <div className='content-row right-image '>
          <div className="text-content '">
            <h2>Be updated of your interviews</h2>
            <p>Stay prepared for every interview with automated reminders, scheduled meetings,<br/> and recruiter interactions in a centralized view. Ensure you <br/>never miss out on a great opportunity by<br/> managing all interview details efficiently.</p>
          </div>
          <div className="image-content">
            <img src="https://static.jobscan.co/blog/uploads/bigger-tracker.webp" alt="Interview Updates" height="540px" width="440px" />
          </div>
        </div>

        
        <div className='content-row left-image  text-interview'>
          <div className="image-content ">
            <img src="https://static.jobscan.co/blog/uploads/bigger-tracker.webp" alt="Resume Optimization" height="540px" width="440px" />
          </div>
          <div className="text-content">
            <h2>Optimize your resume with ATS insights</h2>
            <p>Boost your chances of landing a job by getting your ATS resume <br/>score for every application. Instantly check how<br/> well your resume matches the job description and optimize <br/>it for maximum visibility before applying. Get real-time<br/> feedback to improve your resume and stand out to recruiters.</p>
          </div>
        </div>

        <div className="job_search">
          <div className='jobs '>
          <h2>Streamline Your Job Search Effortlessly</h2>
          <p>Stay organized and in control as you work toward landing <br/>your dream job. Track applications, manage interviews, and<br/> optimize your resume—all in one place.
          <br/>Eliminate stress and save time with an intuitive job tracker<br/> that helps you visualize your progress, get ATS resume<br/> scores, and stay on top of deadlines.</p>
          <button id="start-tracking">Start tracking</button>
        </div></div>
      </section>
    </div>
  )
}

export default Home;