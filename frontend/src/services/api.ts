import axios from "axios";

export const generateReadme = async (repoUrl: string) => {
  const response = await axios.post("http://localhost:8000/api/generate-readme/", {
    repo_url: repoUrl,
  });
  return response.data;
};