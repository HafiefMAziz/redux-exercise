import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:3000/users";

const initialState = {
  loading: false,
  loggedUser: {},
  error: null,
};

export const loginUser = createAsyncThunk("users/loginUser", async (userLogin) => {
  console.log(`loginUser`);
  try {
    const result = await axios({
      method: "GET",
      url: `${URL}`,
    });
    const foundUser = result.data.find(user => user.username === userLogin.username && user.password === userLogin.password);
    console.log(result.data);
    console.log(userLogin);
    if(foundUser){
        console.log(foundUser);
        return foundUser;
    }else{
        return {errorLogin: "Wrong Username or Password!"}
    }
  } catch (error) {
    return { message: "Error loginUser", error: error };
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //action.payload return dari createAsyncThunk
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      if(action.payload.errorLogin){
        state.error = action.payload.errorLogin;
      }else{
        state.loggedUser = action.payload;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.loggedUser = {};
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { getArticlesReducer } = userSlice.actions

export default userSlice.reducer;
