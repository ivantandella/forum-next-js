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

export type DetailThreadType = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  comments: {
    id: string;
    content: string;
    createdAt: string;
    owner: {
      id: string;
      name: string;
      avatar: string;
    };
    upVotesBy: string[];
    downVotesBy: string[];
  }[];
  upVotesBy: string[];
  downVotesBy: string[];
};
