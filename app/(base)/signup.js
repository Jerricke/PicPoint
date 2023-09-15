import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Button } from "react-native-elements";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants/theme";

const signup = () => {
  const router = useRouter();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  // const erroritem = !true ? "Plesae Input The Correct Password" : null;

  const handleSignUp = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* <Image
            style={styles.logo}
            source={require("../../assets/Screenshot_2023-09-15_at_12.55.16_PM-removebg-preview.png")}
          /> */}
          <View style={styles.inputBox}>
            <Input
              placeholder="email"
              value={email}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={(value) => setEmail(value)}
              autoCapitalize="none"
            />
            <Input
              placeholder="password"
              value={password}
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(value) => setPassword(value)}
              autoCapitalize="none"
              // errorMessage={erroritem}
            />
            <Input
              placeholder="password confirmation"
              value={confirmPassword}
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(value) => setConfirmPassword(value)}
              autoCapitalize="none"
              // errorMessage={erroritem}
            />
            <Button
              buttonStyle={{
                borderColor: COLORS.c3,
                borderWidth: 2,
                width: "75%",
                alignSelf: "center",
                borderRadius: "10%",
              }}
              titleStyle={{ color: COLORS.c4 }}
              title="Create New Account"
              type="outline"
              onPress={handleSignUp}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "85%",
    padding: 10,
  },
  inputBox: {
    marginVertical: SIZES.s3,
    padding: 10,
    backgroundColor: COLORS.c1,
    borderWidth: 3,
    borderColor: COLORS.c3,
    borderRadius: "15%",
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  newAcc: {
    marginTop: SIZES.s2,
    alignSelf: "center",
  },
});
