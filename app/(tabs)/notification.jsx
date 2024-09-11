import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useState } from 'react'
import { ActivityIndicator } from "react-native-paper";
import MainHeader from "../../components/MainHeader";
import { theme } from '../../constants/theme'
import { hp } from '../../helpers/common'
const notification = () => {
    const [loading, isLoading] = useState(false)

    return (
        <SafeAreaView>
            <MainHeader title="Thông báo" />

            {!isLoading && (
                <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator />
                </View>
            )}
            <View style={styles.wrapContent}>
                <Image source={require("../../assets/images/notification/notification.png")} style={{ width: "100%", height: 300 }} />
                <Text style={styles.heading}>Không có thông báo ngay bây giờ!</Text>
            </View>



        </SafeAreaView>
    )
}


export default notification

const styles = StyleSheet.create({
    headerNotification: {
        backgroundColor: theme.colors.primary,
        height: hp(20),

    },
    wrapContent: {
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        gap: 10,
        flexDirection: "column",
        height: "100%",
        marginTop: "30%",
    },

})