import { useRef } from "react";
import { useAppDispatch } from "../../../models/hooks";
import File_data from "../../../models/models";
import {
  del_files,
  setIsChangeFile,
  setIsShareFile,
} from "../../../redux/MainSlice";
import "./DropFIleMenu.scss";

type Props = { data: File_data };

export default function DropFileMenu({ data }: Props) {
  const dispatch = useAppDispatch();
  const baseURL = import.meta.env.VITE_HOST || "http://localhost:8000/";
  const link = baseURL + "download/" + data.linkUiid;

  return (
    <div className="drop-file-menu">
      <ul>
        <li onClick={updatelFile}>Переименовать</li>
        <li onClick={shareFile}>Поделиться</li>
        <li>
          <a
            className="download"
            href={link}
            download={data.name}
            target="_blank"
          >
            Скачать файл
          </a>
        </li>
        <li onClick={delFile}>Удалить файл</li>
        {/* <li>Добавить файл</li> */}
      </ul>
    </div>
  );

  function delFile() {
    dispatch(del_files(data.id));
  }
  function updatelFile() {
    console.log("update");

    const dataInfo = {
      name: data.name,
      description: data.description,
      id: data.id,
    };
    dispatch(setIsChangeFile(dataInfo));
  }
  function shareFile() {
    dispatch(setIsShareFile(data.linkUiid));
  }
}
