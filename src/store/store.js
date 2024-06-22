import { configureStore } from "https://cdn.jsdelivr.net/npm/@reduxjs/toolkit@2.2.5/+esm"
import { reducer as userReducer, name as userActions } from "./slices/users";

export const store = configureStore({
    reducer: {
        [userActions]: userReducer
    }
});
