import axios from "axios";

export const getStarshipData = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/wing-starships/"
    );
    return response.data;
  } catch (error) {
    throw new Error(`An error occurred while fetching data: ${error}`);
  }
}

export const getStarshipStats = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/stats"
    );
    return response.data;
  } catch (error) {
    throw new Error(`An error occurred while fetching data: ${error}`);
  }
}
