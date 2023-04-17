import axios from "axios";

class SwapiService {
  private search: string | undefined;
  private hostname = "swapi.dev";
  private baseUrl = "https://" + this.hostname;

  constructor(search?: string) {
    this.search = search;
  }

  starships = async (): Promise<any> => {
    const path = this.buildPath("/api/starships/?format=json");
    try {
      const response = await axios.get(this.baseUrl + path);
      return response.data;
    } catch (error) {
      throw new Error(`Unable to get starships: ${error.message}`);
    }
  };

  private buildPath(path: string): string {
    if (this.search) {
      path += "&search=" + this.search;
    }
    return path;
  }
}

export default SwapiService;
