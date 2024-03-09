import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  loading: {
    login: boolean;
  };
  token: string | null;
  files: [];
}

const initialState = {
  loading: {
    login: false,
  },
  token: null,
  files: [],
};

const MainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    getLoginLoading(state) {
      state.loading.login = true;
    },
    getSuccessToken(state, action) {
      state.token = action.payload.token;
    },
    getSuccessFiles(state, action) {
      state.files = [...action.payload];
    },
    logout(state) {
      state.token = null;
    },
    // getSuccessUsers(state, action) {
    //   state.token = action.payload.token;
    // },
  },
});

export const GET_TOKEN = "main/getToken";
export const getToken = createAction(GET_TOKEN);
export const REGISTRATION = "main/registration";
export const registration = createAction(REGISTRATION);
export const GET_USERS = "main/getUsers";
export const get_users = createAction(GET_USERS);
export const GET_FILES = "main/getFiles";
export const get_files = createAction(GET_FILES);

export const { getLoginLoading, getSuccessToken, getSuccessFiles, logout } =
  MainSlice.actions;

export default MainSlice.reducer;
