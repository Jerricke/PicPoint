import { Image, StyleSheet, Text, View, Animated, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { Avatar, IconButton } from "react-native-paper";
import { setDoc, doc } from "firebase/firestore";
import { COLORS, SIZES } from "../../../constants/theme";
import { FBAUTH, FBDB } from "../../../firebaseConfig";
import DisplayCard from "../../../components/profile/displayCard";
import DisplayBio from "../../../components/profile/displayBio";
import useUser from "../../../context/useUser";
import BioEditor from "../../../components/profile/bioEditor";

const profile = () => {
  const router = useRouter();
  const auth = FBAUTH;
  const { userProfile, setUserProfile, setPing, userData } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [bioText, setBioText] = useState(userData?.bio);
  const [data, setData] = useState(null);

  const breathing = useRef(new Animated.Value(0.9)).current;
  const breathing2 = useRef(new Animated.Value(1.05)).current;

  const handleSignOut = () => {
    setPing(null);
    signOut(auth)
      .then(() => {
        setUserProfile(null);
        router.push("/login");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(breathing, {
            toValue: 1.1,
            duration: 5000,
            Easing: Easing.inOut,
            useNativeDriver: true,
          }),
          Animated.timing(breathing, {
            toValue: 0.9,
            duration: 3000,
            Easing: Easing.inOut,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(breathing2, {
            toValue: 0.75,
            duration: 7000,
            Easing: Easing.out,
            useNativeDriver: true,
          }),
          Animated.timing(breathing2, {
            toValue: 1.05,
            duration: 3000,
            Easing: Easing.inOut,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start();
    // console.log(userData?.photoURL);
  }, []);

  const handleAddBio = async () => {
    const makeData = await setDoc(doc(FBDB, "users", userProfile.uid), {
      ...userData,
      bio: bioText,
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.c1, position: "relative" }}>
      <View style={styles.mainContainer}>
        <View style={styles.pfpContainer}>
          <Avatar.Image
            style={styles.pfpIcon}
            size={200}
            source={{ uri: userProfile?.photoURL }}
          />
        </View>
        <View style={styles.userContainer}>
          <DisplayCard displayData={userProfile?.displayName} />
          <DisplayCard displayData={userProfile?.email} />
          {isEditing ? (
            <BioEditor
              setIsEditing={setIsEditing}
              setBioText={setBioText}
              bioText={bioText}
              handleAddBio={handleAddBio}
            />
          ) : (
            <DisplayBio
              onPress={() => setIsEditing(true)}
              displayData={userData?.bio}
              setIsEditing={setIsEditing}
            />
          )}
        </View>
        <View
          style={{
            width: 92,
            alignSelf: "flex-end",
            marginTop: SIZES.s3,
            marginRight: "10%",
          }}
        >
          <Button
            buttonStyle={{
              borderColor: COLORS.c1,
              borderWidth: 2,
              // width: "auto",
              borderRadius: "10%",
            }}
            titleStyle={{ color: COLORS.c4 }}
            title="Sign Out"
            type="outline"
            onPress={handleSignOut}
          />
        </View>
      </View>

      <Animated.View
        style={[styles.BGcircle1, { transform: [{ scale: breathing }] }]}
      />
      <Animated.View
        style={[styles.BGcircle2, { transform: [{ scale: breathing2 }] }]}
      />
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: COLORS.c1,
    height: "100%",
  },
  pfpContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: COLORS.c5,
    height: 220,
    width: 220,
    borderRadius: 220,
    marginBottom: SIZES.s1,
  },
  BGcircle1: {
    backgroundColor: COLORS.c3,
    position: "absolute",
    width: 500,
    height: 500,
    zIndex: -100,
    borderRadius: 500,
    bottom: -200,
    left: 150,
  },
  BGcircle2: {
    backgroundColor: COLORS.c6,
    position: "absolute",
    width: 500,
    height: 500,
    zIndex: -100,
    borderRadius: 500,
    bottom: 200,
    right: 100,
  },
  userContainer: {
    width: "80%",
    backgroundColor: COLORS.c5,
    opacity: 0.9,
    alignSelf: "center",
    borderRadius: "15%",
  },
});
