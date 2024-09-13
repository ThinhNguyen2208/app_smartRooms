import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import COLORS from '@/constants/Colors';

const HorizontalTabBar = ({ data, selectedIndex, setSelectedIndex }) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false} // Hide scroll indicator
                contentContainerStyle={styles.wrapTab}
            >
                {data?.map((item, index) => (
                    <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setSelectedIndex(index)}>
                        <View style={styles.tabItem}>
                            <Text
                                style={[
                                    styles.selectListText,
                                    {
                                        color: selectedIndex === index ? COLORS.primary : COLORS.grey,
                                    }
                                ]}
                            >
                                {item}
                            </Text>
                            {selectedIndex === index && (
                                <View
                                    style={styles.indicator}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default HorizontalTabBar;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 30,
    },
    wrapTab: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabItem: {
        marginRight: 20, // Space between tabs
        alignItems: 'center',
    },
    selectListText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    indicator: {
        height: 3,
        width: 30,
        backgroundColor: COLORS.primary,
        marginTop: 2,
    },
});
