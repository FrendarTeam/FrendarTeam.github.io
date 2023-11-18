import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
        userId : undefined,
        nickname : undefined,
    }
  },
  reducers: {
    set: (state, action) => {
      console.log(action.payload)
        state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { set } = userSlice.actions

export default userSlice.reducer