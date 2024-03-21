import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../models/hooks";
import { clearUserToken, get_files, logout } from "../../../redux/MainSlice";

type Props = {};

export default function DropMenu({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return (
    <select
      onChange={(el) => {
        DropMenuNav(el.target);
      }}
    >
      <option value="Каталог">Каталог</option>
      <option value="Личный кабинет">Личный кабинет</option>
      {user?.is_staff && <option value="Админ панель">Админ панель</option>}
      <option value="Выход">Выход</option>;
    </select>
  );

  function DropMenuNav(target) {
    const name = target.value;

    switch (name) {
      case "Каталог":
        navigate("/");
        break;
      case "Личный кабинет":
        navigate("/profile");
        break;
      case "Админ панель":
        navigate("/admin");
        break;
      case "Выход":
        //Сделать выход
        dispatch(logout());
        dispatch(clearUserToken());
        dispatch(get_files());
        target.value = "Каталог";
        navigate("/");
        break;
      default:
        break;
    }
  }
}
