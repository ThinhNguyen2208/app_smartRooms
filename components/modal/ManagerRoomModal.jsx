import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../constants/Colors';

const ManagerRoomModal = ({ visible, onClose, hasContract, onCreateContract, onViewContract, onDeleteListing }) => {
    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Conditional render for "Tạo hợp đồng" button */}
                    {!hasContract && (
                        <TouchableOpacity style={styles.button} onPress={onCreateContract}>
                            <Text style={styles.buttonText}>Danh sách yêu cầu hợp đồng</Text>
                        </TouchableOpacity>
                    )}

                    {/* "Xem hợp đồng" button */}
                    <TouchableOpacity style={styles.button} onPress={onViewContract}>
                        <Text style={styles.buttonText}>Xem hợp đồng</Text>
                    </TouchableOpacity>

                    {/* "Xóa tin đăng" button */}
                    <TouchableOpacity style={styles.button} onPress={onDeleteListing}>
                        <Text style={styles.buttonText}>Xóa tin đăng</Text>
                    </TouchableOpacity>

                    {/* Close Modal */}
                    <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
                        <Text style={styles.buttonText}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ManagerRoomModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: COLORS.grey,
    },
});
