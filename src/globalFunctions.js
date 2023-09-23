import Swal from "sweetalert2";

export const genericAlert = (message, icon) => {
  Swal.fire({
    title: message,
    icon: icon,
    showConfirmButton: true,
    confirmButtonText: "OK",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });
};
