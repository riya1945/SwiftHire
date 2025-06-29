const BACKEND_BASE_URL = "https://swifthire-backend.onrender.com"; 

export const fetchJobs = async (query) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/external-jobs?query=${query}`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const result = await response.json();

    return result.data || []; // ✅ only return the array
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
