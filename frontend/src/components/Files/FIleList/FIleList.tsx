import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../models/hooks";
import FileItem from "../FileItem/FileItem";
import "./FIleList.scss";
import {
  get_files,
  setIsSendFile,
  setLastDropOn,
} from "../../../redux/MainSlice";
import AddNewFile from "../AddNewFileForm/AddNewFile";

type Props = {};

export default function FileList({}: Props) {
  const isLogin = useAppSelector((state) => state.token);
  const files = useAppSelector((state) => state.files);
  const isSendFile = useAppSelector((state) => state.isSendFile);
  const [isDragging, setIsDragging] = useState(false);
  const [dragFile, setDragFIle] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogin) {
      dispatch(get_files());
    }
  }, [isLogin]);
  return (
    <div
      className={`container ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={`file-list `}
        onClick={() => dispatch(setLastDropOn(null))}
      >
        {files.map((el) => (
          <FileItem key={el.id} data={el} />
        ))}
        <FileItem
          key={"add"}
          data={{ file: "add", name: "Добавить файл", id: 0 }}
        />
      </div>
      {isSendFile && <AddNewFile file={dragFile} setDragFile={setDragFIle} />}
    </div>
  );

  function handleDragEnter(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    console.log(file);

    setDragFIle(file);
    dispatch(setIsSendFile());

    // Upload files to the server
    // onFileUpload(files);
  }
}
