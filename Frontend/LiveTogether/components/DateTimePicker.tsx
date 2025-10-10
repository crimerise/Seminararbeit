import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Props {
    startDate: Date;
    endDate: Date;
    onChange: (start: Date, end: Date) => void;
}

const DateRangePicker: React.FC<Props> = ({ startDate, endDate, onChange }) => {
    const [pickerMode, setPickerMode] = useState<"start" | "end" | null>(null);

    const handleConfirm = (date: Date) => {
        if (pickerMode === "start") {
            const newStart = date;
            const newEnd = date > endDate ? date : endDate;
            onChange(newStart, newEnd);
        } else if (pickerMode === "end") {
            const newEnd = date;
            const newStart = date < startDate ? date : startDate;
            onChange(newStart, newEnd);
        }
        setPickerMode(null);
    };

    return (
        <View style={{ alignItems: "center", marginVertical: 12 }}>
            <Text style={{ marginBottom: 8, fontWeight: "bold" }}>Dauer der Aktivität:</Text>

            <TouchableOpacity style={styles.button} onPress={() => setPickerMode("start")}>
                <Text style={styles.buttonText}>
                    Von: {startDate.toLocaleDateString()} {startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setPickerMode("end")}>
                <Text style={styles.buttonText}>
                    Bis: {endDate.toLocaleDateString()} {endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={pickerMode !== null}
                mode="datetime" // Datum + Uhrzeit
                onConfirm={handleConfirm}
                onCancel={() => setPickerMode(null)}
                date={pickerMode === "start" ? startDate : endDate}
                minimumDate={pickerMode === "end" ? startDate : undefined}
                confirmTextIOS="Fertig"
                cancelTextIOS="Abbrechen"
                locale="de-DE"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        marginVertical: 6,
        width: 220,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default DateRangePicker;
