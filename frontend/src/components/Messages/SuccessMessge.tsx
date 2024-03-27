import "./SuccessMessge.scss";

type Props = { message: string };

export default function SuccessMessage({ message }: Props) {
  console.log("error message ");

  return (
    <div className="success__message__wrapper">
      <div>{message}</div>
    </div>
  );
}
