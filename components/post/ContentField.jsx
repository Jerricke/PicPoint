import {
    StyleSheet,
    Keyboard,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { Input } from "react-native-elements";
import { Ionicons, Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

function ContentField({ content, setContent }) {
    return (
        <View style={styles.container}>
            <Input
                rightIcon={
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <TouchableOpacity
                            style={styles.reset}
                            onPress={() => setContent(null)}
                        >
                            <Ionicons name="remove" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.reset}
                            onPress={() => Keyboard.dismiss()}
                        >
                            <Feather name="check" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                }
                multiline
                placeholder="Content"
                onChangeText={(text) => setContent(text)}
                value={content}
            />
        </View>
    );
}

export default ContentField;

const styles = StyleSheet.create({
    container: {
        width: "90%",
    },
    reset: {
        backgroundColor: COLORS.c3,
        borderRadius: 4,
    },
});
