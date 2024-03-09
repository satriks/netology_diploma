import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../models/hooks";
import { logout } from "../../../redux/MainSlice";

type Props = {};

export default function DropMenu({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <select
      onChange={(el) => {
        DropMenuNav(el.target);
      }}
    >
      <option value="Каталог">Каталог</option>
      <option value="Личный кабинет">Личный кабинет</option>
      <option value="Админ панель">Админ панель</option>;
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
        target.value = "Каталог";
        navigate("/");
        break;
      default:
        break;
    }
  }
}
