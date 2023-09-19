import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator } from "react-native-paper";

function LocationPicker({ isLoading, location, pin, setPin, region }) {
    useEffect(() => {
        onRelocate();
    }, [region]);

    function onRelocate() {
        this.mapRef?.animateToRegion(region);
    }

    return (
        <View style={{ flex: 3 }}>
            {isLoading ? (
                <ActivityIndicator style={{ flex: 1 }} size={52} color="red" />
            ) : (
                <MapView
                    provider="google"
                    style={{ flex: 1 }}
                    ref={(ref) => {
                        this.mapRef = ref;
                    }}
                    initialRegion={{
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.04,
                    }}
                >
                    <Marker
                        coordinate={pin}
                        pinColor="red"
                        draggable
                        onDragEnd={(e) => {
                            setPin({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude,
                            });
                        }}
                    />
                </MapView>
            )}
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({});
