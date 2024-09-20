import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const UserRequestSelectionModal = ({ visible, onClose, onSelect, users }) => {
    const handleSelectUser = (user) => {
        onSelect(user)// Close the modal after selection
    };

    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Chọn người thuê phòng</Text>
                    <FlatList
                        data={users}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.userItem} onPress={() => handleSelectUser(item)}>
                                <Image source={{ uri: item.images[0] }} style={styles.userImage} />
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{item.name}</Text>
                                    <Text style={styles.label}>Số CMND: <Text style={styles.value}>{item.cccd}</Text></Text>
                                    <Text style={styles.label}>Số điện thoại: <Text style={styles.value}>{item.phone}</Text></Text>
                                    <Text style={styles.label}>Ngày yêu cầu: <Text style={styles.value}>{item.dateRequest}</Text></Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    value: {
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    closeText: {
        color: 'white',
        fontSize: 16,
    },
});

export default UserRequestSelectionModal;
