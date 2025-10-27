import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";
import { useRouter } from "expo-router";
import Icon from "@expo/vector-icons/Ionicons";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import {useUser} from "@/components/UserContext";
import * as ImagePicker from "expo-image-picker";



export default function Signup() {
    const[firstname, setFirstname] = useState("");
    const[lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false); // NEU
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const { login } = useUser();
    const [image, setImage] = useState<string | null>(null);



    const handleLogin = () => {
        router.replace("/(tabs)/feed");
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Erlaubnis erforderlich, um Bilder auszuwählen!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value){
            setEmailError(true);
            return "Bitte gib eine E-Mail-Adresse ein.";
        }
        if (!emailRegex.test(value)){
            setEmailError(true);
            return "Bitte gib eine gültige E-Mail-Adresse ein.";
        }
        setEmailError(false)
        return "";
    };
    const validateName = (value, fieldName) => {
        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'’-]+)*$/;
        const setErrorState =
            fieldName === "Vorname" ? setFirstNameError : setLastNameError;

        if (!value){
            setErrorState(true);
            return `Bitte gib deinen ${fieldName} ein.`;
        }

        if (value.length < 2){
            setErrorState(true);
            return `${fieldName} muss mindestens 2 Zeichen lang sein.`;
        }

        if (value.length > 50){
            setErrorState(true);
            return `${fieldName} darf höchstens 50 Zeichen lang sein.`;
        }

        if (!nameRegex.test(value)){
            setErrorState(true);
            return `${fieldName} darf nur Buchstaben, Bindestriche, Apostrophe und einfache Leerzeichen enthalten.`;
        }
        setErrorState(false);
        return "";
    }

    const validatePassword = (value) => {
        // Mindestens 8 Zeichen, 1 Großbuchstabe, 1 Zahl
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!value) {
            setPasswordError(true);
            return "Bitte gib ein Passwort ein.";
        }

        if (!passwordRegex.test(value)) {
            setPasswordError(true);
            return "Das Passwort muss:\n• mindestens 8 Zeichen lang sein\n• einen Großbuchstaben enthalten\n• eine Zahl enthalten.";
        }
        setPasswordError(false);
        return "";
    };


    const handleSubmit = () => {
        Keyboard.dismiss()
        setSubmitted(true); // zeigt Fehlertexte an
        const firstNameErrorMsg = validateName(firstname.trim(), "Vorname")
        const lastNameErrorMsg = validateName(lastname.trim(), "Nachname");
        const emailErrorMsg = validateEmail(email.trim());
        const passwordErrorMsg = validatePassword(password.trim());

        if (firstNameErrorMsg || lastNameErrorMsg || emailErrorMsg || passwordErrorMsg) {
            setError(firstNameErrorMsg || lastNameErrorMsg || emailErrorMsg || passwordErrorMsg);
            return; // stoppe Navigation
        }

        // wenn alles gültig
        setError("");

        // User Information speichern
        login(`${firstname.trim()} ${lastname.trim()}`, email.trim(), image ?? undefined);

        handleLogin();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View >
            <Text style={styles.title}>Konto erstellen</Text>

            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>+</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Vorname Input */}
            <View style={
                [styles.inputContainer,
                    submitted && firstNameError ? styles.inputError : null
                ]}>
                <Icon name="person-outline" size={24} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Vorname"
                    value={firstname}
                    onChangeText={setFirstname}
                    keyboardType="default"
                    autoCapitalize="words"
                />
            </View>

            {/* Nachname Input */}
            <View style={
                [styles.inputContainer,
                    submitted && lastNameError ? styles.inputError : null
                ]}>
                <Icon name="person" size={24} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nachname"
                    value={lastname}
                    onChangeText={setLastname}
                    keyboardType="default"
                    autoCapitalize="words"
                />
            </View>

            {/* E-Mail */}
            <View style={
                [styles.inputContainer,
                    submitted && emailError ? styles.inputError : null
            ]}>
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
            <View style={
                [styles.inputContainer,
                    submitted && passwordError ? styles.inputError : null
                ]}>
                <Icon name="lock-closed-outline" size={24} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Passwort"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            {/* Nur anzeigen, wenn auf "Registrieren" gedrückt wurde */}
            {submitted && error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Registrieren</Text>
            </TouchableOpacity>
        </View>
                </TouchableWithoutFeedback>

            </ScrollView>
        </KeyboardAvoidingView>
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
        marginBottom: 30,
        textAlign: "center",
    },
    imageContainer: {
        marginBottom: 20,
        alignSelf: "center"
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    placeholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        fontSize: 36,
        color: "#888",
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
    inputError: {
        borderColor: 'red',
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
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
