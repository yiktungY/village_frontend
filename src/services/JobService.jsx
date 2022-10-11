import axios from "axios";

const getJobDetails = async (postID) => {
  if (postID) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/posts/${postID}`
    );
    return response.data;
  }
};

const creatJob = async (jobInfo) => {
  if (jobInfo) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/posts`,
      jobInfo
    );
    return response;
  }
};

export default {
  getJobDetails,
  creatJob,
};
