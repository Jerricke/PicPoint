/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Image, Button } from "react-native-elements";
import {
    ActivityIndicator,
    Modal,
    Portal,
    PaperProvider,
    IconButton,
} from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { COLORS, SIZES } from "../../constants/theme";
import useUser from "../../context/useUser";
import PostCardModal from "./PostCardModal";
import { FBDB as db } from "../../firebaseConfig";

function PostCard({ data }) {
    const { userProfile } = useUser();

    const [visible, setVisible] = React.useState(false);

    const showModal = () => {
        if (data.userUID === userProfile.uid) {
            setVisible(true);
        }
    };
    const hideModal = () => setVisible(false);

    const handleSave = async (newTitle, newContent) => {
        await setDoc(doc(db, "global-posts", `${data.id}`), {
            ...data,
            title: newTitle,
            content: newContent,
            updatedAt: Date.now(),
        });
    };

    const handleDelete = async () => {
        await deleteDoc(doc(db, "global-posts", `${data.id}`));
    };

    const d = new Date(parseInt(data.createdAt));
    const ds = d.toLocaleString();
    return (
        <PaperProvider>
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.container}>
                    <View style={styles.userContainer}>
                        <Image
                            // source={{ uri: data?.userPFP }}
                            style={{ width: 60, height: 60, borderRadius: 60 }}
                            PlaceholderContent={
                                <ActivityIndicator
                                    color={COLORS.c3}
                                    size={22}
                                />
                            }
                        />
                        <Text style={styles.username}>{data.userDN}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.contentContainer}
                        onPress={showModal}
                    >
                        <Portal>
                            <Modal
                                visible={visible}
                                onDismiss={hideModal}
                                contentContainerStyle={styles.containerStyle}
                            >
                                <PostCardModal
                                    data={data}
                                    handleSave={handleSave}
                                    handleDelete={handleDelete}
                                />
                            </Modal>
                        </Portal>
                        <Text style={{ fontSize: SIZES.s3, marginBottom: 6 }}>
                            {data.title}
                        </Text>
                        <Text style={{ fontSize: SIZES.s1, marginBottom: 6 }}>
                            Location:{" "}
                            {data.lat
                                ? `${data.lat}, ${data.lng}`
                                : `no location data`}
                        </Text>
                        <Text
                            style={{
                                fontSize: SIZES.s1,
                                marginBottom: SIZES.s1,
                            }}
                        >
                            {ds}
                        </Text>
                        <Text style={{ fontSize: SIZES.s2 }}>
                            {data.content}
                        </Text>
                        <View style={styles.imageContainer}>
                            <Image
                                // source={{ uri: data.photoURL }}
                                style={{
                                    width: 300,
                                    height: 240,
                                    // resizeMode: "fit",
                                }}
                                PlaceholderContent={
                                    <ActivityIndicator
                                        color={COLORS.c5}
                                        size={42}
                                    />
                                }
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </PaperProvider>
    );
}

export default PostCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "beige",
        alignItems: "start",
        width: 350,
        borderRadius: "10%",
        padding: SIZES.s2,
        marginBottom: SIZES.s2,
        flexDirection: "column",
    },
    userContainer: {
        padding: 6,
        width: "100%",
        flexDirection: "row",
        marginRight: SIZES.s1,
        gap: SIZES.s3,
        alignItems: "center",
        marginBottom: SIZES.s1,
    },
    username: {
        fontSize: SIZES.s3,
    },
    contentContainer: {
        padding: SIZES.s1,
        borderRadius: "15%",
        backgroundColor: COLORS.c6,
        width: 320,
    },
    imageContainer: {
        marginTop: SIZES.s1,
    },
    containerStyle: {
        backgroundColor: COLORS.c2,
        borderRadius: "15%",
        padding: SIZES.s2,
        margin: SIZES.s2,
        minHeight: 200,
        justifyContent: "flex-start",
    },
});
