// =========================================================================================
// 🌸 CẤU HÌNH DÀNH CHO BẠN (DỄ DÀNG CHỈNH SỬA TẤT CẢ TẠI ĐÂY) 🌸
// Bạn có thể thay đổi mật khẩu, lời chúc, tên người nhận, lời nhắn cuối và ảnh tại đây.
// =========================================================================================

const CONFIG = {
  // 1. MẬT KHẨU (Gồm đúng 6 chữ số để mở khóa màn hình đầu tiên)
  // 👉 Bạn có thể đổi thành ngày sinh nhật, ngày kỷ niệm, hoặc ngày 201024 tuỳ thích
  passcode: "051104",

  // 🎵 LINK NHẠC TRÊN YOUTUBE (TÙY CHỌN)
  // 👉 Bạn có thể copy và dán bất kỳ link YouTube nào vào đây (ví dụ: bài hát nàng thích)
  // 👉 Hỗ trợ các dạng link: https://www.youtube.com/watch?v=... hoặc https://youtu.be/...
  // 👉 Nếu để trống "" thì website sẽ tự động phát giai điệu piano lãng mạn có sẵn.
  youtubeUrl: "https://www.youtube.com/watch?v=GczyPW3vbrc&list=RDGczyPW3vbrc&start_radio=1", // Ví dụ link nhạc không lời lãng mạn


  // 2. TÊN NGƯỜI ĐƯỢC TẶNG QUÀ
  // 👉 Sẽ xuất hiện ở câu: "Có 1 món quà đặc biệt tặng người [Tên người]..."
  recipientName: "Trang",

  // 3. LỜI CHÚC MỪNG NGÀY 20/10 (Hiển thị ở màn hình hoa hồng nở rộ)
  // 👉 Bạn có thể chỉnh sửa tiêu đề và nội dung lời chúc tùy thích
  roseGreeting: {
    badge: "Happy Vietnamese Women's Day • 20/10",
    title: "Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10 🌹",
    content: "Chúc người tuyệt vời nhất luôn luôn rạng ngời như những đóa hoa hồng, ngập tràn niềm vui, bình an và hạnh phúc. Cảm ơn vì đã luôn mang đến những điều ngọt ngào và ấm áp nhất!",
    giftPromptPrefix: "Có 1 món quà đặc biệt tặng ", // Phần trước tên người
    giftPromptSuffix: "..."                            // Phần sau tên người
  },

  // 4. LỜI NHẮN NHỦ BÊN DƯỚI HÌNH TRÁI TIM (Màn hình cuối cùng)
  // 👉 Mỗi dòng trong mảng dưới đây tương ứng với 1 đoạn văn. Bạn có thể thêm/bớt tùy thích.
  finalLetter: [
    "✨ Chúc bạn có một ngày 20/10 thật trọn vẹn, ý nghĩa và ngập tràn yêu thương.",
    "🌸 Mong rằng bạn luôn giữ nụ cười rạng rỡ trên môi, dù là hôm nay hay bất kỳ ngày nào khác.",
    "💖 Cảm ơn vì đã xuất hiện và làm cho thế giới này trở nên dịu dàng và đẹp đẽ hơn rất nhiều.",
    "🎁 Món quà lớn nhất hôm nay và mãi mãi về sau chính là nụ cười hạnh phúc của bạn!",
    "Luôn hạnh phúc nhé thanh xuân của tôi"
  ],

  // 5. CÂU HỎI MÓN QUÀ BÍ MẬT (Ở màn hình mưa ảnh)
  secretQuestion: "Có 1 món quà bí mật có muốn nhận không? 🎁",
  btnYesText: "Có! Nhận ngay ✨",
  btnNoText: "Không 🙈",

  // 6. DANH SÁCH ẢNH TRONG THƯ MỤC PICTURE
  // 👉 Các ảnh mặc định lấy từ thư mục ./Picture/ của dự án.
  // 👉 Nếu bạn thêm hoặc bớt ảnh, hãy cập nhật đường dẫn tương ứng ở đây nhé!
  pictures: [
    "./Picture/1792472648177_183047390399561637_1493747914768374165_0957a466da836c953c9dc6042632ee64.jpg",
    "./Picture/1792472648204_183047390399561637_1493747914768374165_3891e0b3ed6b1ca2d1e7d93f9dc66b5b.jpg",
    "./Picture/1792472648232_183047390399561637_1493747914768374165_cfb19b5a8ba66f5e7be0a8f9958d2572.jpg",
    "./Picture/1792472648296_183047390399561637_1493747914768374165_68a81676d7a5226349f0d3c7e728ac3d.jpg",
    "./Picture/1792472648320_183047390399561637_1493747914768374165_b9c3f7ee4346eb06bb82d3c9e79b293a.jpg",
    "./Picture/1792472648347_183047390399561637_1493747914768374165_36193a8db58b286b4bf6ec27190c683a.jpg",
    "./Picture/1792472648375_183047390399561637_1493747914768374165_d02817e3ac5e95110f92c587a564c7c7.jpg",
    "./Picture/1792472648400_183047390399561637_1493747914768374165_27f60d37f8f1215eab70bf3cdebc981a.jpg",
    "./Picture/1792472648430_183047390399561637_1493747914768374165_c5e8c6ba12d1da56058f732b1373daa9.jpg",
    "./Picture/1792472648456_183047390399561637_1493747914768374165_c5a04b6e52f106fdcc327b8ee51005d0.jpg",
    "./Picture/1792472648482_183047390399561637_1493747914768374165_2feb52cc9446fbada6593b1d241847d3.jpg",
    "./Picture/1792472648509_183047390399561637_1493747914768374165_1dd3f55fbdb26866197df972219216c3.jpg",
    "./Picture/1792472648537_183047390399561637_1493747914768374165_03f9a97b88b0711462200bbefb7db3ef.jpg",
    "./Picture/1792472648565_183047390399561637_1493747914768374165_16fccc84074ff1ba0aa79d80c533a939.jpg",
    "./Picture/1792472648591_183047390399561637_1493747914768374165_56f69fffda7fbde5aef6753e5b645335.jpg",
    "./Picture/1792472648617_183047390399561637_1493747914768374165_a1fa84bfb0d7e35a1391e138b3ef709a.jpg",
    "./Picture/1792472648645_183047390399561637_1493747914768374165_334e0afaa3d8d9699aae1a6aa76e9496.jpg",
    "./Picture/1792472648668_183047390399561637_1493747914768374165_49f2080737229a13b2fe0e9530f2d82b.jpg",
    "./Picture/1792472648695_183047390399561637_1493747914768374165_ac35bc4ad2b7e15dd8ef500667c21696.jpg",
    "./Picture/1792476176741_183047390399561637_1493747914768374165_69aebd8f03731c5969d103cc6515efc1.jpg",
    "./Picture/1792476176769_183047390399561637_1493747914768374165_186a08a1cbdae4b25fc7e9b83963a25c.jpg"
  ]
};
