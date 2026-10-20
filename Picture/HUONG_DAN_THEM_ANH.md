# 📸 HƯỚNG DẪN THÊM ẢNH CHO TỪNG NGƯỜI NHẬN

Thư mục này hiện tại đã được phân chia theo từng người nhận để bạn dễ dàng quản lý:

### 📂 Cấu trúc thư mục hiện tại:
- `Picture/Trang/` : Chứa 21 ảnh kỷ niệm của bạn Trang (mật khẩu: `051104`)
- `Picture/Me/` : Nơi bạn bỏ ảnh của Mẹ (mật khẩu: `201024`)
- `Picture/BanThan/` : Nơi bạn bỏ ảnh của Bạn Thân (mật khẩu: `201000`)

---

### 🚀 Cách thêm người nhận mới hoặc thêm ảnh:

1. **Thêm ảnh vào thư mục:**
   - Bạn chỉ cần copy các tấm ảnh (định dạng `.jpg`, `.png`, `.jpeg`) bỏ vào thư mục tương ứng của người đó (ví dụ: `Picture/Me/anh1.jpg`).

2. **Cập nhật danh sách ảnh trong `config.js`:**
   - Mở file `config.js`, tìm đến tên người đó trong mục `recipients`.
   - Cập nhật mảng `pictures: [ ... ]`, ví dụ:
   ```javascript
   pictures: [
     "./Picture/Me/anh1.jpg",
     "./Picture/Me/anh2.jpg"
   ]
   ```

3. **Mỗi người có mật khẩu riêng:**
   - Trong `config.js`, bạn có thể đặt `passcode` 6 chữ số riêng cho từng người (ví dụ: sinh nhật của họ).
   - Khi họ mở website và nhập đúng 6 số của họ, web sẽ **tự động** load ảnh, tên và lời chúc riêng của người đó!
   - Ngoài ra bạn cũng có thể gửi link trực tiếp kèm tên: `index.html?user=Trang` hoặc `index.html?user=Me`.
