import React, { Dispatch, SetStateAction } from "react";
import { IUser } from "../utils/userDB";
import { getUserData } from "../utils/userDB";

interface IContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

const defUser = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
};

const defContext = {
  isAuth: false,
  user: defUser,
  favs: [],
  setIsAuth: () => {},
  setUser: () => {},
};

const Context = React.createContext<IContext>(defContext);

export const MainContext: React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [user, setUser] = React.useState(defUser);

  React.useEffect(() => {
    getUserData()
      .then((data) => {
        if (data) {
          setUser(data);
          setIsAuth(true);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Context.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export { Context as mainContext };
