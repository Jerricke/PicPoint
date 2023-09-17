import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";

function DisplayCard({ displayData }) {
  return (
    <View style={styles.display}>
      <Text style={styles.displayText}>{displayData}</Text>
    </View>
  );
}

export default DisplayCard;

const styles = StyleSheet.create({
  display: {
    alignSelf: "center",
    padding: SIZES.s2,
  },
  displayText: {
    color: COLORS.c1,
    fontSize: SIZES.s3,
  },
});
