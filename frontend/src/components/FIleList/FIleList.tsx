import React from "react";
import FileItem from "../FileItem/FileItem";
import "./FIleList.scss";

type Props = {};

export default function FileList({}: Props) {
  const list = [1, 2, 3, 4, 5];
  return (
    <div className="file-list">
      {list.map((el) => (
        <FileItem />
      ))}
    </div>
  );
}
