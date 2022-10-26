import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading : false,
    loadingLatestNews : false,
}

const loadingSlice = createSlice({
    name:'loading-slice',
    initialState: initialState,
    reducers: {
        loadingData : (state, action) => ({
            ...state,
            loading: action.payload
        }),
        loadingLatestNews : (state, action) => ({
            ...state,
            loadingLatestNews: action.payload
        })
    }
})

export const { loadingData, loadingLatestNews } = loadingSlice.actions;
export default loadingSlice.reducer;