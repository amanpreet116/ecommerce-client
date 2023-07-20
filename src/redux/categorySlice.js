import {createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import {axiosClient} from '../utils/axiosClient'

//fetching categories data
export const fetchCategories = createAsyncThunk(
    'api/categories', 
    async()=>{
        try {
            const response = await axiosClient.get(`/categories?populateimage`);
            return response.data.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);
const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        categories: [],
    },
    //
    extraReducers: (builder) =>{
        builder.addCase(fetchCategories.fulfilled, (state,action) => {
            state.categories = action.payload
        });
    }
});

export default categorySlice.reducer