import axios from "axios";
import { CommentInputType, CreateThreadInputType } from "./model";
import { BASE_URL } from "../../utils/constants";
import { getToken } from "../../utils/token";
import { useMutation } from "@tanstack/react-query";

async function createThread(data: CreateThreadInputType) {
  const res = await axios.post(`${BASE_URL}/threads`, data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
}

async function createComment(data: CommentInputType, threadId: string) {
  const res = await axios.post(
    `${BASE_URL}/threads/${threadId}/comments`,
    data,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return res.data;
}

export function useCreateThread() {
  return useMutation({
    mutationFn: (data: CreateThreadInputType) => {
      return createThread(data);
    },
  });
}

export function useCreateComment(threadId: string) {
  return useMutation({
    mutationFn: (data: CommentInputType) => {
      return createComment(data, threadId);
    },
  });
}
