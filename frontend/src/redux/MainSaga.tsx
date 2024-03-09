import { PayloadAction } from "@reduxjs/toolkit";
import {
  GET_FILES,
  GET_TOKEN,
  GET_USERS,
  REGISTRATION,
  getLoginLoading,
  getSuccessFiles,
  getSuccessToken,
} from "./MainSlice";
import { put, select, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import {
  getFilesApi,
  getUsersApi,
  loginApi,
  registrationApi,
} from "../utils/api";
import { useAppSelector } from "../models/hooks";

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

export function* getFilesSaga(action: PayloadAction) {
  const token: string | null = yield select((store) => store.token);

  console.log("get users");

  // yield put(getLoginLoading());
  try {
    const response: AxiosResponse = yield getFilesApi(token);
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

export function* mainSaga() {
  yield takeEvery(GET_TOKEN, getTokenSaga);
  yield takeEvery(REGISTRATION, registrationSaga);
  yield takeEvery(GET_USERS, getUsersSaga);
  yield takeEvery(GET_FILES, getFilesSaga);
  // yield takeEvery(GET_CATEGORY, getCategorySaga);
}
