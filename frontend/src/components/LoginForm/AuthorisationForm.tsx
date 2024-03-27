import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import "./AuthorisationForm.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../models/hooks";
import SuccessMessage from "../Messages/SuccessMessge";

type Props = {};

export default function AuthorisationForm({}: Props) {
  // const infoMessage = useAppSelector((state) => state.infoMessage);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <div className="authorization__wrapper">
      {/* {infoMessage && <SuccessMessage message={infoMessage} />} */}
      {login ? (
        <RegistrationForm onLogin={setLogin} />
      ) : (
        <LoginForm onLogin={setLogin} />
      )}
    </div>
  );
}
