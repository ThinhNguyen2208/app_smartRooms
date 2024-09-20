import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from '@/constants/Colors';
import HorizontalTabBar from '../../components/tabs/HorizontalTabBar'
import RentalList from '../../components/room/RentalList'
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const search = () => {
    const router = useRouter()
    const [selectedTypeRentIndex, setSelectedTypeRentIndex] = useState(0);
    const typeRent = [
        'Phòng trọ',
        'Ký túc xá',
        'Chung cư giá rẻ',
    ]
    const hcmcDistricts = [
        'Quận 1',
        'Quận 2',
        'Quận 3',
        'Quận 4',
        'Quận 5',
        'Quận 6',
        'Quận 7',
        'Quận 8',
        'Quận 9',
        'Quận 10',
        'Quận 11',
        'Quận 12',
        'Quận Bình Thạnh',
        'Quận Bình Tân',
        'Quận Gò Vấp',
        'Quận Phú Nhuận',
        'Quận Tân Bình',
        'Quận Tân Phú',
        'Quận Thủ Đức',
        'Huyện Cần Giờ',
        'Huyện Củ Chi',
        'Huyện Hóc Môn',
        'Huyện Nhà Bè',
    ];
    const generateRentalItems = (numItems) => {
        const baseImageUrl = 'https://sbshouse.vn/wp-content/uploads/2019/11/M%E1%BA%ABu-thi%E1%BA%BFt-k%E1%BA%BF-ph%C3%B2ng-tr%E1%BB%8D-%C4%91%E1%BA%B9p.jpg'
        const itemList = [];

        for (let i = 1; i <= numItems; i++) {
            itemList.push({
                id: i,
                images: [
                    `${baseImageUrl}`,
                    `${baseImageUrl}`,
                    `${baseImageUrl}`,
                    `${baseImageUrl}`,
                    `${baseImageUrl}`,
                    `${baseImageUrl}`,
                    `${baseImageUrl}`,
                    `${baseImageUrl}`,
                    `${baseImageUrl}`,
                ],
                // images: [
                //     `${baseImageUrl}${i * 2 - 1}.jpg`,
                //     `${baseImageUrl}${i * 2}.jpg`,
                // ],
                address: 'Quận 1 tphcm',

                title: `Nhà cho thuê ${i}`,
                description: `Mô tả chi tiết về nhà cho thuê số ${i}. Phòng trọ rộng rãi, gần trung tâm thành phố.`,
                price: `${i * 2000000}`,
                area: i * 10,
                deposit: 2000000
            });
        }

        return itemList;
    };

    const rentalItems = generateRentalItems(10);



    const handleItemPress = (item) => {
        router.push({ pathname: "../detailScreen", params: { id: item.id } });
    };

    return (
        <View style={styles.container}>

            <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0)" />
            <View style={styles.header}>
                <View style={{ paddingBottom: 15 }}>
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>Tìm phòng của bạn ở</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={{

                                fontSize: 30,
                                fontWeight: "bold",
                                color: COLORS.primary,
                            }}
                        >
                            Thành phố Hồ Chí Minh
                        </Text>
                    </View>
                </View>
            </View>


            <TouchableOpacity >
                <View style={styles.searchInputContainer}>
                    <Icon name="search" size={30} style={{ marginLeft: 20 }} />
                    <TextInput
                        placeholder="Tìm kiếm phòng"
                        style={{
                            fontSize: 20,
                            paddingLeft: 10,
                            width: "100%",
                        }}
                    />
                </View>
            </TouchableOpacity>
            <HorizontalTabBar
                data={typeRent}
                selectedIndex={selectedTypeRentIndex}
                setSelectedIndex={setSelectedTypeRentIndex}
            />
            {/* danh sách bài đăng tin */}
            <RentalList items={rentalItems} onItemPress={handleItemPress} />
        </View>
    )
}

export default search

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.white
    },
    header: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },

    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        marginTop: 15,
        marginLeft: 20,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
    },

})