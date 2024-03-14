import { useAppDispatch } from "../../../models/hooks";
import File_data from "../../../models/models";
import { del_files, setIsChangeFile } from "../../../redux/MainSlice";
import "./DropFIleMenu.scss";

type Props = { data: File_data };

export default function DropFileMenu({ data }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="drop-file-menu">
      <ul>
        <li onClick={updatelFile}>Переименовать</li>
        <li>Поделиться</li>
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
    //TODO сделать появление меню редактирования , может POPUP ?
    dispatch(setIsChangeFile(dataInfo));
  }
}
