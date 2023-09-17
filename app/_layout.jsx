import { Stack } from "expo-router";
import { UserProvider } from "../context/useUser";

export default function RootLayout() {
    return (
        <UserProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="onboardingPage" />
            </Stack>
        </UserProvider>
    );
}
