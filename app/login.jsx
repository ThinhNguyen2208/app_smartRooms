import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { theme } from "../constants/theme";
import Icon from "../assets/icons";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { useRouter } from "expo-router";
import { hp, wp } from "../helpers/common";
import Input from "../components/Input";
import { supabase } from "../lib/supabase";



const login = () => {

    const router = useRouter()
    const [email, setEmail] = useState('thinh@gmail.com')

    const [password, setPassword] = useState('123456')
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        // đăng nhập thất bại !
        if (!email || !password) {
            Alert.alert('Đăng nhập thất bại, Vui lòng điền thông tin tài khoản!')
        }
        else {
            // đăng nhập thành công 
            setLoading(true)
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            setLoading(false)

            console.log("errr", error)
            if (error) {
                Alert.alert("Đăng nhập không thành công", error.message)
            }
        }
    }

    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                <BackButton router={router} />

                {/* welcome */}
                <View>
                    <Text style={styles.welcomeText}>Chào mừng</Text>
                    <Text style={styles.welcomeText}>Bạn trở lại</Text>
                </View>
                {/* form */}
                <View style={styles.form}>
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>Vui lòng đăng nhập để tiếp tục!</Text>

                    <Input
                        icon={<Icon name="call" size={26} strokeWidth={1.6} />}
                        placeholder='Email của bạn'
                        value={email}
                        onChangeText={value => setEmail(value)}
                    />
                    <Input
                        icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                        placeholder='Mật khẩu'
                        value={password}
                        secureTextEntry
                        onChangeText={value => setPassword(value)}
                    />
                    <Text style={styles.forgotPassword}>Quên mật khẩu ?</Text>

                    {/* button */}
                    <Button title={'Đăng nhập'} loading={loading} onPress={onSubmit} />
                </View>

                {/* footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Bạn không có tài khoản?</Text>


                    <Pressable onPress={() => { router.push('signUp') }}>
                        <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>Đăng ký</Text>
                    </Pressable>
                </View>
            </View>

        </ScreenWrapper>
    );
};

export default login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5)
    },
    welcomeText: {
        color: theme.colors.text,
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
    },
    form: {
        gap: 25
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }

});