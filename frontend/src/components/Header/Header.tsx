import "./Header.scss";
import logo from "../../assets/logo.png";
import cloudy from "../../assets/cloudy.png";
import DropMenu from "./DropMenu/DropMenu";
import avatarUnknown from "../../assets/avatar_unknown.png";
import { useAppDispatch, useAppSelector } from "../../models/hooks";
import { startAuthorization } from "../../redux/MainSlice";

type Props = {};

export default function Header({}: Props) {
  const isLogin = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();

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
          {isLogin ? (
            <DropMenu />
          ) : (
            <div
              className="header__login"
              onClick={() => {
                dispatch(startAuthorization());
              }}
            >
              Войти
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
