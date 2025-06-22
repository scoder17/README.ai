import axios from "axios";

export const generateReadme = async (repoUrl: string) => {
  const response = await axios.post("${process.env.REACT_APP_API_URL}/api/generate-readme/", {
    repo_url: repoUrl,
  });
  return response.data;
};