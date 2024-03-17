import { PayloadAction } from "@reduxjs/toolkit";
import {
  DEL_FILES,
  GET_FILES,
  GET_TOKEN,
  GET_USERS,
  GET_USER_DETAIL,
  REGISTRATION,
  SEND_FILE,
  UPDATE_FILE,
  UPDATE_USER,
  getLoginLoading,
  getSuccessFiles,
  getSuccessToken,
  getSuccessUserDetail,
  setIsChangeFile,
  setIsSendFile,
} from "./MainSlice";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import {
  UpdateUserApi,
  addFileApi,
  deleteFileApi,
  getFilesApi,
  getUserDetailApi,
  getUsersApi,
  loginApi,
  registrationApi,
  updateFileApi,
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
    const FileCangeInfo = yield select((store) => store.isChangeFile);

    // yield put(getLoginLoading());
    try {
      const response: AxiosResponse = yield updateFileApi(
        token,
        FileCangeInfo.id,
        action.payload
      );
      console.log(response.status, "this ststus from update saga");
      // yield call(getFilesSaga);
      if (response.status === 200) {
        yield call(getFilesSaga);
        yield put(setIsChangeFile());
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

  console.log(action.payload, "from del saga");

  console.log("del files");
  if (token) {
    // yield put(getLoginLoading());
    try {
      const response: AxiosResponse = yield deleteFileApi(
        token,
        action.payload
      );
      // добавить сообщение об удалении
      console.log(response.status);

      if (response.status === 204) {
        yield call(getFilesSaga);
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
export function* getUsersSaga(action: PayloadAction) {
  const token: string | null = yield select((store) => store.token);

  console.log("get users");

  // yield put(getLoginLoading());
  try {
    const response: AxiosResponse = yield getUsersApi(token);

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
export function* getUserDetailSaga(action: PayloadAction) {
  const token: string | null = yield select((store) => store.token);

  console.log("get users");

  // yield put(getLoginLoading());
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
export function* getUpdateUserSaga(
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
      const response: User[] = yield UpdateUserApi(token, body, id);
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

export function* mainSaga() {
  yield takeEvery(GET_TOKEN, getTokenSaga);
  yield takeEvery(REGISTRATION, registrationSaga);
  yield takeEvery(GET_USERS, getUsersSaga);
  yield takeEvery(GET_FILES, getFilesSaga);
  yield takeEvery(DEL_FILES, delFilesSaga);
  yield takeEvery(SEND_FILE, sendFileSaga);
  yield takeEvery(UPDATE_FILE, updateFileSaga);
  yield takeEvery(GET_USER_DETAIL, getUserDetailSaga);
  yield takeEvery(UPDATE_USER, getUpdateUserSaga);
  // yield takeEvery(GET_CATEGORY, getCategorySaga);
}
