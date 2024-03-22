import { PayloadAction } from "@reduxjs/toolkit";
import {
  DELETE_USER,
  DEL_FILES,
  GET_FILES,
  GET_TOKEN,
  GET_USERS,
  GET_USER_DATA,
  GET_USER_DETAIL,
  REGISTRATION,
  SEND_FILE,
  UPDATE_FILE,
  UPDATE_USER,
  endAuthorization,
  getAdminFilesLoading,
  getAdminUserDataLoading,
  getAdminUsersLoading,
  getLoginLoading,
  getProfileLoading,
  getSuccessFiles,
  getSuccessToken,
  getSuccessUser,
  getSuccessUserDetail,
  getSuccessUsers,
  get_user_data,
  get_users,
  setIsChangeFile,
  setIsSendFile,
} from "./MainSlice";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import {
  getUserApi,
  updateUserApi,
  addFileApi,
  deleteFileApi,
  getFilesApi,
  getUserDetailApi,
  getUsersApi,
  loginApi,
  registrationApi,
  updateFileApi,
  delUserApi,
} from "../utils/api";
import { useAppSelector } from "../models/hooks";
import File_data, { ChangeUser } from "../models/models";
import User from "../models/models";

export function* getTokenSaga(action: PayloadAction) {
  const token: string | null = yield select((store) => store.token);
  const { username, password } = action.payload;

  yield put(getLoginLoading());
  try {
    const response: AxiosResponse = yield loginApi(
      action.payload.username,
      action.payload.password
    );
    console.log(response);
    console.log(token);
    yield put(getSuccessToken(response));
    yield put(endAuthorization());
    yield call(getUserDetailSaga);
    // if response.status{
    //   localStorage.setItem('token', JSON.stringify(response.token))
    // }

    // if (response.status > 200 && response.status < 300) {
    //   yield put(getOrderSuccess());
    //   yield delay(10000);
    //   yield put(clearOrderSuccess());
    // }
  } catch (error) {
    // yield put(
    //   getItemFailed({ message: (error as Error).message, errFunc: action })
    // );
  }
}

export function* registrationSaga(action: PayloadAction) {
  const token: string | null = yield select((store) => store.token);
  const { username, password, email } = action.payload;

  yield put(getLoginLoading());
  try {
    const response: AxiosResponse = yield registrationApi(
      username,
      password,
      email
    );
    console.log(response);
    // console.log(token);

    // if response.status{
    //   localStorage.setItem('token', JSON.stringify(response.token))
    // }

    // if (response.status > 200 && response.status < 300) {
    //   yield put(getOrderSuccess());
    //   yield delay(10000);
    //   yield put(clearOrderSuccess());
    // }
  } catch (error) {
    // yield put(
    //   getItemFailed({ message: (error as Error).message, errFunc: action })
    // );
  }
}

