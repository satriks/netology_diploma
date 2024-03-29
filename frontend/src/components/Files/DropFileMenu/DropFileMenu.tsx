import { useState } from "react";
import { useAppDispatch } from "../../../models/hooks";
import File_data from "../../../models/models";
import {
  del_files,
  setIsChangeFile,
  setIsShareFile,
} from "../../../redux/MainSlice";
import "./DropFIleMenu.scss";
import { sizeValidator, timeConverter } from "../../../utils/utils";

type Props = { data: File_data; side: boolean };

export default function DropFileMenu({ data, side }: Props) {
  const dispatch = useAppDispatch();
  const baseURL = import.meta.env.VITE_HOST || "http://localhost:8000/";
  const link = baseURL + "download/" + data.linkUiid;
  const [detailFIle, setDetailFile] = useState(false);

  return (
    <div className={side ? "drop-file-menu left" : "drop-file-menu"}>
      <ul>
        <li className="file__info" onClick={fileInfo}>
          Информация
        </li>
        <li onClick={updateFile}>Переименовать</li>
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
      </ul>
      {detailFIle && (
        <div className="detail">
          Информация о файле :
          <span>{"Дата создания : " + timeConverter(data.created_at)}</span>
          <span>
            {"Последнее скачивание: " + timeConverter(data.download_at)}
          </span>
          <span>{"Скачан : " + data.download_counter + " раз(а)"}</span>
          <span>{"Размер : " + sizeValidator(data.size)}</span>
          <span>{"Описание : " + data.description} </span>
        </div>
      )}
    </div>
  );

  function delFile() {
    dispatch(del_files(data.id));
  }
  function fileInfo(e: React.MouseEvent) {
    e.preventDefault();
    setDetailFile(!detailFIle);
  }
  function updateFile() {
    console.log("update");

    const dataInfo = {
      name: data.name,
      description: data.description,
      id: String(data.id),
    };
    dispatch(setIsChangeFile(dataInfo));
  }
  function shareFile() {
    dispatch(setIsShareFile(data.linkUiid));
  }
}
