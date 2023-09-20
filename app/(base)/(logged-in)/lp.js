import { View, Text, KeyboardAvoidingView } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "@env";
import { useRouter, Link, useLocalSearchParams } from "expo-router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
import { Button } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import useUser from "../../../context/useUser";
import LocationPicker from "../../../components/post/LocationPicker";
import { FBDB, FBSTORAGE } from "../../../firebaseConfig";
import { COLORS } from "../../../constants/theme";

const lp = () => {
    const { image, title, content } = useLocalSearchParams();

    const { userProfile } = useUser();
    const router = useRouter();
    const db = FBDB;
    const storage = FBSTORAGE;

    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [pin, setPin] = useState({});
    const [region, setRegion] = useState({});
    const [isUploading, setIsUploading] = useState(false);

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

    const handlePost = async () => {
        setIsUploading(true);
        uploadImageAsync(image).then((res) => {
            console.log("done uploading image"); // console.log prevents crash so we keep it here
            handleCreatePost(res);
        });
    };

    const handleCreatePost = async (photo) => {
        await setDoc(doc(db, "global-posts", `global-post-${Date.now()}`), {
            createdAt: Date.now(),
            photoURL: photo,
            title,
            content,
            lng: pin.longitude,
            lat: pin.latitude,
            userDN: userProfile.displayName,
            userPFP: userProfile.photoURL,
            userUID: userProfile.uid,
        }).then(() => {
            setIsUploading(false);
            router.push("/home");
        });
    };

    const uploadImageAsync = async (uri) => {
        console.log("in image upload block");
        const img = await fetch(uri);
        const blobbytes = await img.blob();

        try {
            const fileRef = ref(storage, `globalPosts/image-${Date.now()}`);
            const result = await uploadBytes(fileRef, blobbytes);
            console.log("image uploaded successfully"); // I LOVE IT WHEN CONSOLE LOG FIXES MY CRASHES
            // We're done with the blob, close and release it
            blobbytes.close();
            const uploaded = await getDownloadURL(fileRef);
            return uploaded;
        } catch (e) {
            alert(`Error :  ${e}`);
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={{ height: "100%" }}>
            {isUploading ? (
                <ActivityIndicator style={{ flex: 1 }} color="red" size={64} />
            ) : (
                <>
                    <LocationPicker
                        isLoading={isLoading}
                        location={location}
                        pin={pin}
                        setPin={setPin}
                        region={region}
                    />
                    <View style={{ flex: 1 }}>
                        <Button
                            title="Post!"
                            buttonStyle={{
                                backgroundColor: COLORS.c5,
                                borderColor: COLORS.c5,
                            }}
                            titleStyle={{ color: COLORS.c1 }}
                            type="outline"
                            onPress={handlePost}
                        />
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
                </>
            )}
        </KeyboardAvoidingView>
    );
};

export default lp;
