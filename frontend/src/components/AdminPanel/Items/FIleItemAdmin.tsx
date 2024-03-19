import React from "react";
import File_data from "../../../models/models";
import { sizeValidator, timeConverter } from "../../../utils/utils";
import "./FIleItemAdmin.scss";
import { useAppDispatch, useAppSelector } from "../../../models/hooks";
import { del_files, setIsChangeFile } from "../../../redux/MainSlice";
import ChangeFileForm from "../../Files/ChangeFileForm/ChangeFileForm";

type Props = { data: File_data };

export default function FIleItemAdmin({ data }: Props) {
  // const file = data;
  const dispatch = useAppDispatch();
  // const isChangeFile = useAppSelector((state) => state.isChangeFile);
  return (
    <div className="admin__fileItem">
      <span>{"Название : " + data.name + ", "}</span>
      <span>{"Размер файла : " + sizeValidator(data.size) + ","}</span>
      <span>{"Скачан : " + data.download_counter + ","}</span>
      <span>{"Последнее скачивание : " + timeConverter(data.download_at)}</span>
      <div className="fileItem__control">
        <button className="redact" onClick={updatelFile}>
          ✏
        </button>
        <button className="del" onClick={delFile}>
          ❌
        </button>
      </div>
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
}
