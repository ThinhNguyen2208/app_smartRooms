import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

const Home = () => {
    const { user, setAuth } = useAuth()
    console.log("user", user)

    const onLogout = () => {
        const { error } = supabase.auth.signOut()

        if (error) {
            Alert.alert("Đăng xuất thất bại!")
        }
    }
    return (

        <ScreenWrapper>
            <Text>home</Text>
            <Button title='đăng xuất' onPress={onLogout} />
        </ScreenWrapper>
    )
}

export default Home

const styles = StyleSheet.create({})