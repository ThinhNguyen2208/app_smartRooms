// RentDetailsForm.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const RentDetailsForm = ({ area, price, deposit, onAreaChange, onPriceChange, onDepositChange }) => {
    return (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder="Diện tích phòng (m²)"
                value={area}
                onChangeText={onAreaChange}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Giá thuê"
                value={price}
                onChangeText={onPriceChange}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Tiền cọc"
                value={deposit}
                onChangeText={onDepositChange}
                keyboardType="numeric"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        marginVertical: 16,
        marginHorizontal: 10
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderColor: '#CCC',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#FFF',
        fontSize: 16,
        marginBottom: 16,
    },
});

export default RentDetailsForm;
