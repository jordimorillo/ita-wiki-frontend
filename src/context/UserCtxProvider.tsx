import { FC, ReactNode } from "react";

import { useUser } from "../hooks/useUser";
import CtxUser, { PropsContext } from ".";

interface Props {
  children: ReactNode;
}

const UserCtxProvider: FC<Props> = ({ children }) => {
  const value = { ...useUser() } as PropsContext;
  return <CtxUser.Provider value={value}>{children}</CtxUser.Provider>;
};

export default UserCtxProvider;
