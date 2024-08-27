import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { theme } from '../../constants/theme'
import { hp } from '../../helpers/common'
const notification = () => {
    return (
        <ScreenWrapper>

        </ScreenWrapper>
    )
}

export default notification

const styles = StyleSheet.create({
    headerNotification: {
        backgroundColor: theme.colors.primary,
        height: hp(20),

    }
})