import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { LoginDataType } from "./model";
import { useMutation } from "@tanstack/react-query";

async function login(data: LoginDataType) {
  const res = await axios.post(`${BASE_URL}/login`, data);
  return res.data;
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginDataType) => {
      return login(data);
    },
  });
}
