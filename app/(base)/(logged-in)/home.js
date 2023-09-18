import { StyleSheet, FlatList, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, onSnapshot, docs } from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import { FBDB } from "../../../firebaseConfig";
import { COLORS, SIZES } from "../../../constants/theme";
import PostCard from "../../../components/home/PostCard";
import TopHeader from "../../../components/home/TopHeader";

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
                <TopHeader />
                <View style={styles.cardContainer}>
                    <FlatList
                        data={displayData}
                        renderItem={({ item }) => <PostCard data={item} />}
                        keyExtractor={(post) => post.id}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default home;

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    cardContainer: {
        flex: 1,
        flexDirection: "column",
        gap: SIZES.s2,
        alignItems: "center",
    },
});
