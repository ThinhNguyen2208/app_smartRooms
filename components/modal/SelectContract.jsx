import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Caption } from 'react-native-paper';
import { useRouter } from 'expo-router';

const SelectContract = ({ visible, onClose }) => {

    const router = useRouter()
    return (
        <Modal transparent={true} visible={visible} animationType="slide" >
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={onClose}>
                <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                    <View style={styles.infoBoxWrapper}>
                        <TouchableOpacity
                            onPress={() => { router.push('/signContract') }}
                            style={[
                                styles.infoBox,
                                {
                                    borderRightColor: "#dddddd",
                                    borderRightWidth: 1,
                                },
                            ]}
                        >
                            <Caption>Kí hợp đồng</Caption>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={[
                                styles.infoBox,
                                {
                                    borderRightColor: "#dddddd",
                                    borderRightWidth: 1,
                                },
                            ]}
                        >
                            <Caption>Hợp đồng của tôi</Caption>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
}

export default SelectContract;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
        height: "50%", // Modal height (half screen)
    },
    infoBoxWrapper: {
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
        borderTopColor: "#dddddd",
        borderTopWidth: 1,
        flexDirection: "row",
        height: 100,
        marginVertical: 10,
    },
    infoBox: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
    },
});
