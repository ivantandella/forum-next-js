export type ThreadType = {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: never[];
  downVotesBy: never[];
  totalComments: number;
};

export type GetThreadsResultType = {
  threads: ThreadType[];
};

export type CreateThreadInputType = {
  title: string;
  body: string;
  category: string;
};
