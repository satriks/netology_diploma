import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../models/hooks";
import FileItem from "../FileItem/FileItem";
import "./FIleList.scss";
import { get_files } from "../../../redux/MainSlice";

type Props = {};

export default function FileList({}: Props) {
  const isLogin = useAppSelector((state) => state.token);
  const files = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogin) {
      dispatch(get_files());
    }
  }, [isLogin]);
  const list = [1, 2, 3, 4, 5];
  return (
    <div className="container">
      <div className="file-list">
        {files.map((el) => (
          <FileItem key={el.id} data={el} />
        ))}
        <FileItem
          key={"add"}
          data={{ file: "add", name: "Добавить файл", id: 0 }}
        />
      </div>
    </div>
  );
}
