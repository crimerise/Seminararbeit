import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import {useNavigation, useRouter} from "expo-router";
import Icon from "@expo/vector-icons/Ionicons";
import Signup from "@/app/signup";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const navigation = useNavigation();

    const handleLogin = () => {
        router.replace("/(tabs)/feed");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {/* E-Mail Input */}
            <View style={styles.inputContainer}>
                <Icon name="mail-outline" size={24} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="E-Mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            {/* Passwort Input */}
            <View style={styles.inputContainerPswd}>
                <Icon name="lock-closed-outline" size={24} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Passwort"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <View style={{ paddingTop: 5, justifyContent: 'center' }}>

                {/* Hinweis über dem Login */}
                <Text style={{ fontSize: 15, marginBottom: 30 }}>
                    Noch kein Konto?{' '}
                    <Text
                        style={{ color: 'blue', textDecorationLine: 'underline' }}
                        onPress={() => router.push("/signup")}
                    >
                        Hier
                    </Text>{' '}
                    klicken zum Registrieren.
                </Text>
                </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Einloggen</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 40,
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 16,
        paddingHorizontal: 12,
        height: 50,
    },
    inputContainerPswd: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 5,
        paddingHorizontal: 12,
        height: 50,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        textAlign: "center",
        fontSize: 18,
    },
});
