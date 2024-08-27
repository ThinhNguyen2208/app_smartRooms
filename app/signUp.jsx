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



const signUp = () => {

    const router = useRouter()
    const [name, setName] = useState('Nguyễn Đức Thịnh')

    const [email, setEmail] = useState('thinh@gmail.com')
    const [password, setPassword] = useState('123456')
    const [loading, setLoading] = useState(false);

    console.log(name)
    const onSubmit = async () => {
        if (email === '' || password === '' || name === '') {
            Alert.alert('Vui lòng điền đầy đủ thông tin')

        } else {
            setLoading(true)

            // đăng ký tai khoản với supabase
            const {
                data: { session },
                error,
            } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name
                    },
                },
            })
            setLoading(false)


            // console.log("error", error)
            // console.log('====================================');
            // console.log("ss", session);
            // console.log('====================================');

            if (error) {
                Alert.alert("Đăng ký không thành công", error.message)

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
                    <Text style={styles.welcomeText}>Đăng ký </Text>
                </View>
                {/* form */}
                <View style={styles.form}>
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>Vui lòng điền thông tin để tạo tài khoản!</Text>

                    <Input
                        icon={<Icon name="user" size={26} strokeWidth={1.6} />}
                        placeholder='Tên của bạn'
                        value={name}
                        onChangeText={(value) => setName(value)}
                    />
                    <Input
                        icon={<Icon name="call" size={26} strokeWidth={1.6} />}
                        placeholder='Email của bạn'
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                    <Input
                        icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                        placeholder='Mật khẩu'
                        value={password}
                        secureTextEntry
                        onChangeText={(value) => setPassword(value)}
                    />

                    {/* button */}
                    <Button title={'Đăng ký'} loading={loading} onPress={onSubmit} />
                </View>

                {/* footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Bạn có tài khoản?</Text>


                    <Pressable onPress={() => { router.push('login') }}>
                        <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>Đăng nhập</Text>
                    </Pressable>
                </View>
            </View>

        </ScreenWrapper>
    );
};

export default signUp;

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