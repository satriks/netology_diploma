import { useState } from "react";
import "./RegistrationForm.scss";
import { useAppDispatch } from "../../models/hooks";
import { endAuthorization, registration } from "../../redux/MainSlice";

type Props = { onLogin: React.Dispatch<React.SetStateAction<boolean>> };

export default function RegistrationForm({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

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
        <button className="cancel" onClick={handleCancel}>
          Отмена
        </button>
      </div>
      <span>
        Если у вас уже есть аккаунт вы можете{" "}
        <b onClick={() => onLogin(false)}>Авторизоваться</b>
      </span>
    </form>
  );

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(endAuthorization());
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Add your login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    dispatch(registration({ username, password, email }));
    onLogin(false);
    // Reset form fields
    setUsername("");
    setPassword("");
  }
}
