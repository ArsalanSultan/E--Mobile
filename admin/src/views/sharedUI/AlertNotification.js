import { Alert } from "react-bootstrap";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// react-bootstrap components

const AlertNotification = (props) => {
  return (
    <>
      <Alert variant={`${props.color}`}>
        <span>{props.notification}</span>
      </Alert>
    </>
  );
};

export default AlertNotification;
