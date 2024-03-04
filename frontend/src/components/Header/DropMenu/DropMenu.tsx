import { useNavigate } from "react-router-dom";

type Props = {};

export default function DropMenu({}: Props) {
  const navigate = useNavigate();

  return (
    <select
      onChange={(el) => {
        DropMenuNav(el.target.value);
      }}
    >
      <option value="Каталог">Каталог</option>
      <option value="Личный кабинет">Личный кабинет</option>
      <option value="Админ панель">Админ панель</option>;
    </select>
  );

  function DropMenuNav(name: string) {
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
      default:
        break;
    }
  }
}
