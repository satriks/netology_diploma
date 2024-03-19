export default interface File_data {
  created_at: string;
  description: string;
  file: string;
  id: number;
  name: string;
  size: number;
  user: number;
  linkUiid: string;
  download_counter: number;
  download_at: string;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  files: File_data[];
  date_joined: string;
}

export interface ChangeUser {
  first_name?: string;
  last_name?: string;
  email?: string;
  is_staff?: boolean;
  password?: string;
}

// export interface File {
//   created_at: "2024-03-17T21:36:23.469268Z";
//   description: "файл с картинкой осени";
//   download_counter: 2;
//   file: "http://localhost:8000/media/1/%D0%9E%D1%81%D0%B5%D0%BD%D1%8C.jpeg";
//   id: 1;
//   linkUiid: "3f9c5c70-0dcb-4fac-9eac-7899f82c7898";
//   name: "Осень";
//   size: 167775;
//   user: 1;
// }
