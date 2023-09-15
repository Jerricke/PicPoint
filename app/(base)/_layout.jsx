import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

function BaseLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" />
    </Stack>
  );
}

export default BaseLayout;

const styles = StyleSheet.create({});
