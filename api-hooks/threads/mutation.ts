import axios from "axios";
import { CommentInputType, CreateThreadInputType, VoteTypeEnum } from "./model";
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

async function voteThread(threadId: string, action: VoteTypeEnum) {
  const res = await axios.post(
    `${BASE_URL}/threads/${threadId}/${action}`,
    {},
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

export function useVoteThread(threadId: string) {
  return useMutation({
    mutationFn: (action: VoteTypeEnum) => {
      return voteThread(threadId, action);
    },
  });
}
