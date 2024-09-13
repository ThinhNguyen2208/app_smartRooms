import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COlORS from '../constants/Colors'

const screenWidth = Dimensions.get('screen').width;

const LableForm = ({ title }) => {
    return (
        <View style={styles.containerForm}>
            <Text style={styles.textLable}>{title}</Text>
        </View>
    )
}

export default LableForm

const styles = StyleSheet.create({
    containerForm: {
        width: screenWidth, // Set the width to the entire screen width
        height: 50,
        backgroundColor: COlORS.bgLable,
        justifyContent: 'center', // Center text vertically
        paddingHorizontal: 10,
        alignItems: 'flex-start',
        marginTop: 30
    },

    textLable: {
        color: COlORS.txtLable,
        fontWeight: '600',
        textTransform: 'uppercase'
    }
})