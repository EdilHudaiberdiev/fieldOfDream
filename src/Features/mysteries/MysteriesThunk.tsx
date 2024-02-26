import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';


export const getAllMysteries = createAsyncThunk(
  'mysteries/get-all',
  async () => {
    try {
      const response = await axiosApi.get(`mysteries.json`);
      const data = response.data;
      const parsedData = JSON.parse(data);
      return parsedData[0] ?? [];
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      return [];
    }
  });



