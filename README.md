# 🌹 Website Mừng Ngày Phụ Nữ Việt Nam 20/10

Trang web tương tác đặc biệt và lãng mạn dành riêng cho ngày 20/10.

---

## ✨ Bố Cục & Các Màn Hình Hoạt Động

1. **Màn hình 1 - Nhập Mật Mã:**
   - Yêu cầu nhập mã PIN gồm đúng 6 chữ số (mặc định là `201024`).
   - Hỗ trợ bàn phím số cảm ứng trên màn hình lẫn bàn phím máy tính/điện thoại.
   - Nhập đúng sẽ tự động chuyển cảnh sang màn hình tiếp theo.

2. **Màn hình 2 - Hoa Hồng Nở Rộ & Lời Chúc 20/10:**
   - Đóa hoa hồng đồ họa SVG với hoạt ảnh bung nở cánh từng lớp tuyệt đẹp.
   - Hiển thị lời chúc mừng ngày 20/10 ấm áp.
   - Dòng chữ: *"Có 1 món quà đặc biệt tặng người [Tên người]..."* cùng nút **"Mở quà ngay 🎁"**.

3. **Màn hình 3 - Cơn Mưa Kỷ Niệm (Folder Picture):**
   - Các bức ảnh từ thư mục `Picture/` rơi liên tục như cơn mưa kỷ niệm.
   - **Chạm/Click vào bất kỳ bức ảnh nào** sẽ mở bảng phóng to (Lightbox) sắc nét để ngắm nhìn.
   - Khung câu hỏi: *"Có 1 món quà bí mật có muốn nhận không?"* với 2 nút:
     - Nút **"Không 🙈"**: Tinh nghịch nhắc nhở hoặc né tránh.
     - Nút **"Có! Nhận ngay ✨"**: Mở màn hình trái tim kết thúc.

4. **Màn hình 4 - Trái Tim Kỷ Niệm & Bức Tâm Thư:**
   - Toàn bộ các bức ảnh trong thư mục `Picture/` được sắp xếp cân đối thành một **hình trái tim toán học hoàn mỹ** với nhịp đập ánh sáng rạng rỡ ở trung tâm.
   - Bên dưới là bức thư chứa các lời nhắn gửi yêu thương, chân thành.

5. **Âm nhạc nền:**
   - Hỗ trợ phát nhạc trực tiếp từ **bất kỳ link YouTube** nào bạn cấu hình.
   - Nếu không cài link YouTube hoặc link lỗi, web tự động chuyển sang giai điệu piano Canon lãng mạn tích hợp sẵn (100% không bao giờ lo mất tiếng).

---
## 🛠️ Hướng Dẫn Tùy Chỉnh (File `config.js`)

Mọi thông số bạn cần thay đổi đều nằm sẵn ở file **[`config.js`](./config.js)** với chú thích tiếng Việt rất rõ ràng:

1. **Đổi mật khẩu 6 số:** Sửa dòng `passcode: "201024"` thành 6 số bạn muốn (ví dụ: ngày sinh nhật `250802`).
2. **Chèn link nhạc YouTube:** Sửa dòng `youtubeUrl: "..."` thành bất kỳ link YouTube nào bạn thích (dạng `https://www.youtube.com/watch?v=...` hoặc `https://youtu.be/...`). Nếu để trống `""`, web sẽ phát nhạc piano lãng mạn có sẵn.
3. **Đổi tên người nhận:** Sửa dòng `recipientName: "Em"` thành tên hoặc biệt danh của người đó (ví dụ: `"Phương Anh"`, `"Bé Yêu"`, `"Mẹ yêu"`,...).
4. **Đổi lời chúc hoa hồng:** Sửa nội dung trong mục `roseGreeting`.
5. **Đổi các dòng chữ dưới hình trái tim:** Sửa các câu trong mảng `finalLetter`.
6. **Thêm/bớt ảnh:** Thêm file ảnh vào thư mục `Picture/` và thêm đường dẫn vào mảng `pictures` trong `config.js`.

---

## 🚀 Hướng Dẫn Đưa Lên GitHub Pages (Miễn Phí & Dễ Dàng)

Trang web được thiết kế bằng chuẩn thuần HTML, CSS, JavaScript với đường dẫn tương đối (`./`), hoàn toàn tương thích 100% với **GitHub Pages**:

1. Đẩy mã nguồn lên repository GitHub của bạn:
   ```bash
   git add .
   git commit -m "Mung ngay 20-10 web"
   git branch -M main
   git push -u origin main
   ```
2. Trên GitHub, vào mục **Settings** của repository.
3. Ở menu bên trái, chọn **Pages**.
4. Tại mục **Build and deployment** -> **Branch**:
   - Chọn nhánh **`main`** (hoặc `master`).
   - Thư mục chọn **`/(root)`**.
   - Bấm **Save**.
5. Đợi khoảng 1 - 2 phút, GitHub sẽ cung cấp cho bạn một đường link website (dạng `https://<ten-tai-khoan>.github.io/<ten-repo>/`) để gửi tặng người ấy!
