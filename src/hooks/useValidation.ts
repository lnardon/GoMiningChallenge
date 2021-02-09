import { useHistory } from "react-router-dom";

export default function useValidation() {
  const history = useHistory();
  if (!localStorage.getItem("@jwt")) {
    history.push("/");
  } else {
    if (window.location.pathname !== "/dashboard") {
      history.push("/dashboard");
    }
  }
}
