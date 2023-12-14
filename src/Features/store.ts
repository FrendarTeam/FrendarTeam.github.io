import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'Features/userSlice'
import modalSlice from 'Features/modal-slice'

const store = configureStore({
    reducer: {
        user: userReducer,
        modal: modalSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
