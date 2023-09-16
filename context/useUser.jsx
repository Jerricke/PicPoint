import { useContext, createContext, useState, useEffect } from "react";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
