import { View, Text, Button, Image, Modal, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useState } from 'react';
import AdressModal from '../../components/modal/AdressModal';
import { useFocusEffect, useRouter } from 'expo-router';
import COLORS from '@/constants/Colors';
import LableForm from '../../components/LableForm'
import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import { Ionicons } from '@expo/vector-icons';
import ImageModal from '../../components/modal/ImageModal'
import RentDetailsForm from '../../components/form/RentDetailsForm'

const Post = () => {
    const [images, setImages] = useState<string[]>([]);
    const router = useRouter();
    const [isModalVisible, setModalVisible] = useState(true);
    const [modalAdress, setModalAdress] = useState(false);
    const [selectedTypeRent, setelectedTypeRent] = useState<string | null>(null);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [hasMezzanine, setHasMezzanine] = useState(false);
    const [description, setDescription] = useState('');

    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [deposit, setDeposit] = useState(''); // tiền cọc


    const typeRent = ['Phòng trọ', 'Ký túc xá', 'Chung cư'];

    // modal
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [modalVisibleImage, setModalVisibleImage] = useState(false);


    // Pick images
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
            selectionLimit: 9 - images.length,
        });

        if (!result.canceled) {
            setImages(prevImages => [...prevImages, ...result.assets.map(asset => asset.uri!)]);
        }
    };
    const handleDeleteImage = (uri: string) => {
        setImages(images.filter(image => image !== uri));
    };

    // Handle modals
    useFocusEffect(
        useCallback(() => {
            setModalVisible(true);
        }, [])
    );

    const closeModal = () => {
        setModalVisible(false);
        router.push('/home');
    };

    const selectCategory = (category: string) => {
        setelectedTypeRent(category);
        setModalVisible(false);
    };

    const handleOpenModalAdress = () => {
        setModalAdress(true);
    };

    const handleCloseModalAdress = () => {
        setModalAdress(false);
    };

    const handleSelectAddress = (address: string) => {
        setSelectedAddress(address);
        address && setModalAdress(false);
    };


    // handle model Image 

    const openImageModal = (uri: string) => {
        setSelectedImage(uri);
        setModalVisibleImage(true);
    };

    const closeImageModal = () => {
        setModalVisibleImage(false);
        setSelectedImage(null);
    };

    const handlePost = () => {
        // Handle posting logic here
        alert('Tin đăng đã được gửi');
    };
    //  tiêu đề tin đăng
    const [titlePost, setTitlePost] = useState('');
    const [charCount, setCharCount] = useState(titlePost.length);

    const handleChangeText = (text: string) => {
        if (text.length <= 70) {
            setTitlePost(text);
            setCharCount(text.length);
        }
    };
    return (
        <View style={styles.container} >
            <Text style={styles.title}>Đăng Tin Cho Thuê Nhà</Text>
            <ScrollView style={styles.container}>
                <View >

                    {/* Loại cho thuê */}
                    <TextInput
                        style={styles.selectButton}
                        placeholder="Nhập mô tả cho tin đăng"
                        value={`Danh mục cho thuê: ${selectedTypeRent}`}
                        editable={false} // Make the input read-only
                        placeholderTextColor="#888"
                    />
                    {/* Địa chỉ */}
                    <LableForm title="Địa chỉ và Hình ảnh" />
                    <TouchableOpacity onPress={handleOpenModalAdress} style={styles.selectButton}>
                        <Text style={styles.selectText}>{selectedAddress ? selectedAddress : 'Chọn địa chỉ'}</Text>
                    </TouchableOpacity>

                    {/* Hình ảnh */}
                    <View style={styles.wrapImageBtn}>
                        <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                            <Ionicons name="camera-outline" size={30} color="#007BFF" style={styles.cameraIcon} />
                            <Text style={styles.buttonText}>Chọn ảnh</Text>
                        </TouchableOpacity>
                        <View style={styles.imageContainer}>
                            {images.map((uri, index) => (
                                <View key={index} style={styles.imageWrapper}>
                                    <TouchableOpacity onPress={() => openImageModal(uri)}>
                                        <Image source={{ uri }} style={styles.image} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDeleteImage(uri)} style={styles.deleteButton}>
                                        <Ionicons name="close-circle-outline" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* diên tich va giá */}
                    <LableForm title="Diện tích và giá" />
                    <RentDetailsForm
                        area={area}
                        price={price}
                        deposit={deposit}
                        onAreaChange={setArea}
                        onPriceChange={setPrice}
                        onDepositChange={setDeposit}
                    />
                    {/* Mô tả */}
                    <LableForm title="Tiêu đề đăng tin và Mô tả chi tiết" />
                    <View style={styles.wrapTitlePost}>
                        <TextInput
                            style={styles.inputTitle}
                            placeholder="Tiêu đề đăng tin"
                            value={titlePost}
                            onChangeText={handleChangeText}
                            maxLength={70}
                        />
                        <Text style={styles.charCount}>{charCount}/70 kí tự</Text>
                    </View>
                    <TextInput
                        style={styles.inputdesPost}
                        placeholder="Nhập mô tả cho tin đăng"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        scrollEnabled // Ensures the input is scrollable
                        textAlignVertical="top" // Aligns text to the top
                    />

                    {/* Nút đăng */}
                    <View>
                        <TouchableOpacity onPress={handlePost} style={styles.postButton}>
                            <Text style={styles.postButtonText}>Đăng tin</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Modal */}
                <AdressModal
                    visible={modalAdress}
                    onClose={handleCloseModalAdress}
                    onSelectAddress={handleSelectAddress}
                />
                <ImageModal
                    visible={modalVisibleImage}
                    imageUri={selectedImage}
                    onClose={closeImageModal}
                />
                <Modal
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                    transparent={true}
                    animationType="slide"
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Chọn loại cho thuê</Text>
                            <TouchableOpacity onPress={closeModal}>
                                <Text style={styles.closeButton}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.modalBody}>
                            {typeRent.map((category, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.modalOption}
                                    onPress={() => selectCategory(category)}
                                >
                                    <Text style={styles.modalOptionText}>{category}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </Modal>
            </ScrollView>
        </View >

    );
};

