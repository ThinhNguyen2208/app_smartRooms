import { View, Text, Button, Image, Modal, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect, useState } from 'react'
import AdressModal from '../../components/AdressModal'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { TextInput } from 'react-native-paper';


const post = () => {
    const [images, setImages] = useState<string[]>([]);
    const router = useRouter();
    const [isModalVisible, setModalVisible] = useState(true);
    const [modalAdress, setModalAdress] = useState(false);
    // thông tin
    const [selectedTypeRent, setelectedTypeRent] = useState<string | null>(null); //loại cho thue
    const [address, setAddress] = useState(''); // Địa chỉ
    const [selectedAddress, setSelectedAddress] = useState('');




    const typeRent = ['Phòng trọ', 'Ký túc xá', 'Chung cư']
    // ảnh
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


    // xử lý modal chọn loại cho thuê
    useFocusEffect(
        useCallback(() => {
            // Mở modal khi quay lại màn hình
            setModalVisible(true);

        }, [])
    );

    const closeModal = () => {
        setModalVisible(false);
        // Chuyển đến màn hình khác khi đóng modal
        router.push('/home');
    };

    const selectCategory = (category: string) => {
        setelectedTypeRent(category);
        setModalVisible(false)
    };

    // Xử lý địa chỉ
    const handleOpenModalAdress = () => {
        setModalAdress(true);
    };

    const handleCloseModalAdress = () => {
        setModalAdress(false);
    };

    const handleSelectAddress = (address: React.SetStateAction<string>) => {
        setSelectedAddress(address);
        console.log(address)
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.title}>Đăng Tin Cho Thuê Nhà</Text>

            <Text>Loại cho thuê: {selectedTypeRent}</Text>

            <TouchableOpacity onPress={handleOpenModalAdress} style={styles.selectButton}>
                <Text style={styles.selectText}>{selectedAddress ? selectedAddress : 'Chọn địa chỉ'}</Text>
            </TouchableOpacity>
            <Button title="Chọn ảnh" onPress={pickImage} />

            <View style={styles.imageContainer}>
                {images.map((uri, index) => (
                    <Image key={index} source={{ uri }} style={styles.image} />
                ))}
            </View>

            {/* Thêm các trường thông tin khác tại đây */}

            {/* Modal */}
            <AdressModal
                visible={modalAdress}
                onClose={handleCloseModalAdress}
                onSelectAddress={handleSelectAddress}
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
    );
}

export default post
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        margin: 4,
    },
    // địa chỉ
    selectButton: {
        padding: 12,
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        borderColor: '#CCC',
        borderWidth: 1,
        marginBottom: 20,
    },
    selectText: {
        fontSize: 16,
        color: '#555',
    },
    addressInput: {
        borderColor: '#CCC',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    // modal

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