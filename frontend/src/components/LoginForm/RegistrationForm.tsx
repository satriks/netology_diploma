import { useState } from "react";
import "./RegistrationForm.scss";
import { useAppDispatch } from "../../models/hooks";
import { registration } from "../../redux/MainSlice";

export default function RegistrationForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    dispatch(registration({ username, password, email }));
    onLogin(false);
    // Reset form fields
    setUsername("");
    setPassword("");
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
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
        <button type="submit">Регистрация</button>
        <button className="cancel">Отмена</button>
      </div>
      <span>
        Если у вас уже есть аккаунт вы можете{" "}
        <b onClick={() => onLogin(false)}>Авторизоваться</b>
      </span>
    </form>
  );
}
