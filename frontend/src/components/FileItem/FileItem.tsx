import React from "react";
import fileLogo from "../../assets/file.png";
import "./FIleItem.scss";

type Props = {};

export default function FileItem({}: Props) {
  return (
    <div className="file-item">
      <img src={fileLogo} alt="" />
      <span> title file</span>
    </div>
  );
}
