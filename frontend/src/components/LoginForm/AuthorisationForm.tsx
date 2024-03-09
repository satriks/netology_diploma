import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import "./AuthorisationForm.scss";

type Props = {};

export default function AuthorisationForm({}: Props) {
  const [login, setLogin] = useState(false);

  return (
    <div className="authorization__wrapper">
      {login ? (
        <RegistrationForm onLogin={setLogin} />
      ) : (
        <LoginForm onLogin={setLogin} />
      )}
    </div>
  );
}
