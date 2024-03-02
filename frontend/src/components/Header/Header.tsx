import React from "react";
import "./Header.scss";
import logo from "../../assets/logo.png";
import cloudy from "../../assets/cloudy.png";
import DropMenu from "./DropMenu/DropMenu";

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
          <img className="avatar" src="#"></img>
        </div>
        <div className="page">
          <DropMenu />
        </div>
      </div>
    </div>
  );
}
