import { useRouter } from "next/navigation";
import { getToken } from "../utils/token";
import {
  DANGER_COLOR,
  HOME_PATH,
  LOGIN_PATH,
  SUCCESS_COLOR,
} from "../utils/constants";
import { notifications } from "@mantine/notifications";

export function useAuth() {
  const { push } = useRouter();

  function checkLogin() {
    const token = getToken();
    if (!token) {
      push(LOGIN_PATH);

      notifications.show({
        title: "FAIL",
        message: "Please login first!",
        position: "top-right",
        autoClose: 5000,
        color: DANGER_COLOR,
      });
    } else {
      return token;
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    push(HOME_PATH);

    notifications.show({
      title: "SUCCESS",
      message: "You are logged out",
      position: "top-right",
      autoClose: 5000,
      color: SUCCESS_COLOR,
    });
  }

  return {
    checkLogin,
    handleLogout,
  };
}
