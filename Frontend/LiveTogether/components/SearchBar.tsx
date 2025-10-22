import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Text,
    Keyboard,
} from "react-native";

type Props = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    suggestions?: string[];
    onSelectSuggestion?: (s: string) => void;
    showSuggestions?: boolean;
};

const SearchBar: React.FC<Props> = ({
                                        value,
                                        onChangeText,
                                        placeholder,
                                        suggestions = [],
                                        onSelectSuggestion,
                                        showSuggestions,
                                    }) => {
    const renderSuggestion = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => {
                onSelectSuggestion?.(item);
                onChangeText(item);
                Keyboard.dismiss();
            }}

        >
            <Text style={styles.suggestionText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Wrapper für Input + Clear-Button */}
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onBlur={() => onSelectSuggestion?.("")}
                />

                {/* schwarzes X nur anzeigen, wenn Text vorhanden */}
                {value?.length > 0 && (
                    <TouchableOpacity
                        onPress={() => onChangeText("")}
                        style={styles.clearButton}
                    >
                        <Text style={styles.clearButtonText}>×</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Vorschlagsliste */}
            {showSuggestions && suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        data={suggestions}
                        keyExtractor={(item) => item}
                        renderItem={renderSuggestion}
                    />
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    },
    clearButton: {
        paddingHorizontal: 6,
        paddingVertical: 4,
    },
    clearButtonText: {
        fontSize: 20,
        color: "black",
        fontWeight: "600",
    },
    suggestionsContainer: {
        marginTop: 6,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 3,
        maxHeight: 200,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    suggestionItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    suggestionText: {
        fontSize: 15,
    },
});

export default SearchBar;
