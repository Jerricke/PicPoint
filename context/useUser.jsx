import { onAuthStateChanged } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FBAUTH as auth, FBDB as db } from "../firebaseConfig";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [userData, setUserData] = useState(null);

  const [ping, setPing] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setUserProfile(user);
        fetchUserData(user.uid);
      }
    });
  }, [ping]);

  async function fetchUserData(uid) {
    const docRef = doc(db, "users", uid);
    const fetchData = await getDoc(docRef)
      .then((res) => setUserData(res.data()))
      .catch((err) => alert(err));
  }

  return (
    <UserContext.Provider
      value={{ userProfile, setUserProfile, setPing, userData }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
