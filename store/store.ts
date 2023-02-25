import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const initialState = {
    username: null,
    messages: [],
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUsername(state, action) {
            state.username = action.payload
        },
        addMessage(state, action) {
            state.messages.push(action.payload)
        },
    },
});


export const { setUsername, addMessage } = chatSlice.actions;

const store = configureStore({
    reducer: chatSlice.reducer
})



export default store;

