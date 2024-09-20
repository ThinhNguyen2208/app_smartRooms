import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Caption } from 'react-native-paper'
import MainHeader from "../components/MainHeader";
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'
import CustomHeader from '../components/CustomHeader'
import React from 'react'

const signContract = () => {
    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader style title={'Hợp đồng'} />


        </SafeAreaView>
    )
}

export default signContract

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },



})