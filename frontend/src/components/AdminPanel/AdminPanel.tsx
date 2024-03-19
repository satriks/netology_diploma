import React, { useEffect } from "react";
import "./AdminPanel.scss";
import UserCard from "./Items/UserItem";
import { useAppDispatch, useAppSelector } from "../../models/hooks";
import { get_users } from "../../redux/MainSlice";
import FIleItemAdmin from "./Items/FIleItemAdmin";
import UserInfo from "./UserInfo";
import ChangeFileForm from "../Files/ChangeFileForm/ChangeFileForm";

type Props = {};

export default function AdminPanel({}: Props) {
  const adminPanel = useAppSelector((state) => state.adminPanel);
  const isChangeFile = useAppSelector((state) => state.isChangeFile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(get_users());
  }, []);

  return (
    <div className="admin__wrapper">
      <div className="admin__users">
        <div>
          <h2>Пользователи: </h2>
          {adminPanel.users &&
            adminPanel.users.map((el) => <UserCard key={el.id} user={el} />)}
        </div>
      </div>
      <div className="admin__info">
        <div className="admin_userInfo">
          {/* <h2>Данные аккаунта:</h2> */}
          <UserInfo />
        </div>
        <div className="admin__files">
          <h2>Список файлов:</h2>
          {adminPanel.currentUser &&
            adminPanel.currentUser.files.map((file) => (
              <FIleItemAdmin key={file.id + file.name} data={file} />
            ))}
        </div>
      </div>
      {isChangeFile.isActive && (
        <ChangeFileForm
          name={isChangeFile.name}
          desc={isChangeFile.description}
        />
      )}
    </div>
  );
}
