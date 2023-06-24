import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./cards-service";


export const findTuitsThunk = createAsyncThunk(
  "tuits/findCards",
  async () => await service.findCard()
);

export const deleteTuitThunk = createAsyncThunk(
  'tuits/deleteTuit',
  async (tuitId) => {
    await service.deleteCard(tuitId)
    return tuitId
  })

export const createTuitThunk = createAsyncThunk(
  'tuits/createTuit',
  async (tuit) => {
    const newTuit = await service.createCard(tuit)
    return newTuit
  })

export const updateTuitThunk =
  createAsyncThunk(
    'tuits/updateTuit',
    async (tuit) =>
      await service.updateCard(tuit)
  )

  export const findTuitsByIdThunk = createAsyncThunk(
    "tuits/findAllCards",
    async (idList) => await service.getCardDetails(idList)
  );