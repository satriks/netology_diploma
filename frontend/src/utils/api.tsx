import axios from "axios";
import { ChangeUser } from "../models/models";
// import { OrderModel } from "../models/models";

const connect = axios.create({
  baseURL: import.meta.env.VITE_HOST || "http://localhost:8000/",
  // headers: {
  //   Authorization: "token" + "76c0f32a2b5663d6c5fd68d93d04748b5cb847c2",
  // },
});

//login or get token
export const loginApi = (username: string, password: string) => {
  return connect
    .post("api-token-auth/", { username, password })
    .then((response) => response.data); // получим токен и нужно обработку ошибок добавить
};
//logout
// Можно просто удалить токен и ианные из куов
// export const logoutApi = (username: string, password: string) => {
//   return connect
//     .post("api-token-auth/", { username, password })
//     .then((response) => response.data); // получим токен и нужно обработку ошибок добавить
// };
//TODO Надо ли или просто токен удалять, пока оставлю

// Далее все методы использовать вместе с токеном : "76c0f32a2b5663d6c5fd68d93d04748b5cb847c2"

//Registration user

// Обязательно username, password, еcли админ добавить is_staff = true.  TODO Надо сделать что бы почта прописывалась, Это в джанго
export const registrationApi = (
  username: string,
  password: string,
  email: string
) => {
  return connect
    .post("api/users/", { username, password, email })
    .then((response) => response.data); //
};

//Get users
export const getUsersApi = (token: string) => {
  return connect
    .get("api/users/", { headers: { Authorization: "token " + token } })
    .then((response) => response.data);
};
//Get user detail
export const getUserDetailApi = (token: string) => {
  return connect
    .get("api/users/detail", { headers: { Authorization: "token " + token } })
    .then((response) => response.data);
};

//Get user
export const GetUserApi = (token: string, id: number) => {
  return connect
    .get(`api/users/${id}/`, {
      headers: { Authorization: "token " + token },
    })
    .then((response) => response.data);
};
//Add user

//Del user

//Update user
export const UpdateUserApi = (token: string, body: ChangeUser, id: number) => {
  return connect
    .patch(`api/users/${id}/`, body, {
      headers: { Authorization: "token " + token },
    })
    .then((response) => response.data);
};
//Get files
export const getFilesApi = (token: string) => {
  return connect
    .get("api/files/", { headers: { Authorization: "token " + token } })
    .then((response) => response.data);
};
//Get file
// ?? Надо ли
//Add file
export const addFileApi = (
  token: string,
  body: { name: string; description?: string; file: File }
) => {
  const formData = new FormData();
  formData.append("name", body.name);
  body.description && formData.append("description", body.description);
  formData.append("file", body.file);

  return connect.post(`api/files/`, formData, {
    headers: {
      Authorization: "token " + token,
      "content-type": "multipart/form-data",
    },
  });
  // .then((response) => response.data);
};
//Delete file
export const deleteFileApi = (token: string, fileId: string | number) => {
  return connect.delete(`api/files/${fileId}/`, {
    headers: { Authorization: "token " + token },
  });
  // .then((response) => response.data);
};
//Update file
export const updateFileApi = (
  token: string,
  fileId: string | number,
  body: { name?: string; description?: string }
) => {
  return connect.patch(`api/files/${fileId}/`, body, {
    headers: { Authorization: "token " + token },
  });
  // .then((response) => response.data);
};
// ---------------------------------------------------------------

// export const getTopSalesApi = () => {
//   return connect.get("/top-sales").then((response) => response.data);
// };

// export const getCategoriesApi = () => {
//   return connect.get("/categories").then((response) => response.data);
// };

// export const getItemCategoryApi = (
//   id: string | number = 0,
//   offset: number = 0,
//   q: string = ""
// ) => {
//   return connect
//     .get("/items", { params: { categoryId: id, offset, q } })
//     .then((response) => response.data);
// };

// export const getItemDetailApi = (id: string | number) => {
//   return connect.get(`/items/${id}`).then((response) => response.data);
// };

// export const getOrderApi = (order: OrderModel) => {
//   return connect.post(`/order`, order);
// };
