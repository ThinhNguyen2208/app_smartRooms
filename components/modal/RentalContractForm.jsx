import React, { useState } from 'react';
import { Modal, View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Button from '../Button'
import RNPickerSelect from 'react-native-picker-select';
import { generatePDF } from '../../helpers/generatePdf'

const RentalContractForm = ({ visible, initialValues, onClose, onSubmit }) => {
    const [contractDetails, setContractDetails] = useState({
        tenantName: 'Nguyễn Hữu Thịnh',
        tenantId: '0123456789789',
        tenantPhone: '0364125665',
        roomAddress: initialValues?.address || '',
        rentalPrice: '5000000',
        deposit: '5000000',
        rentalPeriod: '3',
        startDate: '10/9/2024',
        paymentMethod: 'Tiền mặt',
        electricityCost: '3000',
        waterCost: '5000',
        endDate: '10/12/2024',
    });

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const handleChange = (name, value) => {
        setContractDetails({
            ...contractDetails,
            [name]: value,
        });
    };

    const handleDateConfirm = (date, type) => {
        const formattedDate = moment(date).format('DD/MM/YYYY');
        if (type === 'startDate') {
            handleChange('startDate', formattedDate);
            setStartDatePickerVisibility(false);
        } else {
            handleChange('endDate', formattedDate);
            setEndDatePickerVisibility(false);
        }
    };

    const handleSubmit = async () => {
        // const uri = await generatePDF(contractDetails);

        onSubmit(contractDetails);


        // Close the modal after submission
    };

    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <ScrollView contentContainerStyle={styles.modalContent}>
                    <Text style={styles.title}>Hợp Đồng Thuê Phòng</Text>

                    {/* Label and Input for Tenant Name */}
                    <Text style={styles.label}>Tên người thuê</Text>
                    <TextInput
                        placeholder="Tên người thuê"
                        style={styles.input}
                        value={contractDetails.tenantName}
                        onChangeText={(value) => handleChange('tenantName', value)}
                    />

                    {/* Label and Input for Tenant ID */}
                    <Text style={styles.label}>Số CMND</Text>
                    <TextInput
                        placeholder="Số CMND"
                        style={styles.input}
                        value={contractDetails.tenantId}
                        onChangeText={(value) => handleChange('tenantId', value)}
                    />

                    {/* Label and Input for Tenant Phone */}
                    <Text style={styles.label}>Số điện thoại</Text>
                    <TextInput
                        placeholder="Số điện thoại"
                        style={styles.input}
                        value={contractDetails.tenantPhone}
                        onChangeText={(value) => handleChange('tenantPhone', value)}
                    />

                    {/* Label and Input for Room Address */}
                    <Text style={styles.label}>Địa chỉ phòng</Text>
                    <TextInput
                        placeholder="Địa chỉ phòng"
                        style={styles.input}
                        value={contractDetails.roomAddress}
                        onChangeText={(value) => handleChange('roomAddress', value)}
                    />

                    {/* Label and Input for Rental Price */}
                    <Text style={styles.label}>Giá thuê</Text>
                    <TextInput
                        placeholder="Giá thuê"
                        style={styles.input}
                        value={contractDetails.rentalPrice}
                        onChangeText={(value) => handleChange('rentalPrice', value)}
                        keyboardType="numeric"
                    />

                    {/* Label and Input for Deposit */}
                    <Text style={styles.label}>Tiền đặt cọc</Text>
                    <TextInput
                        placeholder="Tiền đặt cọc"
                        style={styles.input}
                        value={contractDetails.deposit}
                        onChangeText={(value) => handleChange('deposit', value)}
                        keyboardType="numeric"
                    />

                    {/* Label and Input for Rental Period */}
                    <Text style={styles.label}>Thời gian thuê</Text>
                    <TextInput
                        placeholder="Thời gian thuê"
                        style={styles.input}
                        value={contractDetails.rentalPeriod}
                        onChangeText={(value) => handleChange('rentalPeriod', value)}
                    />

                    {/* Label and Date Picker for Start Date */}
                    <Text style={styles.label}>Ngày bắt đầu</Text>
                    <TouchableOpacity onPress={() => setStartDatePickerVisibility(true)}>
                        <TextInput
                            placeholder="Ngày bắt đầu"
                            style={styles.input}
                            value={contractDetails.startDate}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isStartDatePickerVisible}
                        mode="date"
                        onConfirm={(date) => handleDateConfirm(date, 'startDate')}
                        onCancel={() => setStartDatePickerVisibility(false)}
                    />

                    {/* Label and Date Picker for End Date */}
                    <Text style={styles.label}>Ngày kết thúc</Text>
                    <TouchableOpacity onPress={() => setEndDatePickerVisibility(true)}>
                        <TextInput
                            placeholder="Ngày kết thúc"
                            style={styles.input}
                            value={contractDetails.endDate}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isEndDatePickerVisible}
                        mode="date"
                        onConfirm={(date) => handleDateConfirm(date, 'endDate')}
                        onCancel={() => setEndDatePickerVisibility(false)}
                    />

                    {/* Label and Picker for Payment Method */}
                    <Text style={styles.label}>Hình thức thanh toán</Text>
                    <RNPickerSelect
                        placeholder={{ label: 'Chọn hình thức thanh toán', value: '' }}
                        onValueChange={(value) => handleChange('paymentMethod', value)}
                        value={contractDetails.paymentMethod}
                        items={[
                            { label: 'Tiền mặt', value: 'Tiền mặt' },
                            { label: 'Chuyển khoản', value: 'Chuyển khoản' },
                        ]}
                        style={pickerSelectStyles}
                    />

                    {/* Label and Input for Electricity Cost */}
                    <Text style={styles.label}>Tiền điện</Text>
                    <TextInput
                        placeholder="Tiền điện"
                        style={styles.input}
                        value={contractDetails.electricityCost}
                        onChangeText={(value) => handleChange('electricityCost', value)}
                        keyboardType="numeric"
                    />

                    {/* Label and Input for Water Cost */}
                    <Text style={styles.label}>Tiền nước</Text>
                    <TextInput
                        placeholder="Tiền nước"
                        style={styles.input}
                        value={contractDetails.waterCost}
                        onChangeText={(value) => handleChange('waterCost', value)}
                        keyboardType="numeric"
                    />

                    <View style={styles.buttonContainer}>
                        <Button title="Tạo hợp đồng" onPress={handleSubmit} />
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        color: 'black', // For iOS
    },
    inputAndroid: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        color: 'black', // For Android
    },
});

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
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    buttonContainer: {
        marginTop: 20,
    },
    closeButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    closeText: {
        color: 'red',
    },
});

export default RentalContractForm;
