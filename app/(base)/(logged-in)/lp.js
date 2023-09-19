import { View, Text } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const lp = () => {
    // If the page was reloaded or navigated to directly, then the modal should be presented as
    // a full screen page. You may need to change the UI to account for this.
    const isPresented = router.canGoBack();
    return (
        <SafeAreaView>
            <Text>test</Text>
        </SafeAreaView>
    );
};

export default lp;
