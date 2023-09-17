import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

function TitleField({ title, setTitle }) {
  return (
    <View style={styles.container}>
      <Input
        rightIcon={
          <TouchableOpacity style={styles.reset} onPress={() => setTitle(null)}>
            <Ionicons name="remove" size={24} color="black" />
          </TouchableOpacity>
        }
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
    </View>
  );
}

export default TitleField;

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  reset: {
    backgroundColor: COLORS.c3,
    borderRadius: 4,
  },
});
