import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import RentalContractForm from '../components/modal/RentalContractForm';
import ContractView from '../components/contract/ContractView';
import UserRequetsSelectionModal from '../components/modal/UserRequestSelectionModal'

const CreateContract = () => {
    const [contractDetails, setContractDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isModalUserVisible, setIsModalUserVisible] = useState(true);
    const userRequestContract = [
        {
            id: '421',
            name: 'Nguyễn Hữu Danh',
            images: ['https://example.com/image1.jpg'], // Replace with baseImageUrl
            cccd: '021213212',
            phone: '1231354',
            dateRequest: '19/9/2024',
        },
        {
            id: '422',
            name: 'Nguyễn Hữu Phán',
            images: ['https://example.com/image2.jpg'], // Replace with baseImageUrl
            cccd: '021213213',
            phone: '1231355',
            dateRequest: '20/9/2024',
        },
    ];
    // Handle form submission
    const handleFormSubmit = (details) => {
        setLoading(true);
        setContractDetails(details); // Set the contract details
        setLoading(false);
        setIsFormVisible(false);
        setIsModalUserVisible(false)

    };

    const handleCloseCreate = () => {
        setIsFormVisible(false);
        router.push('/roomManager')
    };

    const handleConfirm = () => {
        // You can add any additional logic you need here before closing the form
        console.log("Confirmed contract details:", contractDetails);
        setIsFormVisible(false);
        // Optionally, navigate to another screen or perform another action
    };

    const handleCloseChoose = () => {

        router.push('/roomManager')
    }
    const handleSelectUserRequest = (user) => {
        console.log(user)
        setIsFormVisible(true)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HỢP ĐỒNG CHO THUÊ</Text>

            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {contractDetails && <ContractView contractDetails={contractDetails} />}

                {
                    isModalUserVisible && <UserRequetsSelectionModal
                        visible={isModalUserVisible}
                        onClose={handleCloseChoose}
                        onSelect={handleSelectUserRequest}
                        users={userRequestContract}
                    />
                }

                {isFormVisible && (
                    <RentalContractForm
                        visible={isFormVisible}
                        initialValues={params}
                        onClose={handleCloseCreate}
                        onSubmit={handleFormSubmit}
                    />
                )}

            </ScrollView>

            {!isFormVisible && (
                <View style={styles.buttonContainer}>
                    <Button title="Xác nhận" onPress={handleConfirm} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
});

export default CreateContract;
