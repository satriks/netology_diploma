import React, { useEffect } from "react";
import "./AdminPanel.scss";
import UserCard from "./Items/UserItem";
import { useAppDispatch, useAppSelector } from "../../models/hooks";
import { get_users } from "../../redux/MainSlice";
import FIleItemAdmin from "./Items/FIleItemAdmin";
import UserInfo from "./UserInfo";
import ChangeFileForm from "../Files/ChangeFileForm/ChangeFileForm";
import Louder from "../Louder/Louder";
import ErrorForm from "../Messages/ErrorForm";
import ErrorMessage from "../Messages/ErrorMessage";

type Props = {};

export default function AdminPanel({}: Props) {
  const errorUserData = useAppSelector(
    (state) => state.errorsGet.adminUserData
  );
  const error = useAppSelector((state) => state.error);

  const errorUsers = useAppSelector((state) => state.errorsGet.adminUsers);
  const adminPanel = useAppSelector((state) => state.adminPanel);
  const isChangeFile = useAppSelector((state) => state.isChangeFile);
  const loading = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(get_users());
  }, []);

  return (
    <div className="admin__wrapper">
      <div className="admin__users">
        {errorUsers && <ErrorForm data={errorUsers} />}
        <div>
          {/* <Louder /> */}
          <h2>Пользователи: </h2>
          {adminPanel.users &&
            adminPanel.users.map((el) => <UserCard key={el.id} user={el} />)}
        </div>
      </div>
      <div className="admin__info">
        {errorUserData && <ErrorForm data={errorUserData} />}
        {loading.adminUserData ? <Louder /> : <UserInfo />}
        {error && !isChangeFile.isActive && (
          <ErrorMessage message={error.message} />
        )}
        <div className="admin_userInfo">
          {/* {<ErrorForm data={"какой то текст "} />} */}
          {/* {loading.adminUserData ? <Louder /> : <UserInfo />} */}
          {/* <h2>Данные аккаунта:</h2> */}
        </div>
        {loading.adminUserData ? null : (
          <div className="admin__files">
            {/* {<ErrorForm data={"какой то текст "} />} */}

            <h2>Список файлов:</h2>
            {adminPanel.currentUser &&
              adminPanel.currentUser.files.map((file) => (
                <FIleItemAdmin key={file.id + file.name} data={file} />
              ))}
          </div>
        )}
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
