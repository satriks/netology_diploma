import "./ErrorMessage.scss";

type Props = { message: string };

export default function ErrorMessage({ message }: Props) {
  console.log("error message ");

  return (
    <div className="error__message__wrapper">
      <div>{message}</div>
    </div>
  );
}
