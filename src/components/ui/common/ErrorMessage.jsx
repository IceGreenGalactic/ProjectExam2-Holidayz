import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (message, type = "error") => {
  console.log(`Toast triggered with message: ${message}`);
  toast(message, {
    type,
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
};
