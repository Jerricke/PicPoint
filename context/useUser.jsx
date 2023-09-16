import { onAuthStateChanged } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FBAUTH as auth, FBDB as db } from "../firebaseConfig";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [ping, setPing] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        const userRef = doc(db, "users", user.uid);

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
