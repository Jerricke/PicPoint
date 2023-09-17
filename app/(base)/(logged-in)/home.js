import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, onSnapshot, docs } from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import { FBDB } from "../../../firebaseConfig";
import { COLORS } from "../../../constants/theme";

const home = () => {
    const [displayData, setDisplayData] = useState(null);
    const db = FBDB;

    useEffect(() => {
        const ref = collection(db, "global-posts");

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
        <SafeAreaView style={{ backgroundColor: COLORS.c3 }}>
            <View style={styles.container}>
                <Text> test</Text>
            </View>
        </SafeAreaView>
    );
};

export default home;

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});
