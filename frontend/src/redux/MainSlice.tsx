import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import File_data from "../models/models";

interface InitialStateType {
  loading: {
    login: boolean;
  };
  token: string | null;
  files: File_data[];
  lastDropOn: number | null;
}

const initialState: InitialStateType = {
  loading: {
    login: false,
  },
  token: null,
  files: [],
  lastDropOn: null,
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
    getSuccessFiles(state, action: PayloadAction<File_data[]>) {
      state.files = [...action.payload];
    },
    logout(state) {
      state.token = null;
    },
    setLastDropOn(state, action) {
      state.lastDropOn = action.payload;
    },
    // clearLastDRopOn(state) {
    //   const dropOn = state.lastDropOn;
    //   if (dropOn) {
    //     dropOn(false);
    //   }
    // },
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
export const DEL_FILES = "main/delFiles";
export const del_files = createAction(DEL_FILES);

export const {
  getLoginLoading,
  getSuccessToken,
  getSuccessFiles,
  logout,
  setLastDropOn,
  // clearLastDRopOn,
} = MainSlice.actions;

export default MainSlice.reducer;
