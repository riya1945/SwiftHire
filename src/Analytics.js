import React from "react";
import './Analytics.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Analytics = () => {
    return (
        <>
            <nav>
                    <div className="name">
                        <img src="" alt="" />
                        SwiftHire
                    </div>
                    <div className="nav_1">
                    <Link to="/">Home</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/analytics">Analytics</Link>
                    </div>
                    
                </nav>
                <div className="entire-container">
                <div className="top">
                    <div className="header">
                        <h2>Job Application Analytics</h2>
                    </div>
                    <div className="btn-cont">
                     
                        <div className="dropdown">
                            <button className="dropbtn">📅 Monthly ▼</button>
                            <div className="dropdown-content">
                                <a href="#">Daily</a>
                                <a href="#">Weekly</a>
                                <a href="#">Monthly</a>
                                <a href="#">Yearly</a>
                            </div>
                        </div>

                        <div className="dropdown"> 
                            <button className="dropbtn">Filter ▼</button>
                            <div className="dropdown-content">
                                <a href="#">All</a>
                                <a href="#">Accepted</a>
                                <a href="#">Rejected</a>
                                <a href="#">Pending</a>
                            </div>
                        </div>
                    </div>

                    
                    <div className="num-output">
                        <div className="output">
                            <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M14.9805 7.01556C14.9805 7.01556 15.4805 7.51556 15.9805 8.51556C15.9805 8.51556 17.5687 6.01556 18.9805 5.51556" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.99491 2.02134C7.49644 1.91556 5.56618 2.20338 5.56618 2.20338C4.34733 2.29053 2.01152 2.97385 2.01154 6.96454C2.01156 10.9213 1.9857 15.7993 2.01154 17.7439C2.01154 18.932 2.74716 21.7033 5.29332 21.8518C8.38816 22.0324 13.9628 22.0708 16.5205 21.8518C17.2052 21.8132 19.4847 21.2757 19.7732 18.7956C20.0721 16.2263 20.0126 14.4407 20.0126 14.0157" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M21.9999 7.01556C21.9999 9.77698 19.7592 12.0156 16.9951 12.0156C14.231 12.0156 11.9903 9.77698 11.9903 7.01556C11.9903 4.25414 14.231 2.01556 16.9951 2.01556C19.7592 2.01556 21.9999 4.25414 21.9999 7.01556Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M6.98053 13.0156H10.9805" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M6.98053 17.0156H14.9805" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
</svg></div>
                            <div className="text">Total Applications
                            <p className="answer">42</p>
                            </div>
                        </div>
                        <div className="output">
                        <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M22 11.5V6.11397C22 5.32299 22 4.92751 21.8059 4.51966C21.6952 4.28705 21.443 3.97064 21.241 3.81079C20.8868 3.53051 20.5912 3.46281 20 3.3274C19.0803 3.11675 18.0659 3 17 3C15.0829 3 13.3325 3.37764 12 4C10.6675 4.62236 8.91707 5 7 5C5.93408 5 4.91969 4.88325 4 4.6726C3.04003 4.45273 2 5.12914 2 6.11397V16.886C2 17.677 2 18.0725 2.19412 18.4803C2.30483 18.7129 2.55696 19.0294 2.75898 19.1892C3.11319 19.4695 3.4088 19.5372 4 19.6726C4.91969 19.8833 5.93408 20 7 20C8.46884 20 9.83983 19.7783 11 19.3947" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M14 19C14 19 15 19 16 21C16 21 19.1765 16 22 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M14.5 11.5C14.5 12.8807 13.3807 14 12 14C10.6193 14 9.5 12.8807 9.5 11.5C9.5 10.1193 10.6193 9 12 9C13.3807 9 14.5 10.1193 14.5 11.5Z" stroke="currentColor" stroke-width="1.5" />
    <path d="M5.5 12.5L5.5 12.509" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.5 10.4922L18.5 10.5012" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg></div>
                        <div className="text">Interview Success Rate
                        <p className="answer">42%</p>
                        </div>

                        </div>

                        <div className="output">
                        <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
    <path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg></div>
                        <div className="text">Average Response Time
                            <p className="answer">5.2 Days</p>
                        </div>

                        </div>
                        <div className="output">
                        <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7 14L9.79289 11.2071C10.1834 10.8166 10.8166 10.8166 11.2071 11.2071L12.7929 12.7929C13.1834 13.1834 13.8166 13.1834 14.2071 12.7929L17 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg></div>
                        <div className="text">Active Interviews
                        <p className="answer">8</p>
                        </div>

                        </div>
                   
                    <div className="graph">
                        <div className="h">Application Trends</div>

                    </div>
                    <div className="graph">
                        <div className="h">Application Status</div>

                    </div>
                    <div className="recent-app">
                        <div className="r">Recent Applications</div>
                    </div>
                    </div>
                </div> 
            </div>
        </>
    );
};

export default Analytics;
