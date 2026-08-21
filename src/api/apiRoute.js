import axiosInstance from "./axiosInstance";

/* ================= CREATE CONTACT ================= */
export const createContact = async (data) => {
  try {
    const response = await axiosInstance.post("/ma-architect/contact", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* ================= GET ALL CONTACTS ================= */
export const getAllContacts = async () => {
  try {
    const response = await axiosInstance.get("/ma-architect/contact");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* ================= DELETE CONTACT ================= */
export const deleteContact = async (id) => {
  try {
    const response = await axiosInstance.delete(`/ma-architect/contact/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};