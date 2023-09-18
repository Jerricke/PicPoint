import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import { COLORS, SIZES } from "../../constants/theme";

function PostCard({ data }) {
    const d = new Date(parseInt(data.createdAt));
    const ds = d.toLocaleString();
    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Image
                    source={{ uri: data.userPFP }}
                    style={{ width: 60, height: 60, borderRadius: "100%" }}
                />
                <Text style={styles.username}>{data.userDN}</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={{ fontSize: SIZES.s3, marginBottom: 6 }}>
                    {data.title}
                </Text>
                <Text style={{ fontSize: SIZES.s1, marginBottom: SIZES.s1 }}>
                    {ds}
                </Text>
                <Text style={{ fontSize: SIZES.s2 }}>{data.content}</Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: data.photoURL }}
                        style={{
                            width: 240,
                            height: 180,
                        }}
                        PlaceholderContent={
                            <ActivityIndicator color={COLORS.c5} size={42} />
                        }
                    />
                </View>
            </View>
        </View>
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
        flexDirection: "row",
    },
    userContainer: {
        marginRight: SIZES.s1,
        alignItems: "center",
    },
    username: {
        marginTop: SIZES.s2,
        fontSize: SIZES.s2,
    },
    contentContainer: {
        padding: SIZES.s1,
        borderRadius: "15%",
        backgroundColor: COLORS.c6,
        width: 250,
    },
    imageContainer: {
        marginTop: SIZES.s1,
    },
});
