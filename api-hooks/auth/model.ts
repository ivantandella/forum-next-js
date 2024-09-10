export type LoginDataType = {
  email: string;
  password: string;
};

export type LoginResultType = {
  token: string;
};

export type RegisterDataType = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResultType = {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
};

export type GetMeResultType = {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
};

export type GetAllUsersResultType = {
  users: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  }[];
};