export default Post;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        maxHeight: hp(95),

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        marginTop: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        // marginVertical: 8,
        color: '#333',
    },

    // image
    wrapImageBtn: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    imageButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 16
    },
    cameraIcon: {
        marginRight: 8,
    },
    buttonText: {
        fontSize: 16,
        color: '#007BFF',
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    imageWrapper: {
        position: 'relative',
        margin: 4,
    },
    image: {
        width: 100,
        height: 100,
        margin: 4,
        borderRadius: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 4,
    },

    selectButton: {
        margin: 10,
        padding: 12,
        borderRadius: 5,
        borderColor: '#CCC',
        borderWidth: 1,
        marginBottom: 0
    },
    selectText: {
        fontSize: 16,
        color: '#CCC',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    input: {
        borderColor: '#CCC',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#FFF',
        fontSize: 16,
        marginBottom: 16,
    },
    // địa chỉ
    addressInput: {
        borderColor: '#CCC',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    // tiêu đề đăng tin
    wrapTitlePost: {
        marginVertical: 16,
        marginHorizontal: 10
    },
    charCount: {
        textAlign: 'left',
        fontSize: 12,
        color: '#ddd',
        paddingHorizontal: 10

    },
    inputTitle: {
        borderColor: '#CCC',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#FFF',
        fontSize: 16,
    },
    inputdesPost: {
        borderColor: '#CCC',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#FFF',
        fontSize: 16,
        minHeight: 100, // Ensures a minimum height for the input
        maxHeight: 200, // Maximum height to control the scroll area
        textAlignVertical: 'top', // Aligns text to the top
        marginHorizontal: 10
    },


    postButton: {
        marginHorizontal: 10,
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        marginVertical: 30,
        alignItems: 'center',
    },
    postButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red',
    },
    modalBody: {
        flex: 1,
    },
    modalOption: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalOptionText: {
        fontSize: 18,
        color: '#333',
    },
});
