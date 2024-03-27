import {
  Action,
  ActionCreator,
  ActionCreatorWithPayload,
  PayloadAction,
} from "@reduxjs/toolkit";
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
  clearCurrentUser,
  endAuthorization,
  // setAdminFilesLoading,
  setAdminUserDataLoading,
  setAdminUsersLoading,
  setLoginLoading,
  setProfileLoading,
  getSuccessFiles,
  getSuccessToken,
  getSuccessUser,
  getSuccessUserDetail,
  getSuccessUsers,
  get_user_data,
  get_users,
  setIsChangeFile,
  setIsSendFile,
  setErrorState,
  setCatalogError,
  setProfileError,
  setCatalogLoading,
  setAdminUsersError,
  setAdminUserDataError,
  getSuccessRegistration,
  setSendChangeLoading,
  setDelFileLoading,
  setInfoMessage,
} from "./MainSlice";
import { call, delay, put, select, takeEvery } from "redux-saga/effects";
import { AxiosError, AxiosResponse } from "axios";
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
import File_data, { ChangeUser } from "../models/models";
import User from "../models/models";
import { AnyAction } from "redux-saga";

export function* getTokenSaga(action: Action) {
  const token: string | null = yield select((store) => store.token);
  const { username, password } = action.payload;

  yield put(setLoginLoading(true));
  try {
    const response: AxiosResponse = yield loginApi(
      action.payload.username,
      action.payload.password
    );

    yield put(getSuccessToken(response));
    yield put(endAuthorization());
    yield call(getUserDetailForTokenSaga);

    if (response.token) {
      localStorage.setItem("token", JSON.stringify(response.token));
    }
  } catch (error) {
    yield put(setLoginLoading(false));
    if (error.code === "ERR_NETWORK") {
      yield call(showError, {
        status: "0",
        message: "Сервер не отвечает, попробуйте позже",
      });
    }
    if (error && error.code !== "ERR_NETWORK") {
      const errorData = {
        status: error.response.status,
        message: error.response.data.non_field_errors[0],
      };

      yield call(showError, errorData);
      // yield put(setErrorState(errorData));
      // yield delay(5000);
      // yield put(setErrorState(null));
    }

    // yield put(
    //   getItemFailed({ message: (error as Error).message, errFunc: action })
    // );
  }
}
export function* registrationSaga(action: Action) {
  const token: string | null = yield select((store) => store.token);
  const { username, password, email } = action.payload;

  yield put(setLoginLoading(true));
  try {
    const response: AxiosResponse = yield registrationApi(
      username,
      password,
      email
    );
    yield put(getSuccessRegistration(true));
    yield call(showMessage, "Успешно зарегистрирован");

    console.log(response);
  } catch (error) {
    yield call(showErrorMessage, error);
    yield put(setLoginLoading(false));
  }
}

