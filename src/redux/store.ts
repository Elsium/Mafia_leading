import {configureStore} from "@reduxjs/toolkit";
import gameSlice from "@/redux/Features/gameSlice";

export const store = configureStore({
    reducer: {
        gameData: gameSlice,
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch