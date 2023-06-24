import axios from 'axios';
const BILLING_API = 'http://localhost:4000/api/billing';
const BILLING_API_CARD = 'http://localhost:4000/api/billing/cards';
// const TUITS_API = 'https://tuiter-node-server-app-lej1.onrender.com/api/tuits';

export const createCard = async (card) => {
    const response = await axios.post(BILLING_API, card)
    return response.data;
  }
  export const findCard = async (id) => {
    const response = await axios.get(BILLING_API);
    const tuits = response.data;
    return tuits;
  }
  export const deleteCard = async (cid) => {
    const response = await axios.delete(`${BILLING_API}/${cid}`)
    return response.data
  }
  export const updateCard = async (card) => {
    await axios.put(`${BILLING_API}/${card._id}`, card);
    return card;
  }

  export const findCardById = async (id) => {
    const response = await axios.get(`${BILLING_API}/${id}`);
    const tuits = response.data;
    return tuits;
  }

  export const getCardDetails = async (cardIds) => {
      const response = await axios.post(BILLING_API_CARD, { cardIds });
      return response.data;
  };