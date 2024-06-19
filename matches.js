import cors from 'cors';
import axios from 'axios';


async function getMatches(id) {
    const apiUrl = `http://127.0.0.1:9000/api/find/`;
      try {
        const response = await axios.get(apiUrl+id);
        const matches = response.data.result;
  
        // console.log('API Response:', matches);
        return matches;
      } catch (error) {
        console.error('API Error:', error.message);
        throw error; // Re-throw the error to handle it elsewhere if needed
      }
}

export default getMatches;