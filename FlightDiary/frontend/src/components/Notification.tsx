import { NotifyMessage } from "../types";

const Notification = ({ message }: { message: NotifyMessage }) => {
  if (message.message === "") return null;
  return <div className={message.messageType}>{message.message}</div>;
};

export default Notification;
