import { Tabs } from "expo-router"
import TabBar from '../../components/TabBar'
import { theme } from "@/constants/theme"
import CustomHeader from '../../components/CustomHeader'

export default () => {
    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen name="home"
                options={{
                    title: "Trang chủ",
                    headerShown: false,

                }} />
            {/* <Tabs.Screen
                name="notification"
                options={{
                    title: "Thông báo",
                    headerStyle: {

                        backgroundColor: '#0a7ea4',

                    },
                    headerTintColor: theme.colors.text,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textTransform: 'uppercase',

                    },
                    headerTitleAlign: 'center',
                    headerBackground: () => (
                        <LinearGradient
                            colors={['#0a7ea4', '#56ccf2']} // Specify the colors for the gradient
                            style={{ flex: 1 }}
                        />
                    ),
                }} /> */}
            <Tabs.Screen
                name="notification"
                options={{
                    header: () => <CustomHeader title={"Thông báo"} />,
                    title: "Thông báo",

                }}
            />
            <Tabs.Screen name="post" options={{ title: "Đăng tin" }} />
            <Tabs.Screen name="search" options={{ title: "Tìm phòng" }} />
            <Tabs.Screen name="profile" options={{ title: "Tài khoản" }} />

        </Tabs>

    )
}