import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { setDoc, doc } from "firebase/firestore";
import { COLORS } from "../../../constants/theme";

function BioEditor({
  bioText = null,
  setBioText,
  handleAddBio,
  setIsEditing,
  ...rest
}) {
  const [isShow, setIsShow] = useState(false);

  const handlePress = () => {
    setIsEditing(false);
    handleAddBio();
  };

  const handleChangeText = (newText) => {
    setBioText(newText);
  };

  return (
    <View style={styles.textEditContainer}>
      <TextInput
        value={bioText}
        onChangeText={handleChangeText}
        autoFocus
        multiline
        style={styles.textEdit}
      />
      <View style={styles.iconContainer}>
        <IconButton
          icon="check"
          iconColor={COLORS.c4}
          size={24}
          onPress={handlePress}
        />
      </View>
    </View>
  );
}

export default BioEditor;

const styles = StyleSheet.create({});
