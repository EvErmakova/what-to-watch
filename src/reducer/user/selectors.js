import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isLogin;
};

export const getUser = (state) => {
  return state[NAME_SPACE].user;
};
