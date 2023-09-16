import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Button } from "react-native-elements";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { COLORS, SIZES } from "../../constants/theme";
import { FBAUTH } from "../../firebaseConfig";
import useUser from "../../context/useUser";

const signup = () => {
  const router = useRouter();
  const auth = FBAUTH;
  const { setUserData } = useUser();
  const [hasUser, setHasUser] = useState(null);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignIn = async () => {
    try {
      setHasUser(await signInWithEmailAndPassword(auth, email, password));
      router.push({ pathname: "/(logged-in)/home" });
    } catch (err) {
      alert(`Sign In Failed: ${err}`);
    } finally {
      setEmail(null);
      setPassword(null);
    }
  };

  const handleNewAcc = () => {
    router.push("/signup");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/Screenshot_2023-09-15_at_12.55.16_PM-removebg-preview.png")}
          />
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
              secureTextEntry
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
              title="Sign In"
              type="outline"
              onPress={handleSignIn}
            />

            <TouchableOpacity style={styles.newAcc} onPress={handleNewAcc}>
              <Text>
                <Text>Not signed up? Create a </Text>
                <Text style={{ fontWeight: "bold", color: COLORS.c4 }}>
                  new account.
                </Text>
              </Text>
            </TouchableOpacity>
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
