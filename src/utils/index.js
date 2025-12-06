import axios from "axios";

export const imageUpload = async (profileImg) => {
  const formData = new FormData();

  formData.append("image", profileImg);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`,
    formData
  );
  return data?.data?.display_url;
};
