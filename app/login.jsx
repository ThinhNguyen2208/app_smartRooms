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



const login = () => {

    const router = useRouter()
    const phoneRef = useRef("")
    const passwordRef = useRef("")
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        console.log(phoneRef.current, passwordRef.current)
        // đăng nhập thất bại !
        if (!phoneRef.current || !passwordRef.current) {
            Alert.alert('Đăng nhập thất bại, Vui lòng điền thông tin tài khoản!')
        }
        // đăng nhập thành công 
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
                        placeholder='Số điện thoại'
                        keyboardType="numeric"
                        onChangeText={value => { phoneRef.current = value }}
                    />
                    <Input
                        icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                        placeholder='Mật khẩu'
                        secureTextEntry
                        onChangeText={value => { passwordRef.current = value }}
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