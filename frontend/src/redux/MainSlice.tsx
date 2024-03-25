import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import File_data, { ChangeUser } from "../models/models";
import { User } from "../models/models";

interface InitialStateType {
  loading: {
    login: boolean;
    profile: boolean;
    adminUsers: boolean;
    adminUserData: boolean;
    adminFileData: boolean;
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
  dropMenuHeader: string | null;
}

const initialState: InitialStateType = {
  loading: {
    login: false,
    profile: false,
    adminUsers: false,
    adminUserData: false,
    adminFileData: false,
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
  dropMenuHeader: null,
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
      localStorage.removeItem("token");
    },
    getLoginLoading(state) {
      state.loading.login = true;
    },
    getProfileLoading(state) {
      state.loading.profile = true;
    },
    getAdminUsersLoading(state) {
      state.loading.adminUsers = true;
    },
    getAdminUserDataLoading(state) {
      state.loading.adminUserData = true;
    },
    getAdminFilesLoading(state) {
      state.loading.adminFileData = true;
    },
    getSuccessToken(state, action) {
      state.token = action.payload.token;
      state.loading.login = false;
    },
    getSuccessFiles(state, action: PayloadAction<File_data[]>) {
      state.files = [...action.payload];
    },
    getSuccessUserDetail(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading.profile = false;
    },
    getSuccessUser(state, action: PayloadAction<User>) {
      state.adminPanel.currentUser = action.payload;
      state.loading.adminUserData = false;
      state.loading.adminFileData = false;
    },
    clearCurrentUser(state) {
      state.adminPanel.currentUser = null;
    },
    getSuccessUsers(state, action: PayloadAction<User[]>) {
      state.adminPanel.users = action.payload;
      state.loading.adminUsers = false;
    },
    logout(state) {
      state.token = null;
    },
    setDropMenuHeader(state, action: PayloadAction<string>) {
      state.dropMenuHeader = action.payload;
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
export const DELETE_USER = "main/delUser";
export const del_user = createAction<number>(DELETE_USER);
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
  getProfileLoading,
  getAdminUsersLoading,
  getAdminUserDataLoading,
  getAdminFilesLoading,
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
  setDropMenuHeader,
  // clearLastDRopOn,
} = MainSlice.actions;

export default MainSlice.reducer;
