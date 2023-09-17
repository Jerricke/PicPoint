import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { SIZES, COLORS } from "../../../constants/theme";

function DisplayBio({ setIsEditing, displayData = null, ...rest }) {
  return (
    <View style={styles.display}>
      {displayData ? (
        <>
          <Text style={styles.displayBioTitle}>User Bio</Text>
          <Text style={styles.displayText}>{displayData}</Text>
          <View
            style={{
              alignSelf: "flex-end",
              width: 70,
            }}
          >
            <Button
              buttonStyle={{
                borderColor: COLORS.c1,
                borderWidth: 2,
                borderRadius: "10%",
              }}
              titleStyle={{ color: COLORS.c1, fontSize: SIZES.s1 }}
              title="Edit Bio?"
              type="outline"
              onPress={() => setIsEditing(true)}
            />
          </View>
        </>
      ) : (
        <>
          <Text
            style={[
              styles.displayText,
              { alignSelf: "center", marginBottom: 5 },
            ]}
          >
            No bio :(
          </Text>
          <Button
            buttonStyle={{
              borderColor: COLORS.c1,
              borderWidth: 2,
              width: "75%",
              alignSelf: "center",
              borderRadius: "10%",
            }}
            titleStyle={{ color: COLORS.c1, fontSize: SIZES.s1 }}
            title="Add Bio?"
            type="outline"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
          />
        </>
      )}
    </View>
  );
}

export default DisplayBio;

const styles = StyleSheet.create({
  display: {
    alignSelf: "center",
    padding: SIZES.s2,
    width: "95%",
  },
  displayText: {
    color: COLORS.c1,
    fontSize: SIZES.s2,
    marginBottom: SIZES.s1,
  },
  displayBioTitle: {
    color: COLORS.c1,
    fontWeight: "bold",
    marginBottom: SIZES.s1,
  },
});
