import axios from "axios";

const SWAPI_BASE_URL = "https://swapi.dev/api";

export const searchStarships = async (
  search: string = ""
): Promise<any> => {
  const url = search ? `${SWAPI_BASE_URL}/starships/?search=${search}` : `${SWAPI_BASE_URL}/starships/?format=json`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Unable to get starships: ${error.message}`);
  }
};
