import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, onSnapshot, docs } from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import { FBDB } from "../../../firebaseConfig";

const home = () => {
  const [displayData, setDisplayData] = useState(null);
  const db = FBDB;

  useEffect(() => {
    const ref = collection(db, "community-posts");

    const subscriber = onSnapshot(ref, {
      next: (snapshot) => {
        const posts = [];
        // console.log(snapshot)
        snapshot.docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setDisplayData(posts);
      },
    });
    return () => subscriber();
  }, []);

  return (
    <SafeAreaView>
      <Text> test</Text>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({});
