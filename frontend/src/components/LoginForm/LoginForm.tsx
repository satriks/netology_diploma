import { useState } from "react";
import "./LoginForm.scss";
import { useAppDispatch } from "../../models/hooks";
import { getToken } from "../../redux/MainSlice";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    dispatch(getToken({ username, password }));

    // Reset form fields
    setUsername("");
    setPassword("");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Авторизация</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <br />
      <div className="login-form__btns">
        <button type="submit">Войти</button>
        <button className="cancel">Отмена</button>
      </div>
      <span>
        Если у вас нет аккаунта вы можете{" "}
        <b
          onClick={(e) => {
            onLogin(true);
          }}
        >
          Зарегестрироваться
        </b>
      </span>
    </form>
  );
}
