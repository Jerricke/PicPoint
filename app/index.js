import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useUser from "../context/useUser";
import { FBAUTH } from "../firebaseConfig";

function Index() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const { userData, setUserData } = useUser();
  const auth = FBAUTH;
  const [isLoading, setIsLoading] = useState(true);

  // RN async storage to get already launched status
  useEffect(() => {
    ReactNativeAsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        ReactNativeAsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      }
    });
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setUserData(user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  // Checks if it is the first launch, if so load onboarding page, otherwise direct straight to login page
  if (isFirstLaunch) {
    return <Redirect href="/onboardingPage" />;
  }
  if (!isLoading) {
    if (userData) {
      return <Redirect href="/(base)/(logged-in)/home" />;
    }
    return <Redirect href="/(base)/login" />;
  }

  return (
    <ActivityIndicator
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      size={100}
      color="red"
    />
  );
}

export default Index;
