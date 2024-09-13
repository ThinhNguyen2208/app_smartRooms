import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '@/constants/Colors'; // Make sure to define your color constants

const RentalItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>{item.price} VND</Text>
            </View>
        </TouchableOpacity>
    );
};

const RentalList = ({ items, onItemPress }) => {
    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {items.map((item, index) => (
                <RentalItem key={index} item={item} onPress={onItemPress} />
            ))}
        </ScrollView>
    );
};

export default RentalList;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: COLORS.background,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    content: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
});
