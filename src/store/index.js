import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./features/loading/loadingSlice";

const combinedReducers = combineReducers({
    loading : loadingSlice
})

export const store = configureStore({
    reducer: combinedReducers,
})