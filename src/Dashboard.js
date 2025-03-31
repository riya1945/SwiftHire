import React from "react";
import './Dashboard.css'

const Dashboard = () => {
    return (
        <>
            <div>
                <nav>
                    <div className='name'>
                        <img src="" alt="" />
                        SwiftHire
                    </div>
                </nav>
            </div>

            {/* New wrapper div to align menu and job search */}
            <div className="dashboard_container">
                <div className="Menu_options">
                    <div className="header">
                        <h2>Menu</h2>
                    </div>

                    <div className="inner_menu">
                        <div className="MY_overview">
                            <div>
                                <div className="icon1">OVERVIEW</div>
                                <div className="text1"></div>
                            </div>
                        </div>
                        <div className="My_applications">
                            <div>
                                <div className="icon1">MY APPLICATIONS</div>
                                <div className="text1"></div>
                            </div>
                        </div>
                        <div className="Interviews">
                            <div>
                                <div className="icon1">INTERVIEWS</div>
                                <div className="text1"></div>
                            </div>
                        </div>
                        <div className="Settings">
                            <div>
                                <div className="icon1">SETTINGS</div>
                                <div className="text1"></div>
                            </div>
                        </div>
                        <div className="Application_Status">
                            <div>
                                <div className="text1">APPLICATION STATUS</div>
                                <div className="inside_app">
                                    <div className="total">TOTAL</div>
                                    <div className="applied">APPLIED</div>
                                    <div className="interview">INTERVIEW</div>
                                    <div className="rejected">REJECTED</div>
                                    <div className="offer">OFFER</div>
                                </div>
                            </div>
                        </div>

                        <div className="Upcoming_interviews">
                            <div>
                                <div className="text1">UPCOMING INTERVIEWS</div>
                                <div className="show"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="job_search">
                    <div className="inner_job">
                    <div className="top">
                        <h2>Job Search</h2>
                        <button className="application">+Add Application</button>
                    </div>
                    <div className="middle">
                        <input type="text" id="job" class="search-input"/>
                        <button className="search">SEARCH</button>
                        <button className="filter">FILTERS</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
