import "./Header.scss";
import logo from "../../assets/logo.png";
import cloudy from "../../assets/cloudy.png";
import DropMenu from "./DropMenu/DropMenu";
import avatarUnknown from "../../assets/avatar_unknown.png";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="header">
      <img className="header-logo" src={logo}></img>
      <img src={cloudy}></img>
      <img src={cloudy}></img>
      <img src={cloudy}></img>
      <div className="header__menu">
        <div>
          <img className="avatar" src={avatarUnknown}></img>
        </div>
        <div className="page">
          <DropMenu />
        </div>
      </div>
    </div>
  );
}
