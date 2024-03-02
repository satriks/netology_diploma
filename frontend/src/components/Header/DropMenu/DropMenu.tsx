import React from "react";

type Props = {};

export default function DropMenu({}: Props) {
  return (
    <select>
      <option value="Каталог">Каталог</option>;
      <option value="Личный кабинет">Личный кабинет</option>;
      <option value="Админ панель">Админ панель</option>;
    </select>
  );
}
