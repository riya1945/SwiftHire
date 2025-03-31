import React from "react";
import './Analytics.css';

const Analytics = () => {
    return (
        <>
            
                <nav>
                    <div className="name">
                        <img src="" alt="" />
                        SwiftHire
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
                        <div className="output"></div>
                        <div className="output"></div>
                        <div className="output"></div>
                        <div className="output"></div>
                    </div>
                    <div className="bar-graph"></div>
                    <div className="pie_chart"></div>
                    <div className="recent-app"></div>
                </div> 
            </div>
        </>
    );
};

export default Analytics;
