import { useRouter } from "next/navigation";
import { getToken } from "../utils/token";
import {
  DANGER_COLOR,
  HOME_PATH,
  LOGIN_PATH,
  queryClient,
  SUCCESS_COLOR,
} from "../utils/constants";
import { notifications } from "@mantine/notifications";
import React from "react";
import { threadsKey } from "../api-hooks/threads/query";

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

    queryClient.invalidateQueries();
  }

  // React.useEffect(() => {
  //   checkLogin();
  // }, []);

  function isLogin() {
    const token = getToken();
    if (!token) {
      return notifications.show({
        title: "FAIL",
        message: "Please login first!",
        position: "top-right",
        autoClose: 5000,
        color: DANGER_COLOR,
      });
    }
  }

  return {
    checkLogin,
    handleLogout,
    isLogin,
  };
}
