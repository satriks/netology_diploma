import React from "react";
import avatarUnknown from "../../../assets/avatar_unknown.png";
import "./UserItem.scss";
import { User } from "../../../models/models";
import { useAppDispatch, useAppSelector } from "../../../models/hooks";
import { clearCurrentUser, get_user_data } from "../../../redux/MainSlice";

type Props = { user: User };

export default function UserItem({ user }: Props) {
  const currentUser = useAppSelector((state) => state.adminPanel.currentUser);
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={setAciveUser}
      className={
        currentUser?.id == user.id ? "admin__user active" : "admin__user"
      }
    >
      <img src={avatarUnknown} alt="" />
      <span>{user.username}</span>
    </div>
  );

  function setAciveUser() {
    console.log(45);
    console.log(currentUser);
    if (currentUser?.id == user.id) {
      dispatch(clearCurrentUser());
      //TODO убрать юзера из выбранных
      return;
    }
    dispatch(get_user_data(user.id));
  }
}