import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import { COLORS, SIZES } from "../../constants/theme";

function TopHeader() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.imageContainer}
                source={require("../../assets/logo.png")}
            />
            <Text style={styles.logo}>Pic Point</Text>
        </View>
    );
}

export default TopHeader;

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: "row",
        alignSelf: "center",
        borderRadius: "10%",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingBottom: 4,
        backgroundColor: COLORS.c1,
        width: "50%",
        marginBottom: SIZES.s1,
    },
    imageContainer: {
        resizeMode: "contain",
        width: 45,
        height: 45,
    },
    logo: {
        fontSize: SIZES.s4,
        fontStyle: "italic",
        color: COLORS.c4,
    },
});
