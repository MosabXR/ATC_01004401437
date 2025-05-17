import axios from "axios";
import api from "./api";
const createTicket = async (id) => {
  try {
    const response = await axios.post(
      `${api}/tickets/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);

    return err.response.data;
  }
};

const getTickets = async () => {
  try {
    const response = await axios.get(`${api}/tickets`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const getTicketById = async (id) => {
  try {
    const response = await axios.get(`${api}/tickets/${id}`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const claimTicket = async (id) => {
  try {
    const response = await axios.patch(`${api}/tickets/${id}/claim`);
    return response.data;
  } catch (err) {
    console.log(err.response.data);

    return err.response.data;
  }
};

// const deleteTicket = async (ticketId) => {
//   const response = await axios.delete(`/api/tickets/${ticketId}`);
//   return response.data;
// };

export { createTicket, getTickets, getTicketById, claimTicket };
