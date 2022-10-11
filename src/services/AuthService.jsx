import axios from "axios";

const editUserInfo = async (id, newUpdateInfo) => {
  const data = await axios.put(
    `${import.meta.env.VITE_API_URL}/users/${id}`,
    newUpdateInfo
  );
  return data;
};

export default {
  editUserInfo,
};
