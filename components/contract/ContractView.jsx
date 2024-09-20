import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContractView = ({ contractDetails }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
            <Text style={styles.title}>Độc lập – Tự do – Hạnh phúc</Text>

            <Text style={styles.header}>HỢP ĐỒNG THUÊ PHÒNG TRỌ</Text>

            <Text style={styles.date}>
                Hôm nay ngày {contractDetails.date}; tại địa chỉ: {contractDetails.address}
            </Text>

            <Text style={styles.sectionTitle}>Chúng tôi gồm:</Text>

            <Text style={styles.sectionItem}>1. Đại diện bên cho thuê phòng trọ (Bên A):</Text>
            <Text>Ông/bà: {contractDetails.landlordName} Sinh ngày: {contractDetails.landlordBirthDate}</Text>
            <Text>Nơi đăng ký HK: {contractDetails.landlordAddress}</Text>
            <Text>CMND số: {contractDetails.landlordId} cấp ngày: {contractDetails.landlordIdIssueDate}</Text>
            <Text>Số điện thoại: {contractDetails.landlordPhone}</Text>

            <Text style={styles.sectionItem}>2. Bên thuê phòng trọ (Bên B):</Text>
            <Text>Ông/bà: {contractDetails.tenantName} Sinh ngày: {contractDetails.tenantBirthDate}</Text>
            <Text>Nơi đăng ký HK thường trú: {contractDetails.tenantAddress}</Text>
            <Text>Số CMND: {contractDetails.tenantId} cấp ngày: {contractDetails.tenantIdIssueDate}</Text>
            <Text>Số điện thoại: {contractDetails.tenantPhone}</Text>

            <Text style={styles.sectionTitle}>Sau khi bàn bạc trên tinh thần dân chủ, hai bên cùng có lợi, cùng thống nhất như sau:</Text>
            <Text>Bên A đồng ý cho bên B thuê 01 phòng ở tại địa chỉ: {contractDetails.roomAddress}</Text>
            <Text>Giá thuê: {contractDetails.rent} đ/tháng</Text>
            <Text>Hình thức thanh toán: {contractDetails.paymentMethod}</Text>
            <Text>Tiền điện: {contractDetails.electricityCost} đ/kWh tính theo chỉ số công tơ, thanh toán vào cuối các tháng.</Text>
            <Text>Tiền nước: {contractDetails.waterCost} đ/người thanh toán vào đầu các tháng.</Text>
            <Text>Tiền đặt cọc: {contractDetails.deposit}</Text>
            <Text>Hợp đồng có giá trị kể từ ngày {contractDetails.startDate} đến ngày {contractDetails.endDate}.</Text>

            <Text style={styles.sectionTitle}>TRÁCH NHIỆM CỦA CÁC BÊN</Text>
            <Text style={styles.listItem}>- Tạo mọi điều kiện thuận lợi để bên B thực hiện theo hợp đồng.</Text>
            <Text style={styles.listItem}>- Cung cấp nguồn điện, nước, wifi cho bên B sử dụng.</Text>

            <Text style={styles.sectionTitle}>TRÁCH NHIỆM CHUNG</Text>
            <Text style={styles.listItem}>- Hai bên phải tạo điều kiện cho nhau thực hiện hợp đồng.</Text>
            <Text style={styles.listItem}>- Hợp đồng được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ một bản.</Text>

            <Text style={styles.signatures}>ĐẠI DIỆN BÊN B                   ĐẠI DIỆN BÊN A</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        margin: 5,
        paddingBottom: 50,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    date: {
        marginBottom: 10,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
    },
    sectionItem: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    listItem: {
        marginLeft: 20,
        marginBottom: 5,
    },
    signatures: {
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ContractView;
