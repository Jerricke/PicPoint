/* eslint-disable array-callback-return */
import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { collection, onSnapshot, docs } from "firebase/firestore";
import { ActivityIndicator } from "react-native-paper";
import { Image } from "react-native-elements";
import * as Location from "expo-location";
import { FBDB as db } from "../../../firebaseConfig";
import { COLORS } from "../../../constants/theme";

const map = () => {
    const [displayData, setDisplayData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const getPermissions = async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("please grant location permissions");
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        };

        const ref = collection(db, "global-posts");

        const subscriber = onSnapshot(ref, {
            next: (snapshot) => {
                const posts = [];
                // console.log(snapshot)
                snapshot.docs.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setDisplayData(posts);
            },
        });
        getPermissions();
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => subscriber();
    }, []);

    if (!isLoading) {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    provider="google"
                    initialRegion={{
                        longitude: location?.coords.longitude,
                        latitude: location?.coords.latitude,
                        longitudeDelta: 0.1,
                        latitudeDelta: 0.04,
                    }}
                >
                    {displayData?.map((data) => {
                        if (data?.lng) {
                            return (
                                <Marker
                                    coordinate={{
                                        longitude: data.lng,
                                        latitude: data.lat,
                                    }}
                                    key={data.id}
                                    pinColor="red"
                                >
                                    <Callout>
                                        <Image
                                            source={{ uri: data?.photoURL }}
                                            style={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 100,
                                            }}
                                            PlaceholderContent={
                                                <ActivityIndicator
                                                    color={COLORS.c3}
                                                    size={22}
                                                />
                                            }
                                        />
                                    </Callout>
                                </Marker>
                            );
                        }
                    })}
                </MapView>
            </View>
        );
    }

    return <ActivityIndicator style={{ flex: 1 }} />;
};

export default map;

const styles = StyleSheet.create({});
