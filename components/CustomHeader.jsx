// CustomHeader.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import from Expo (optional)

const CustomHeader = ({ title }) => {
    return (
        <LinearGradient
            colors={["#1D976C", "#93F9B9"]} // Gradient colors
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>

            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        height: 80,
        borderRadius: 18
    },
    header: {
        width: '100%',
        height: '100%', // Điều chỉnh chiều cao cho phù hợp
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 12
    },
    headerTitle: {
        color: '#ffffff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default CustomHeader;
