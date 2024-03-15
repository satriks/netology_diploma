import fileLogo from "../../../assets/file.png";
import addFileLogo from "../../../assets/addFile2.png";
import "./FIleItem.scss";
import File_data from "../../../models/models";
import DropFileMenu from "../DropFileMenu/DropFileMenu";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../models/hooks";
import { setIsSendFile, setLastDropOn } from "../../../redux/MainSlice";
import ChangeFileForm from "../ChangeFileForm/ChangeFileForm";

type Props = {
  data: File_data | { file: "add"; name: "Добавить файл"; id: 0 };
};

export default function FileItem({ data }: Props) {
  let file_url = ["png", "jpg", "jpeg"].includes(data.file.split(".")[1])
    ? data.file
    : fileLogo;
  if (data.file === "add") {
    file_url = addFileLogo;
  }

  const dispatch = useAppDispatch();
  const lastDropOn = useAppSelector((state) => state.lastDropOn);
  const baseURL = import.meta.env.VITE_HOST || "http://localhost:8000/";
  const link = baseURL + "download/" + data.linkUiid;
  const downloadLink = useRef(null);

  return (
    <div className="file-item" onClick={clickFile} onContextMenu={clickFile}>
      <img src={file_url} alt="" />
      <span>{data.name}</span>
      {lastDropOn == data.id && <DropFileMenu data={data} />}
      <a
        hidden={true}
        href={link}
        download={link}
        ref={downloadLink}
        target="_blank"
      />
    </div>
  );

  function clickFile(e) {
    if (e.target.className === "download") {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    // if (e.target.tagName == "LI") {
    //   console.log(17);
    //   return;
    // }
    if (data.file === "add") {
      dispatch(setIsSendFile());
    } else {
      lastDropOn == data.id
        ? dispatch(setLastDropOn(null))
        : dispatch(setLastDropOn(data.id));
    }
    //active drop menu
  }
}
