import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/Colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import RentalList from '../components/room/RentalList';
import { useRouter } from 'expo-router';
import ManagerRoomModal from '../components/modal/ManagerRoomModal';

const RoomManager = () => {
    const router = useRouter();
    const [modalVisibleManager, setModalVisibleManger] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Sample function to generate rental items
    const generateRentalItems = (numItems) => {
        const baseImageUrl = 'https://sbshouse.vn/wp-content/uploads/2019/11/M%E1%BA%ABu-thi%E1%BA%BFt-k%E1%BA%BF-ph%C3%B2ng-tr%E1%BB%8D-%C4%91%E1%BA%B9p.jpg';
        const itemList = [];

        for (let i = 1; i <= numItems; i++) {
            itemList.push({
                id: i,
                images: [baseImageUrl],
                address: 'Quận 1 TPHCM',
                title: `Nhà cho thuê ${i}`,
                description: `Mô tả chi tiết về nhà cho thuê số ${i}. Phòng trọ rộng rãi, gần trung tâm thành phố.`,
                price: `${i * 2000000}`,
                hasContract: i % 2 === 0,// Example: Every 2nd item has a contract
                requestList: [
                    {
                        id: '421',
                        name: 'Nguyễn Hữu Danh',
                        images: [baseImageUrl],
                        cccd: '021213212',
                        phone: '1231354',
                        dateRequest: '19/9/2024'
                    },
                    {
                        id: '422',
                        name: 'Nguyễn Hữu Phán',
                        images: [baseImageUrl],
                        cccd: '021213212',
                        phone: '1231354',
                        dateRequest: '19/9/2024'
                    },
                ]

            });
        }

        return itemList;
    };

    const rentalItems = generateRentalItems(10);

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setModalVisibleManger(true);
    };

    // Modal action handlers
    const handleCreateContract = () => {
        setModalVisibleManger(false);

        router.push({ pathname: '/createContract', params: { ...selectedItem } });
    };

    const handleViewContract = () => {
        setModalVisibleManger(false);
        alert('Xem hợp đồng của ' + selectedItem.title);
    };

    const handleDeleteListing = () => {
        setModalVisibleManger(false);
        alert('Xóa tin đăng ' + selectedItem.title);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0)" />
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>Quản lý Phòng cho thuê</Text>
            </View>

            <TouchableOpacity>
                <View style={styles.searchInputContainer}>
                    <Icon name="search" size={30} style={{ marginLeft: 20 }} />
                    <TextInput
                        placeholder="Tìm kiếm phòng"
                        style={{ fontSize: 20, paddingLeft: 10, width: "100%" }}
                    />
                </View>
            </TouchableOpacity>

            {/* Rental List */}
            <RentalList items={rentalItems} onItemPress={handleItemPress} />

            {/* Contract Modal */}
            {selectedItem && (
                <ManagerRoomModal
                    visible={modalVisibleManager}
                    onClose={() => setModalVisibleManger(false)}
                    hasContract={selectedItem.hasContract}
                    onCreateContract={handleCreateContract}
                    onViewContract={handleViewContract}
                    onDeleteListing={handleDeleteListing}
                />
            )}
        </View>
    );
};

export default RoomManager;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.light,
        borderRadius: 8,
        margin: 20,
        paddingHorizontal: 15,
    },
});
