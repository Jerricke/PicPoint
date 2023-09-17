import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Button, Image } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import { FBDB, FBSTORAGE } from "../../../firebaseConfig";
import useUser from "../../../context/useUser";
import { COLORS, SIZES } from "../../../constants/theme";
import TitleField from "../../../components/post/TitleField";
import ContentField from "../../../components/post/ContentField";

const post = () => {
  const { userData } = useUser();
  const router = useRouter();
  const db = FBDB;
  const storage = FBSTORAGE;

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async () => {};

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
    <KeyboardAvoidingView
      behavior="padding"
      style={{ backgroundColor: COLORS.c5 }}
    >
      <View style={styles.container}>
        <View style={styles.uploadContainer}>
          <TitleField title={title} setTitle={setTitle} />
          <ContentField content={content} setContent={setContent} />
          {!image ? (
            <>
              <Button
                buttonStyle={{
                  borderColor: COLORS.c5,
                  borderWidth: 2,
                  borderRadius: "10%",
                }}
                titleStyle={{ color: COLORS.c5, fontSize: SIZES.s2 }}
                title="Select Photo"
                type="outline"
                onPress={pickImage}
              />
              {isLoading ? (
                <View>
                  <ActivityIndicator color={COLORS.c4} />
                </View>
              ) : null}
            </>
          ) : (
            <View
              style={{
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.c3,
                borderRadius: "15%",
                gap: 5,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: 240,
                  height: 180,
                  resizeMode: "contain",
                }}
              />
              <Button
                buttonStyle={{
                  borderColor: COLORS.c2,
                  borderWidth: 2,
                  width: "80%",
                  alignSelf: "center",
                  borderRadius: "10%",
                }}
                titleStyle={{ color: COLORS.c2 }}
                title="Remove Image"
                type="outline"
                onPress={handleRemoveImage}
              />
            </View>
          )}
        </View>
        <Button
          buttonStyle={{
            borderColor: COLORS.c1,
            borderWidth: 2,
            borderRadius: "10%",
            marginTop: SIZES.s3,
          }}
          titleStyle={{ color: COLORS.c1, fontSize: SIZES.s2 }}
          title="Post!"
          type="outline"
          onPress={handlePost}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default post;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "lavender",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadContainer: {
    alignItems: "center",
    width: "90%",
    backgroundColor: COLORS.c2,
    borderRadius: "15%",
    paddingVertical: SIZES.s2,
  },
});
