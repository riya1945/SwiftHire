const BACKEND_BASE_URL = "https://swifthire-backend.onrender.com"; 
export const fetchJobs = async (query) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/external-jobs?query=${query}`);
    console.log("Requesting:", `${BACKEND_BASE_URL}/external-jobs?query=${query}`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
