import fileLogo from "../../../assets/file.png";
import addFileLogo from "../../../assets/addFile2.png";
import "./FIleItem.scss";
import File_data from "../../../models/models";
import DropFileMenu from "../DropFileMenu/DropFileMenu";
import { useState } from "react";
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

  return (
    <div className="file-item" onClick={clickFile} onContextMenu={clickFile}>
      <img src={file_url} alt="" />
      <span>{data.name}</span>
      {lastDropOn == data.id && <DropFileMenu data={data} />}
    </div>
  );

  function clickFile(e) {
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
