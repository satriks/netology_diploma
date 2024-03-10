import fileLogo from "../../../assets/file.png";
import addFileLogo from "../../../assets/addFile.png";
import "./FIleItem.scss";
import File_data from "../../../models/models";
import DropFileMenu from "../DropFileMenu/DropFileMenu";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../models/hooks";
import { setLastDropOn } from "../../../redux/MainSlice";

type Props = {
  data: File_data | { file: "add"; name: "Добавить файл"; id: 0 };
};

export default function FileItem({ data }: Props) {
  let file_url = ["png", "jpg", "jpeg"].includes(data.file.split(".")[1])
    ? data.file
    : fileLogo;
  if (data.file === "add") {
    //TODO обрезать фон на картинке сделать png
    file_url = addFileLogo;
  }

  const dispatch = useAppDispatch();
  const lastDropOn = useAppSelector((state) => state.lastDropOn);

  return (
    <div className="file-item" onClick={clickFile} onContextMenu={clickFile}>
      <img src={file_url} alt="" />
      <span>{data.name}</span>
      {lastDropOn == data.id && <DropFileMenu data={data} />}
    </div>
  );

  function clickFile(e) {
    e.preventDefault();
    if (data.file === "add") {
      console.log(42);
    } else {
      lastDropOn == data.id
        ? dispatch(setLastDropOn(null))
        : dispatch(setLastDropOn(data.id));
    }
    //active drop menu
  }
}
