import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { LoginDataType, RegisterDataType } from "./model";
import { useMutation } from "@tanstack/react-query";

async function login(data: LoginDataType) {
  const res = await axios.post(`${BASE_URL}/login`, data);
  return res.data;
}

async function register(data: RegisterDataType) {
  const res = await axios.post(`${BASE_URL}/register`, data);
  return res.data;
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginDataType) => {
      return login(data);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterDataType) => {
      return register(data);
    },
  });
}
