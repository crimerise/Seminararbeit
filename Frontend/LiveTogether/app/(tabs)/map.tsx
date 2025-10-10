import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Alert,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import SearchBar from "@/components/SearchBar";
import { createMarker, getMarkers, MarkerType } from "@/services/appwrite";
import MarkerWithEmoji from "@/components/MarkerWithEmoji";
import DateTimePicker from "@/components/DateTimePicker";

const initialRegion = {
    latitude: 47.6510,
    longitude: 9.4797,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
};


const Map = () => {
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newMarkerCoords, setNewMarkerCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [emoji, setEmoji] = useState<string>("🌲");

    // load markers at start from DB
    useEffect(() => {
        const loadMarkers = async () => {
            try {
                const savedMarkers = await getMarkers();
                setMarkers(savedMarkers);
            } catch (err) {
                console.error("Fehler beim Laden der Marker:", err);
            }
        };
        loadMarkers();
    }, []);

    // open modal if map clicked
    const handleMapPress = (e: any) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setNewMarkerCoords({ latitude, longitude });
        setTitle("");
        setDescription("");
        setModalVisible(true);
    };

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // create marker
    const handleSaveMarker = async () => {
        if (!newMarkerCoords) return;

        const newMarker: MarkerType = {
            latitude: newMarkerCoords.latitude,
            longitude: newMarkerCoords.longitude,
            title: title || "Unbenannter Ort",
            description: description || "",
            emoji: emoji,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        };

        // show local
        setMarkers((prev) => [...prev, newMarker]);
        setModalVisible(false);

        try {
            await createMarker(newMarker);
            Alert.alert("Gespeichert ✅", "Marker wurde in Appwrite gespeichert!");
        } catch (err) {
            console.error("Fehler beim Speichern:", err);
            Alert.alert("Fehler", "Marker konnte nicht gespeichert werden.");
        }
    };

    const handleMarkerPress = (marker: MarkerType) => {
        setTitle(marker.title ?? "Unbenannter Ort");
        setDescription(marker.description ?? "");
        setEmoji(marker.emoji ?? "📍");
        setModalVisible(true);
    };





    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}
                showsUserLocation
                showsMyLocationButton={true}
                showsCompass={false}
                showsPointsOfInterest
                showsBuildings
                onPress={handleMapPress}
            >
                {markers.map((marker, index) => (
                    <MarkerWithEmoji key={index} marker={marker} onPress={() => handleMarkerPress(marker)} />
                ))}

            </MapView>

            {/* Suchleiste */}
            <View style={{ marginTop: 50, paddingHorizontal: 16 }}>
                <SearchBar placeholder="Wandern..." value="" />
            </View>

            {/* Modal for marker create */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Neue Aktivität</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Titel"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={[styles.input, { height: 80 }]}
                            placeholder="Beschreibung"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                        />

                        {/* Emoji Picker */}
                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
                            {["📍","🌲", "🏔️", "🏕️", "🏃", "🏈", "🏀", "🎾"].map((e) => (
                                <TouchableOpacity
                                    key={e}
                                    onPress={() => setEmoji(e)}
                                    style={[
                                        styles.emojiButton,
                                        emoji === e ? { borderWidth: 2, borderColor: "#007AFF" } : {},
                                    ]}
                                >
                                    <Text style={{ fontSize: 28 }}>{e}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <DateTimePicker
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(start, end) => {
                                setStartDate(start);
                                setEndDate(end);
                            }}
                        />


                        <TouchableOpacity style={styles.button} onPress={handleSaveMarker}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>Speichern & Veröffentlichen</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: "#aaa", marginTop: 8 }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ color: "white" }}>Abbrechen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    emojiButton: {
        padding: 6,
        margin: 4,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "transparent",
    }
});

export default Map;
