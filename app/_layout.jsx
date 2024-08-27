import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { useRoute } from '@react-navigation/native'
import { supabase } from '../lib/supabase'
import { getUserData } from '../services/userServices'

const _layout = () => {
    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    )
}

const MainLayout = () => {
    const { setAuth, setUserData } = useAuth()
    const router = useRouter()
    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log("ss user", session?.user?.id)
            if (session) {
                // setAuth
                setAuth(session?.user)
                updateUserData(session?.user)
                // move screen
                router.replace('/main/home')
            }
            else {
                // setAuth null
                setAuth(null)

                // move to welcom
                router.replace('/welcome')

            }
        })
    }, [])

    const updateUserData = async (user) => {
        let res = await getUserData(user?.id)
        if (res.success) setUserData(res.data)
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false
            }} />
    )
}

export default _layout