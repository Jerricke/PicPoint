import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";

function InputFields({ fieldTitle, labelValue }) {
  return (
    <TouchableOpacity style={styles.inputBox}>
      <TextInput style={styles.inputField} placeholder={fieldTitle} />
    </TouchableOpacity>
  );
}

export default InputFields;

const styles = StyleSheet.create({
  inputBox: {
    borderColor: COLORS.c3,
    borderWidth: 2,
    width: "80%",
    padding: 10,
  },
  inputField: {
    fontSize: SIZES.s3,
  },
});
