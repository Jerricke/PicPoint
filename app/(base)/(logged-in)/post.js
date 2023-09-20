import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Button, Image } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import { COLORS, SIZES } from "../../../constants/theme";
import TitleField from "../../../components/post/TitleField";
import ContentField from "../../../components/post/ContentField";

const post = () => {
    const router = useRouter();

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = () => {
        if (title && content && image) {
            router.push({
                pathname: "/lp",
                params: { title, content, image },
            });
            setTitle(null);
            setContent(null);
            setImage(null);
        } else {
            alert("Please fill out the fields!");
        }
    };

    const pickImage = async () => {
        setIsLoading(true);
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
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
                                titleStyle={{
                                    color: COLORS.c5,
                                    fontSize: SIZES.s2,
                                }}
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
                    title="Next"
                    type="outline"
                    onPress={handleNext}
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
