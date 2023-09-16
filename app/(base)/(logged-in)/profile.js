import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { COLORS } from "../../../constants/theme";
import { FBAUTH } from "../../../firebaseConfig";
import useUser from "../../../context/useUser";

const profile = () => {
  const router = useRouter();
  const auth = FBAUTH;
  const { userData, setUserData } = useUser();
  const [data, setData] = useState(null);

  const glob = useGlobalSearchParams();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData(null);
        router.push("/login");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };

  useEffect(() => {
    console.log(userData);
  }, []);

  return (
    <SafeAreaView>
      <Text>profile</Text>
      {/* <Image source={{ uri: userData.photoURL }} /> */}
      <Button
        buttonStyle={{
          borderColor: COLORS.c3,
          borderWidth: 2,
          width: "75%",
          alignSelf: "center",
          borderRadius: "10%",
        }}
        titleStyle={{ color: COLORS.c4 }}
        title="Sign Out"
        type="outline"
        onPress={handleSignOut}
      />
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({});
