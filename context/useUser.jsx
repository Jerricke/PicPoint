import { onAuthStateChanged } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { FBAUTH as auth } from "../firebaseConfig";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [ping, setPing] = useState(null);

  useEffect(() => {
    console.log("pinged");
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setUserData(user);
      }
    });
  }, [ping]);

  return (
    <UserContext.Provider value={{ userData, setUserData, setPing }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
