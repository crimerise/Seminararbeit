import React, { useState, useEffect } from "react";
import { Marker } from "react-native-maps";
import { Text } from "react-native";

const MarkerWithEmoji = ({ marker, onPress }: { marker: any; onPress: () => void }) => {
    const [tracks, setTracks] = useState(true);

    useEffect(() => {
        // Nach dem ersten Render auf false setzen
        const timeout = setTimeout(() => setTracks(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Marker
            coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
            }}
            onPress={onPress}
            tracksViewChanges={tracks}
        >
            <Text style={{ fontSize: 28 }}>{marker.emoji || "📍"}</Text>
        </Marker>
    );
};

export default MarkerWithEmoji;