export function* getFilesSaga() {
  const token: string | null = yield select((store) => store.token);

  console.log("get files");
  if (token) {
    // yield put(getLoginLoading());
    try {
      const response: File_data = yield getFilesApi(token);
      yield put(getSuccessFiles(response));
      console.log(response);
      // console.log(token);

      // if response.status{
      //   localStorage.setItem('token', JSON.stringify(response.token))
      // }

      // if (response.status > 200 && response.status < 300) {
      //   yield put(getOrderSuccess());
      //   yield delay(10000);
      //   yield put(clearOrderSuccess());
      // }
    } catch (error) {
      // yield put(
      //   getItemFailed({ message: (error as Error).message, errFunc: action })
      // );
    }
  } else {
    yield put(getSuccessFiles([]));
  }
}
export function* sendFileSaga(action: PayloadAction) {
  const token: string | null = yield select((store) => store.token);

  console.log(action.payload, "from send saga");

  if (token) {
    // yield put(getLoginLoading());
    try {
      const response: AxiosResponse = yield addFileApi(token, action.payload);
      console.log(response.status, "this ststus from send saga");

      // yield call(getFilesSaga);

      if (response.status === 201) {
        yield call(getFilesSaga);
        yield put(setIsSendFile());
      }
      console.log(response);
      // console.log(token);
      // if response.status{
      //   localStorage.setItem('token', JSON.stringify(response.token))
      // }
      // if (response.status > 200 && response.status < 300) {
      //   yield put(getOrderSuccess());
      //   yield delay(10000);
      //   yield put(clearOrderSuccess());
      // }
    } catch (error) {
      // yield put(
      //   getItemFailed({ message: (error as Error).message, errFunc: action })
      // );
    }
  }
}
export function* updateFileSaga(action: PayloadAction) {
  const token: string | null = yield select((store) => store.token);

  console.log(action.payload, "from update saga");

  if (token) {
    const fileCangeInfo = yield select((store) => store.isChangeFile);
    const currentUser = yield select((store) => store.adminPanel.currentUser);

    // yield put(getLoginLoading());
    try {
      const response: AxiosResponse = yield updateFileApi(
        token,
        fileCangeInfo.id,
        action.payload
      );
      console.log(response.status, "this ststus from update saga");
      // yield call(getFilesSaga);
      if (response.status === 200) {
        yield call(getFilesSaga);
        yield put(setIsChangeFile());
        if (currentUser) {
          yield put(get_user_data(currentUser.id));
        }
      }
      // console.log(response);
      // console.log(token);
      // if response.status{
      //   localStorage.setItem('token', JSON.stringify(response.token))
      // }
      // if (response.status > 200 && response.status < 300) {
      //   yield put(getOrderSuccess());
      //   yield delay(10000);
      //   yield put(clearOrderSuccess());
      // }
    } catch (error) {
      // yield put(
      //   getItemFailed({ message: (error as Error).message, errFunc: action })
      // );
    }
  }
}
export function* delFilesSaga(action: PayloadAction) {
  const token: string | null = yield select((store) => store.token);
  const currentUser = yield select((store) => store.adminPanel.currentUser);
  console.log(action.payload, "from del saga");

  console.log("del files");
  if (token) {
    // yield put(getLoginLoading());
    try {
      console.log(token, action.payload, " from del token + id");

      const response: AxiosResponse = yield deleteFileApi(
        token,
        action.payload
      );
      // добавить сообщение об удалении
      console.log(response.status);

      if (response.status === 204) {
        yield call(getFilesSaga);
        if (currentUser) {
          yield put(get_user_data(currentUser.id));
        }
      }
      // console.log(adminPanel.currentUser, "from del saga");

      console.log(response);
      // console.log(token);
      // if response.status{
      //   localStorage.setItem('token', JSON.stringify(response.token))
      // }
      // if (response.status > 200 && response.status < 300) {
      //   yield put(getOrderSuccess());
      //   yield delay(10000);
      //   yield put(clearOrderSuccess());
      // }
    } catch (error) {
      // yield put(
      //   getItemFailed({ message: (error as Error).message, errFunc: action })
      // );
    }
  }
}
export function* getUsersSaga() {
  const token: string | null = yield select((store) => store.token);

  console.log("get users");

  yield put(getAdminUsersLoading());
  if (token) {
    try {
      const response: User[] = yield getUsersApi(token);

      yield put(getSuccessUsers(response));
      console.log(response);
      // console.log(token);

      // if response.status{
      //   localStorage.setItem('token', JSON.stringify(response.token))
      // }

      // if (response.status > 200 && response.status < 300) {
      //   yield put(getOrderSuccess());
      //   yield delay(10000);
      //   yield put(clearOrderSuccess());
      // }
    } catch (error) {
      // yield put(
      //   getItemFailed({ message: (error as Error).message, errFunc: action })
      // );
    }
  }
}
export function* getUserDetailSaga() {
  const token: string | null = yield select((store) => store.token);

  console.log("get users");

  yield put(getProfileLoading());
  if (token) {
    try {
      const response: User[] = yield getUserDetailApi(token);

      // console.log(response[0]);

      yield put(getSuccessUserDetail(response[0]));
      // console.log(response);
      // console.log(token);

      // if response.status{
      //   localStorage.setItem('token', JSON.stringify(response.token))
      // }

      // if (response.status > 200 && response.status < 300) {
      //   yield put(getOrderSuccess());
      //   yield delay(10000);
      //   yield put(clearOrderSuccess());
      // }
    } catch (error) {
      // yield put(
      //   getItemFailed({ message: (error as Error).message, errFunc: action })
      // );
    }
  }
}
export function* getUserSaga(action: PayloadAction) {
  const token: string | null = yield select((store) => store.token);

  console.log("get user user user  ");

  yield put(getAdminUserDataLoading());
  yield put(getAdminFilesLoading());
  if (token) {
    try {
      const response: User = yield getUserApi(token, action.payload);

      // console.log(response[0]);
      console.log(response);

      yield put(getSuccessUser(response));
      // console.log(response);
      // console.log(token);

      // if response.status{
      //   localStorage.setItem('token', JSON.stringify(response.token))
      // }

      // if (response.status > 200 && response.status < 300) {
      //   yield put(getOrderSuccess());
      //   yield delay(10000);
      //   yield put(clearOrderSuccess());
      // }
    } catch (error) {
      // yield put(
      //   getItemFailed({ message: (error as Error).message, errFunc: action })
      // );
    }
  }
}
export function* updateUserSaga(
  action: PayloadAction<{ body: ChangeUser; id: number }>
) {
  const token: string | null = yield select((store) => store.token);

  console.log("get update");
  console.log(action);
  const { body, id } = action.payload;
  console.log(body, id, " from update saga");

  // yield put(getLoginLoading());
  if (token && body) {
    try {
      const response: User[] = yield updateUserApi(token, body, id);
      // console.log(response[0]);
      // yield put(getSuccessUserDetail(response[0]));
      console.log(response);
      // console.log(token);
      // if response.status{
      //   localStorage.setItem('token', JSON.stringify(response.token))
      // }
      // if (response.status > 200 && response.status < 300) {
      //   yield put(getOrderSuccess());
      //   yield delay(10000);
      //   yield put(clearOrderSuccess());
      // }
    } catch (error) {
      // yield put(
      //   getItemFailed({ message: (error as Error).message, errFunc: action })
      // );
    }
  }
}
export function* delUserSaga(action: PayloadAction<number>) {
  const token: string | null = yield select((store) => store.token);

  const id = action.payload;

  if (token) {
    try {
      const response: AxiosResponse = yield delUserApi(token, id);

      console.log(response);
      console.log(response.status);

      if (response.status > 200 && response.status < 300) {
        yield put(get_users());
      }
    } catch (error) {
      // yield put(
      //   getItemFailed({ message: (error as Error).message, errFunc: action })
      // );
    }
  }
}

export function* mainSaga() {
  yield takeEvery(GET_TOKEN, getTokenSaga);
  yield takeEvery(REGISTRATION, registrationSaga);
  yield takeEvery(GET_USERS, getUsersSaga);
  yield takeEvery(GET_FILES, getFilesSaga);
  yield takeEvery(DEL_FILES, delFilesSaga);
  yield takeEvery(SEND_FILE, sendFileSaga);
  yield takeEvery(UPDATE_FILE, updateFileSaga);
  yield takeEvery(GET_USER_DETAIL, getUserDetailSaga);
  yield takeEvery(UPDATE_USER, updateUserSaga);
  yield takeEvery(GET_USER_DATA, getUserSaga);
  yield takeEvery(DELETE_USER, delUserSaga);
  // yield takeEvery(GET_CATEGORY, getCategorySaga);
}
