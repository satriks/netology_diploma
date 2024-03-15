import React from "react";
import "./ShareFileForm.scss";
import { useAppDispatch } from "../../../models/hooks";
import { setIsShareFile } from "../../../redux/MainSlice";

type Props = { uuid: string };

export default function ShareFileForm({ uuid }: Props) {
  const baseURL = import.meta.env.VITE_HOST || "http://localhost:8000/";
  const link = baseURL + "download/" + uuid;
  const dispatch = useAppDispatch();

  return (
    <div className="share-form__wrapper" onClick={closeShareFile}>
      <form className="share-form">
        <label>
          Ссылка для скачивания :
          <input value={link} />
        </label>
        <div className="share-form__control">
          <button onClick={handleCopy}>Скопировать</button>
          <button className="cancel" onClick={handleClose}>
            Закрыть
          </button>
        </div>
      </form>
    </div>
  );

  function closeShareFile(e) {
    if (e.target.className === "share-form__wrapper") {
      dispatch(setIsShareFile());
    }
  }
  function handleClose() {
    dispatch(setIsShareFile());
  }
  function handleCopy(e) {
    e.preventDefault();
    navigator.clipboard.writeText(link);
  }
}
