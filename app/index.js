import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

function Index() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // RN async storage to get already launched status
  useEffect(() => {
    ReactNativeAsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        ReactNativeAsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      }
    });
  }, []);

  // Checks if it is the first launch, if so load onboarding page, otherwise direct straight to login page
  if (isFirstLaunch) {
    return <Redirect href="/onboardingPage" />;
  }
  return <Redirect href="/(base)/login" />;
}

export default Index;