export function* getFilesSaga(action: Action) {
  const token: string | null = yield select((store) => store.token);

  yield put(setCatalogError(null));

  if (token) {
    yield put(setCatalogLoading(true));
    try {
      const response: File_data = yield getFilesApi(token);
      yield put(getSuccessFiles(response));
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
      yield call(setError, error, setCatalogError, action);
      yield put(setCatalogLoading(false));
    }
  } else {
    yield put(getSuccessFiles([]));
  }
}
export function* sendFileSaga(action: Action) {
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
        yield call(showMessage, "Успешно добавлен");
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
export function* updateFileSaga(action: Action) {
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
        yield call(showMessage, "Файл изменен");

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
      yield call(showErrorMessage, error);
    }
  }
}
export function* delFilesSaga(action: Action) {
  const token: string | null = yield select((store) => store.token);
  const currentUser = yield select((store) => store.adminPanel.currentUser);
  console.log(action.payload, "from del saga");

  console.log("del files");
  if (token) {
    yield put(setDelFileLoading(true));
    try {
      console.log(token, action.payload, " from del token + id");

      const response: AxiosResponse = yield deleteFileApi(
        token,
        action.payload
      );
      // добавить сообщение об удалении
      console.log(response.status);

      if (response.status === 204) {
        yield put(setDelFileLoading(false));
        yield call(getFilesSaga);
        yield call(showMessage, "Файл удален");

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
      yield put(setDelFileLoading(false));
      yield call(showErrorMessage, error);
    }
  }
}

export function* getUsersSaga(action: Action) {
  const token: string | null = yield select((store) => store.token);

  yield put(setAdminUsersError(null));
  yield put(setAdminUsersLoading(true));

  if (token) {
    try {
      const response: User[] = yield getUsersApi(token);

      yield put(getSuccessUsers(response));
    } catch (error) {
      yield call(setError, error, setAdminUsersError, action);
      yield put(setAdminUsersLoading(false));
    }
  }
}
export function* getUserDetailForTokenSaga(action: Action) {
  const token: string | null = yield select((store) => store.token);

  yield put(setProfileError(null));
  yield put(setProfileLoading(true));
  if (token) {
    try {
      const response: User[] = yield getUserDetailApi(token);

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
      yield call(setError, error, setProfileError, action);
      yield put(setProfileLoading(false));

      // if (error.code === "ERR_NETWORK") {
      //   yield put(
      //     setProfileError({
      //       status: "0",
      //       message: "Сервер не работает, попробуйте позже",
      //       action: action,
      //     })
      //   );
      // }
      // if (error && error.code !== "ERR_NETWORK") {
      //   const errorData = {
      //     status: error.response.status,
      //     message: error.response.data.non_field_errors[0],
      //     action: action,
      //   };

      //   yield put(setProfileError(errorData));
      // }
      // yield put(setProfileLoading(false));
    }
  }
}
export function* getUserSaga(action: PayloadAction) {
  const token: string | null = yield select((store) => store.token);

  yield put(setAdminUserDataLoading(true));
  yield put(setAdminUserDataError(null));

  if (token) {
    try {
      const response: User = yield getUserApi(token, action.payload);

      yield put(getSuccessUser(response));
    } catch (error) {
      yield call(setError, error, setAdminUserDataError, action);
      yield put(getSuccessUser(null));

      yield put(setAdminUserDataLoading(false));
    }
  }
}
export function* updateUserSaga(
  action: PayloadAction<{ body: ChangeUser; id: number }>
) {
  const token: string | null = yield select((store) => store.token);
  const { body, id } = action.payload;

  yield put(setSendChangeLoading(true));

  if (token && body) {
    try {
      const response: User[] = yield updateUserApi(token, body, id);
      yield put(setSendChangeLoading(false));
      yield call(showMessage, "Данные изменены");
    } catch (error) {
      yield put(setSendChangeLoading(false));
      yield call(showErrorMessage, error);
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
        yield put(clearCurrentUser());
        yield call(showMessage, "Пользователь удален");

        // yield call(showErrorMessage, error);
      }
    } catch (error) {
      yield call(showErrorMessage, error);
    }
  }
}

export function* mainSaga() {
  yield takeEvery(GET_TOKEN, getTokenSaga);
  yield takeEvery(REGISTRATION, registrationSaga);
  yield takeEvery(GET_FILES, getFilesSaga);
  yield takeEvery(DEL_FILES, delFilesSaga);
  yield takeEvery(SEND_FILE, sendFileSaga);
  yield takeEvery(UPDATE_FILE, updateFileSaga);
  yield takeEvery(GET_USERS, getUsersSaga);
  yield takeEvery(GET_USER_DETAIL, getUserDetailForTokenSaga);
  yield takeEvery(UPDATE_USER, updateUserSaga);
  yield takeEvery(GET_USER_DATA, getUserSaga);
  yield takeEvery(DELETE_USER, delUserSaga);
  // yield takeEvery(GET_CATEGORY, getCategorySaga);
}

function* showError(myError: { status: string; message: string }) {
  yield put(setErrorState(myError));
  yield delay(5 * 1000);
  yield put(setErrorState(null));
}
function* showMessage(message: string) {
  yield put(setInfoMessage(message));
  yield delay(5 * 1000);
  yield put(setInfoMessage(null));
}

function* showErrorMessage(error: AxiosError) {
  if (error.code === "ERR_NETWORK") {
    yield call(showError, {
      status: "0",
      message: "Сервер не работает, попробуйте позже",
    });
  }
  if (error && error.code !== "ERR_NETWORK") {
    const errorData = {
      status: error.response.status,
      message: error.response.data.non_field_errors[0],
    };

    yield call(showError, errorData);
  }
}
function* setError(
  error: AxiosError,
  setErrorFunc: PayloadAction,
  action: Action
) {
  if (error.code === "ERR_NETWORK") {
    yield put(
      setErrorFunc({
        status: "0",
        message: "Сервер не работает, попробуйте позже",
        action: action,
      })
    );
  }
  if (error && error.code !== "ERR_NETWORK") {
    const errorData = {
      status: error.response.status,
      message: error.response.data.non_field_errors[0],
      action: action,
    };

    yield put(setErrorFunc(errorData));
  }
}
