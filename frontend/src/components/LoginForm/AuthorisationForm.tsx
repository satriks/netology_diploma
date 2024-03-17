import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import "./AuthorisationForm.scss";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function AuthorisationForm({}: Props) {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
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
