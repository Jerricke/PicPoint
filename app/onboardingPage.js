import { Image, Text, View, StyleSheet } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useRouter } from "expo-router";
import { SIZES } from "../constants/theme";

function onboardingPage() {
  const router = useRouter();

  const handleOut = () => {
    router.push("/(base)/login");
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onSkip={handleOut}
        onDone={handleOut}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.swiperImage}
                source={require("../assets/undraw_Social_interaction_re_dyjh.png")}
              />
            ),
            title: <Text style={styles.title}>Socialize</Text>,
            subtitle: "Share Your Experiences",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.swiperImage}
                source={require("../assets/undraw_Organize_photos_re_ogcy.png")}
              />
            ),
            title: <Text style={styles.title}>Upload Images</Text>,
            subtitle:
              "Post Images And Show Others The Beautiful World Around You",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.swiperImage}
                source={require("../assets/undraw_Social_sharing_re_pvmr.png")}
              />
            ),
            title: <Text style={styles.title}>Be Yourself</Text>,
            subtitle: "Customize Your Own Profile to Best Show Who You Are",
          },
        ]}
      />
    </View>
  );
}

export default onboardingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    marginTop: SIZES.s5,
  },
  swiperImage: {
    resizeMode: "contain",
    height: 600,
    width: 400,
    bottom: -200,
    position: "absolute",
  },
  title: {
    marginTop: SIZES.s6,
    fontSize: SIZES.s4,
    marginBottom: SIZES.s1,
  },
});
