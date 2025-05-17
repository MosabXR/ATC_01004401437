import axios from "axios";
import api from "./api";
const createEvent = async (data) => {
  try {
    const response = await axios.post(`${api}/events`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const getEvents = async () => {
  try {
    const response = await axios.get(`${api}/events`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const getEventById = async (id) => {
  try {
    const response = await axios.get(`${api}/events/${id}`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const updateEvent = async (id, data) => {
  try {
    const response = await axios.patch(`${api}/events/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${api}/events/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
