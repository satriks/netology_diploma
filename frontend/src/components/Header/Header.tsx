import "./Header.scss";
import logo from "../../assets/logo.png";
import cloudy from "../../assets/cloudy.png";
import DropMenu from "./DropMenu/DropMenu";
import avatarUnknown from "../../assets/avatar_unknown.png";
import { useAppSelector } from "../../models/hooks";

type Props = {};

export default function Header({}: Props) {
  const isLogin = useAppSelector((state) => state.token);
  return (
    <div className="header">
      <img className="header-logo" src={logo}></img>
      <img src={cloudy}></img>
      <img src={cloudy}></img>
      <img src={cloudy}></img>
      <div className="header__menu">
        <div>
          <img
            className="avatar"
            src={avatarUnknown}
            style={isLogin && { backgroundColor: "green" }}
          ></img>
        </div>
        <div className="page">
          <DropMenu />
        </div>
      </div>
    </div>
  );
}
