import { View, Text, KeyboardAvoidingView } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "@env";
import LocationPicker from "../../../components/post/LocationPicker";

const lp = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [pin, setPin] = useState({});
    const [region, setRegion] = useState({});

    useEffect(() => {
        const getPermissions = async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("please grant location permissions");
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            setPin({
                longitude: currentLocation.coords.longitude,
                latitude: currentLocation.coords.latitude,
            });
            setRegion({
                longitude: currentLocation?.coords.longitude,
                latitude: currentLocation?.coords.latitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.04,
            });
            setIsLoading(false);
        };
        getPermissions();
    }, []);

    return (
        <KeyboardAvoidingView behavior="padding" style={{ height: "100%" }}>
            <LocationPicker
                isLoading={isLoading}
                location={location}
                pin={pin}
                setPin={setPin}
            />
            <View style={{ flex: 1 }}>
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    fetchDetails
                    GooglePlacesSearchQuery={{
                        rankby: "distance",
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details.geometry.location);
                        setPin({
                            longitude: details.geometry.location.lng,
                            latitude: details.geometry.location.lat,
                        });
                        setRegion({
                            longitude: details.geometry.location.lng,
                            latitude: details.geometry.location.lat,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.04,
                        });
                    }}
                    query={{
                        key: API_KEY,
                        language: "en",
                        location: `${location?.longitude}, ${location?.latitude}`,
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default lp;
