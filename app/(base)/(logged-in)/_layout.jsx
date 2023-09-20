import React from "react";
import { Tabs } from "expo-router";
import { Octicons, Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";

export default function LILayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.c4,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Octicons name="people" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="map" size={32} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="post"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="camera" size={32} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Octicons name="person" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="lp"
                options={{
                    href: null,
                    presentation: "modal",
                }}
            />
        </Tabs>
    );
}
