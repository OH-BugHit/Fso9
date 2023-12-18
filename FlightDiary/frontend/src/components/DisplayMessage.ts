import { NotifyMessage } from "../types";

interface PropTypes {
  notifyMessage: NotifyMessage;
  setNotifyMessage: React.Dispatch<React.SetStateAction<NotifyMessage>>;
}

const DisplayMessage = ({ notifyMessage, setNotifyMessage }: PropTypes) => {
  setNotifyMessage({
    message: `${notifyMessage.message}`,
    messageType: `${notifyMessage.messageType}`,
    length: notifyMessage.length,
  });
  setTimeout(() => {
    setNotifyMessage({
      message: "",
      messageType: "success",
      length: 0,
    });
  }, notifyMessage.length);
};

export default DisplayMessage;
