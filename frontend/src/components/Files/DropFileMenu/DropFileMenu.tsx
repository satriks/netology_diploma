import { useAppDispatch } from "../../../models/hooks";
import File_data from "../../../models/models";
import { del_files } from "../../../redux/MainSlice";
import "./DropFIleMenu.scss";

type Props = { data: File_data };

export default function DropFileMenu({ data }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="drop-file-menu">
      <ul>
        <li>Переименовать</li>
        <li onClick={updatelFile}>Поделиться</li>
        <li onClick={delFile}>Удалить файл</li>
        {/* <li>Добавить файл</li> */}
      </ul>
    </div>
  );

  function delFile() {
    dispatch(del_files(data.id));
  }
  function updatelFile() {
    //TODO сделать появление меню редактирования , может POPUP ?
    // dispatch(del_files(data.id));
  }
}
