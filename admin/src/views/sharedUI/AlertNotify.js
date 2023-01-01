import Swal from "sweetalert2";

export const AlertNotify = (props) => {
  const notification = (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  notification(props.title, props.text);
};
