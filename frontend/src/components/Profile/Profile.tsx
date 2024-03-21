import "./Profile.scss";
import avatarUnknown from "../../assets/avatar_unknown.png";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../models/hooks";
import { get_user_detail, update_user } from "../../redux/MainSlice";
import { useNavigate } from "react-router-dom";
import File_data, { ChangeUser } from "../../models/models";
import { sizeValidator, timeConverter } from "../../utils/utils";

//TODO Изменить вывод даты регистрации, Сделать удобочитаемый размер фалов
type Props = {};

export default function Profile({}: Props) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const naigate = useNavigate();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(" ");

  useEffect(() => {
    dispatch(get_user_detail());
  }, []);

  useEffect(() => {
    if (user) {
      setLastName(user?.last_name);
      setFirstName(user?.first_name);
      setEmail(user?.email);
    }
  }, [user]);

  return (
    <div className="profile__wrapper">
      <form className="profile" onSubmit={handleSubmit}>
        <h2>Данные профиля</h2>
        <img src={avatarUnknown} alt="" />
        <span> {user?.username}</span>
        <div className="profile__info">
          <label>
            Имя
            <input value={firstName} onChange={handleFirstNameChange} />
          </label>
          <label>
            Фамилия
            <input value={lastName} onChange={handleLastNameChange} />
          </label>
          <label>
            Дата регистрации
            <input
              value={user ? timeConverter(user.date_joined) : ""}
              disabled
            />
          </label>
          <label>
            Email
            <input value={email} onChange={handleEmailChange} />
          </label>
          <label>
            Сменить пароль :
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div className="profile__control">
          <button type="submit">Сохранить изменения </button>
          {/* <button className="cancel" onClick={handleClose}>
            Отмена
          </button> */}
        </div>
        <div className="profile__file__info">
          <label>
            Всего загружено :
            <input
              value={user ? sizeValidator(count_sizes(user.files)) : 0}
              disabled
            />
          </label>
          <label>
            Всего файлов :
            <input value={user?.files.length} disabled />
          </label>
        </div>
      </form>
    </div>
  );

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
  }
  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body: ChangeUser = {};

    if (user?.last_name != lastName) {
      body["last_name"] = lastName;
    }
    if (user?.first_name != firstName) {
      body["first_name"] = firstName;
    }
    if (user?.email != email) {
      body["email"] = email;
    }
    if (user?.last_name != lastName) {
      body["last_name"] = lastName;
    }
    if (password.trim()) {
      body["password"] = password;
    }
    console.log(body);
    if (user) {
      dispatch(
        update_user({
          body,
          id: user.id,
        })
      );
    }
  }

  function count_sizes(files: File_data[]) {
    let rez = 0;
    files.forEach((el) => (rez += el.size));
    return rez;
  }
}
