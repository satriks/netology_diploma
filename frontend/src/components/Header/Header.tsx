import React from "react";
import "./Header.scss";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="header">
      <img src="#"></img>
      <input className="header__search" />
      <div className="header__menu">
        <div>user info</div>
        <div>menu</div>
      </div>
    </div>
  );
}
