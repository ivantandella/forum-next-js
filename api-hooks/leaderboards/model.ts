export type LeaderboardsResultType = {
  leaderboards: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
    score: number;
  }[];
};

export type LeaderboardType = {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  score: number;
};
