import axiosInstance from "../Axios";
export const addContact = async ({ fullname, email, phone, message }) => {
  try {
    const response = await axiosInstance.post("contacts/addContact", {
      fullname,
      email,
      phone,
      message,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to add a contact:", error);
  }
};
