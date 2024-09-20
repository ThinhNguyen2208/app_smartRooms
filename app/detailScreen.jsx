import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import COLORS from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';
import ImageModal from '../components/modal/ImageModal'

const DetailScreen = ({ route }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisibleImage, setModalVisibleImage] = useState(false);
    //  data 
    const generateRentalItems = (numItems) => {
        const baseImageUrl = 'https://sbshouse.vn/wp-content/uploads/2019/11/M%E1%BA%ABu-thi%E1%BA%BFt-k%E1%BA%BF-ph%C3%B2ng-tr%E1%BB%8D-%C4%91%E1%BA%B9p.jpg';
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
                deposit: 2000000,
                requestList: [

                ]
            });
        }

        return itemList;
    };

    const data = generateRentalItems(10);



    const params = useLocalSearchParams();
    // const rentalData = JSON.parse(params)
    console.log(params)
    const rentalData = data.find((item, index) => {

        return item.id.toString() === params.id
    })
    console.log(rentalData)



    // handle model Image 

    const openImageModal = (uri) => {
        setSelectedImage(uri);
        setModalVisibleImage(true);
    };

    const closeImageModal = () => {
        setModalVisibleImage(false);
        setSelectedImage(null);
    };

    const handleContactowner = () => {
        Linking.openURL(`tel:${'0902123456'}`);
    }
    //  người đăng tin cho thuê
    // Thay đổi thông tin người dùng tại đây
    const owner = {
        name: 'Nguyễn Văn A',
        profileImage: 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg', // URL của hình ảnh đại diện
        numberOfPosts: 12,
        status: 'Đang hoạt động'

    };

    // ennable button
    const [isButtonEnabled, setIsButtonEnabled] = useState(true);

    const handleRequestContract = () => {
        // Your logic for creating the contract goes here

        // Disable the button after clicking
        setIsButtonEnabled(false);
    };

    return (

        <ScrollView contentContainerStyle={styles.container}>
            {/* Image Carousel */}
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.imageCarousel}>
                {rentalData.images.map((imageUri, index) => (

                    <TouchableOpacity onPress={() => openImageModal(imageUri)}>
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Title and Price */}
            <View style={styles.header}>
                <Text style={styles.title}>{rentalData.title}</Text>
                <Text style={styles.price}>{rentalData.price} VND</Text>
            </View>

            {/* Address */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Địa chỉ</Text>
                <Text style={styles.address}>{rentalData.address}</Text>
            </View>

            {/* Description */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mô tả chi tiết</Text>
                <Text style={styles.description}>{rentalData.description}</Text>
            </View>

            {/* Property Details (e.g., square footage, deposit) */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Thông tin thêm</Text>
                <View style={styles.propertyInfo}>
                    <Text style={styles.propertyText}>Diện tích: {rentalData.area} m²</Text>
                    <Text style={styles.propertyText}>Tiền cọc: {rentalData.deposit} VND</Text>
                </View>
            </View>


            {/* Amenities */}
            {/* <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tiện ích</Text>
                {rentalData.amenities?.map((amenity, index) => (
                    <Text key={index} style={styles.amenityText}>
                        - {amenity}
                    </Text>
                ))}
            </View> */}

            {/* Thông tin người cho thuê */}
            <View style={styles.containerUserPost}>
                {/* Hình ảnh đại diện */}
                <Image source={{ uri: owner.profileImage }} style={styles.profileImage} />

                {/* Thông tin người dùng */}
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{owner.name}</Text>
                    <Text style={styles.numberOfPosts}>Số tin đăng: {owner.numberOfPosts}</Text>
                    <Text style={styles.status}>Trạng thái: {owner.status}</Text>
                </View>


            </View>

            {/* Contact Button */}
            <TouchableOpacity style={styles.contactButton} onPress={handleContactowner}>
                <Text style={styles.contactButtonText}>Liên hệ</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.requireButton, !isButtonEnabled && styles.disabledButton]}
                onPress={isButtonEnabled ? handleRequestContract : null} // Only allow action if enabled
                disabled={!isButtonEnabled} // Disable the button when clicked
            >
                <Text style={styles.contactButtonText}> {isButtonEnabled ? `Yêu cầu tạo hợp đồng` : `Đã gửi yêu cầu`} </Text>
            </TouchableOpacity>

            {/* modal */}
            <ImageModal
                visible={modalVisibleImage}
                imageUri={selectedImage}
                onClose={closeImageModal}
            />
        </ScrollView>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: COLORS.white,
    },
    imageCarousel: {
        height: 250,
        marginBottom: 16,
    },
    image: {
        width: 300,
        height: 250,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    address: {
        fontSize: 16,
        color: COLORS.grey,
    },
    description: {
        fontSize: 16,
        color: COLORS.black,
    },
    propertyInfo: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    propertyText: {
        fontSize: 16,
        color: COLORS.black,
    },
    amenityText: {
        fontSize: 16,
        color: COLORS.grey,
    },
    contactButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    requireButton: {
        backgroundColor: "#FF9999",
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#cccccc', // Change color when disabled
    },
    contactButtonText: {
        fontSize: 18,
        color: COLORS.white,
        fontWeight: 'bold',
    },

    // ownner
    containerUserPost: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.white,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    posts: {
        fontSize: 16,
        color: COLORS.grey,
        marginTop: 4,
    },
    status: {
        fontSize: 16,
        color: COLORS.primary,
        marginTop: 4,
    },
});
