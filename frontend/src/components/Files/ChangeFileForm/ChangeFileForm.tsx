import React, { ChangeEvent, FormEvent, useState } from "react";
import { update_file } from "../../../redux/MainSlice";
import { useAppDispatch } from "../../../models/hooks";

type Props = {};

export default function ChangeFileForm({}: Props) {
  const [fileName, setFileName] = useState<string>("");
  const [fileDescription, setFileDescription] = useState<string>("");
  const dispatch = useAppDispatch();

  return (
    <div className="change-form__wrapper">
      <form className="change-form" onSubmit={submitForm}>
        <label>
          Название
          <input value={fileName} onChange={handleFileNameChange}></input>
        </label>
        <label>
          Описание
          <textarea
            value={fileDescription}
            onChange={handleFileDescriptionChange}
          ></textarea>
        </label>
        <div className="change-form__control">
          <button type="submit">Сохранить</button>
          <button className="cancel" onClick={handleClose}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );

  function submitForm(evt: FormEvent) {
    evt.preventDefault();

    const changeData = {
      name: fileName,
      description: fileDescription,
    };
    dispatch(update_file(changeData));

    setFileName("");
    setFileDescription("");
  }

  function handleFileNameChange(e: ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.value);
  }
  function handleFileDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setFileDescription(e.target.value);
  }
  function handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(e);
    const target = e.target as HTMLElement;
    (target.parentNode as HTMLFormElement).remove();

    // dispatch(setIsSendFile());
  }
}
