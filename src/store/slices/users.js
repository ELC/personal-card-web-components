import { createSlice } from "https://cdn.jsdelivr.net/npm/@reduxjs/toolkit@2.2.5/+esm"

const initialState = {
    selectedUser: null,
}

export const userSlice = createSlice({
    initialState,
    name: "users",
    reducers: {
        updateUserAction(state, action) {
            return {
                ...state,
                selectedUser: action.payload
            }
        },
        resetUserAction(state, action) {
            return {
                ...state,
                selectedUser: null
            }
        }
    }
});

export const { updateUserAction, resetUserAction } = userSlice.actions;

export const { reducer } = userSlice;

export const { name } = userSlice;
