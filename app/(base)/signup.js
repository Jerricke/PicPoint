import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Button } from "react-native-elements";
import { useRouter, Stack } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import { FBAUTH, FBDB, FBSTORAGE } from "../../firebaseConfig";
import useUser from "../../context/useUser";

const signup = () => {
  const router = useRouter();
  const auth = FBAUTH;
  const db = FBDB;
  const storage = FBSTORAGE;
  const { setPing } = useUser();

  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const erroritem = !true ? "Plesae Input The Correct Password" : null;

  const handleReturn = () => {
    router.push("/login");
  };

  const handleSignUp = async () => {
    if (password === confirmPassword) {
      try {
        uploadImageAsync(image);
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        updateProfile(FBAUTH.currentUser, {
          displayName: username,
          photoURL: image,
        });
        setPing(null);
        router.push("/(logged-in)/home");
      } catch (err) {
        alert(err);
      } finally {
        setEmail(null);
        setUsername(null);
        setPassword(null);
        setConfirmPassword(null);
        setImage(null);
      }
    }
  };

  const pickImage = async () => {
    setIsLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setInterval(() => {
        setImage(null);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const fileRef = ref(storage, `userProfiles/image-${Date.now()}`);
      const result = await uploadBytes(fileRef, blob);

      // We're done with the blob, close and release it
      blob.close();
      const uploaded = await getDownloadURL(fileRef);
      return uploaded;
    } catch (e) {
      alert(`Error :  ${e}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AntDesign
        style={{
          marginLeft: 15,
        }}
        name="back"
        size={28}
        color={COLORS.c4}
        onPress={handleReturn}
      />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* <Image
            style={styles.logo}
            source={require("../../assets/Screenshot_2023-09-15_at_12.55.16_PM-removebg-preview.png")}
          /> */}
          <View style={styles.inputBox}>
            {!image ? (
              <TouchableOpacity
                style={{
                  padding: 5,
                  marginVertical: SIZES.s1,
                  backgroundColor: COLORS.c1,
                  borderColor: COLORS.c3,
                  alignSelf: "center",
                  borderWidth: 2,
                  borderRadius: "10%",
                  alignItems: "center",
                  width: "50%",
                }}
                onPress={pickImage}
              >
                {isLoading ? (
                  <View>
                    <ActivityIndicator color={COLORS.c4} />
                  </View>
                ) : (
                  <Text style={{ color: COLORS.c4 }}>Pick An Image</Text>
                )}
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <Avatar.Image size={96} source={{ uri: image }} />
                <Button
                  buttonStyle={{
                    borderColor: COLORS.c3,
                    borderWidth: 2,
                    width: "80%",
                    alignSelf: "center",
                    borderRadius: "10%",
                  }}
                  titleStyle={{ color: COLORS.c4 }}
                  title="Remove Image"
                  type="outline"
                  onPress={handleRemoveImage}
                />
              </View>
            )}
            <Input
              placeholder="username"
              value={username}
              leftIcon={{ type: "font-awesome", name: "user" }}
              onChangeText={(value) => setUsername(value)}
              autoCapitalize="none"
            />
            <Input
              placeholder="email"
              value={email}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={(value) => setEmail(value)}
              autoCapitalize="none"
            />
            <Input
              placeholder="password"
              value={password}
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(value) => setPassword(value)}
              autoCapitalize="none"
              // errorMessage={erroritem}
            />
            <Input
              placeholder="password confirmation"
              value={confirmPassword}
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(value) => setConfirmPassword(value)}
              autoCapitalize="none"
              // errorMessage={erroritem}
            />
            <Button
              buttonStyle={{
                borderColor: COLORS.c3,
                marginVertical: SIZES.s1,
                borderWidth: 2,
                width: "75%",
                alignSelf: "center",
                borderRadius: "10%",
              }}
              titleStyle={{ color: COLORS.c4 }}
              title="Create New Account"
              type="outline"
              onPress={handleSignUp}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "85%",
    padding: 10,
  },
  inputBox: {
    marginVertical: SIZES.s3,
    padding: 10,
    backgroundColor: COLORS.c1,
    borderWidth: 3,
    borderColor: COLORS.c3,
    borderRadius: "15%",
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  newAcc: {
    marginTop: SIZES.s2,
    alignSelf: "center",
  },
});
