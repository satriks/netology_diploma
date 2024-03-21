import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import File_data, { ChangeUser } from "../models/models";
import { User } from "../models/models";

interface InitialStateType {
  loading: {
    login: boolean;
  };
  token: string | null;
  files: File_data[];
  lastDropOn: number | null;
  authorization: boolean;
  isSendFile: boolean;
  isChangeFile: {
    name?: string;
    description?: string;
    id?: string;
    isActive: boolean;
  };
  isShareFile: {
    isShare: boolean;
    uuid?: string;
  };
  user: User | null;
  adminPanel: {
    users: User[] | null;
    currentUser: User | null;
  };
}

const initialState: InitialStateType = {
  loading: {
    login: false,
  },
  token: null,
  files: [],
  lastDropOn: null,
  isSendFile: false,
  isChangeFile: { isActive: false },
  isShareFile: { isShare: false },
  user: null,
  adminPanel: {
    users: null,
    currentUser: null,
  },
  authorization: false,
};

const MainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    startAuthorization(state) {
      state.authorization = true;
    },
    endAuthorization(state) {
      state.authorization = false;
    },
    clearUserToken(state) {
      state.token = null;
    },
    getLoginLoading(state) {
      state.loading.login = true;
    },
    getSuccessToken(state, action) {
      state.token = action.payload.token;
    },
    getSuccessFiles(state, action: PayloadAction<File_data[]>) {
      state.files = [...action.payload];
    },
    getSuccessUserDetail(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    getSuccessUser(state, action: PayloadAction<User>) {
      state.adminPanel.currentUser = action.payload;
    },
    clearCurrentUser(state) {
      state.adminPanel.currentUser = null;
    },
    getSuccessUsers(state, action: PayloadAction<User[]>) {
      state.adminPanel.users = action.payload;
    },
    logout(state) {
      state.token = null;
    },
    setLastDropOn(state, action) {
      state.lastDropOn = action.payload;
    },
    setIsSendFile(state) {
      state.isSendFile = !state.isSendFile;
    },
    setIsShareFile(state, action: PayloadAction<string>) {
      state.isShareFile.isShare = !state.isShareFile.isShare;
      if (action.payload) {
        state.isShareFile.uuid = action.payload;
      }
    },
    setIsChangeFile(
      state,
      action: PayloadAction<{
        name?: string;
        description?: string;
        id?: string;
      }>
    ) {
      state.isChangeFile.isActive = !state.isChangeFile.isActive;
      if (action.payload) {
        state.isChangeFile.name = action.payload.name;
        state.isChangeFile.description = action.payload.description;
        state.isChangeFile.id = action.payload.id;
      }
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
export const getToken = createAction<{
  username: string;
  password: string;
}>(GET_TOKEN);
export const REGISTRATION = "main/registration";
export const registration = createAction<{
  username: string;
  password: string;
  email: string;
}>(REGISTRATION);
export const GET_USERS = "main/getUsers";
export const get_users = createAction(GET_USERS);
export const GET_FILES = "main/getFiles";
export const get_files = createAction(GET_FILES);
export const DEL_FILES = "main/delFiles";
export const del_files = createAction(DEL_FILES);
export const SEND_FILE = "main/sendFile";
export const send_file = createAction<{
  name: string;
  description: string;
  file: File;
}>(SEND_FILE);
export const UPDATE_FILE = "main/updateFile";
export const update_file = createAction<{
  name: string;
  description: string;
}>(UPDATE_FILE);
export const GET_USER_DETAIL = "main/getUserDetail";
export const get_user_detail = createAction(GET_USER_DETAIL);
export const UPDATE_USER = "main/updateUser";
export const update_user = createAction<{ body: ChangeUser; id: number }>(
  UPDATE_USER
);
export const GET_USER_DATA = "main/getUserData";
export const get_user_data = createAction<{ id: number }>(GET_USER_DATA);

export const {
  clearUserToken,
  startAuthorization,
  endAuthorization,
  getLoginLoading,
  getSuccessToken,
  getSuccessFiles,
  logout,
  setLastDropOn,
  setIsSendFile,
  setIsChangeFile,
  setIsShareFile,
  getSuccessUserDetail,
  getSuccessUser,
  getSuccessUsers,
  clearCurrentUser,
  // clearLastDRopOn,
} = MainSlice.actions;

export default MainSlice.reducer;
