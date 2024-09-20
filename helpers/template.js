export const renderContractTemplate = (contractDetails) => {
    return `
      <html>
        <body>
          <h1 style="text-align: center;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
          <h2 style="text-align: center;">Độc lập – Tự do – Hạnh phúc</h2>
          <h2 style="text-align: center;">HỢP ĐỒNG THUÊ PHÒNG TRỌ</h2>
  
          <p>Hôm nay ngày ${contractDetails.currentDay} tháng ${contractDetails.currentMonth} năm ${contractDetails.currentYear}; tại địa chỉ: ${contractDetails.address}</p>
  
          <p>Chúng tôi gồm:</p>
  
          <p>1. Đại diện bên cho thuê phòng trọ (Bên A):</p>
          <p>Ông/bà: ${contractDetails.landlordName} - Sinh ngày: ${contractDetails.landlordDob}</p>
          <p>Nơi đăng ký HK: ${contractDetails.landlordAddress}</p>
          <p>CMND số: ${contractDetails.landlordId} - cấp ngày ${contractDetails.landlordIdDate} tại: ${contractDetails.landlordIdPlace}</p>
          <p>Số điện thoại: ${contractDetails.landlordPhone}</p>
  
          <p>2. Bên thuê phòng trọ (Bên B):</p>
          <p>Ông/bà: ${contractDetails.tenantName} - Sinh ngày: ${contractDetails.tenantDob}</p>
          <p>Nơi đăng ký HK thường trú: ${contractDetails.tenantAddress}</p>
          <p>Số CMND: ${contractDetails.tenantId} - cấp ngày ${contractDetails.tenantIdDate} tại: ${contractDetails.tenantIdPlace}</p>
          <p>Số điện thoại: ${contractDetails.tenantPhone}</p>
  
          <p>Sau khi bàn bạc trên tinh thần dân chủ, hai bên cùng có lợi, cùng thống nhất như sau:</p>
  
          <p>Bên A đồng ý cho bên B thuê 01 phòng ở tại địa chỉ: ${contractDetails.roomAddress}</p>
          <p>Giá thuê: ${contractDetails.rentalPrice} đ/tháng</p>
          <p>Hình thức thanh toán: ${contractDetails.paymentMethod}</p>
  
          <p>Tiền điện ${contractDetails.electricityCost} đ/kwh, thanh toán vào cuối các tháng.</p>
          <p>Tiền nước: ${contractDetails.waterCost} đ/người, thanh toán vào đầu các tháng.</p>
          <p>Tiền đặt cọc: ${contractDetails.deposit}</p>
  
          <p>Hợp đồng có giá trị kể từ ngày ${contractDetails.startDate} đến ngày ${contractDetails.endDate}</p>
  
          <h3>TRÁCH NHIỆM CỦA CÁC BÊN</h3>
          <p>* Trách nhiệm của bên A:</p>
          <ul>
            <li>Tạo mọi điều kiện thuận lợi để bên B thực hiện theo hợp đồng.</li>
            <li>Cung cấp nguồn điện, nước, wifi cho bên B sử dụng.</li>
          </ul>
  
          <p>* Trách nhiệm của bên B:</p>
          <ul>
            <li>Thanh toán đầy đủ các khoản tiền theo đúng thỏa thuận.</li>
            <li>Bảo quản các trang thiết bị và cơ sở vật chất của bên A trang bị cho ban đầu.</li>
            <li>Không được tự ý sửa chữa, cải tạo cơ sở vật chất khi chưa được sự đồng ý của bên A.</li>
          </ul>
  
          <h3>TRÁCH NHIỆM CHUNG</h3>
          <ul>
            <li>Hai bên phải tạo điều kiện cho nhau thực hiện hợp đồng.</li>
            <li>Nếu vi phạm hợp đồng, bên vi phạm phải bồi thường thiệt hại cho bên còn lại.</li>
          </ul>
  
          <p>Hợp đồng được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ một bản.</p>
  
          <p>ĐẠI DIỆN BÊN A: ${contractDetails.landlordName} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ĐẠI DIỆN BÊN B: ${contractDetails.tenantName}</p>
        </body>
      </html>
    `;
};
