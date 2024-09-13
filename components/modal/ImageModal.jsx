// ImageModal.tsx
import React from 'react';
import { View, Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons


const ImageModal = ({ visible, imageUri, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onClose}
            animationType="fade"
        >
            <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
                <View style={styles.modalContent}>
                    {imageUri && <Image source={{ uri: imageUri }} style={styles.modalImage} />}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close-circle-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalContent: {
        width: '90%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    modalImage: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        padding: 8,
    },
});

export default ImageModal;
