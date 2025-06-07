import axios from 'axios';

const JSEARCH_API_KEY = process.env.REACT_APP_JSEARCH_API_KEY;
const JSEARCH_HOST = process.env.REACT_APP_JSEARCH_HOST;
export const fetchJobs = async (query) => {
  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: { query },
      headers: {
        'X-RapidAPI-Key': JSEARCH_API_KEY,
        'X-RapidAPI-Host': JSEARCH_HOST,
      },
    });
    return response.data.data || [];
  } catch (error) {
    return [];
  }
};
