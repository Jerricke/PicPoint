import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

function BaseLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
        </Stack>
    );
}

const styles = StyleSheet.create({});
