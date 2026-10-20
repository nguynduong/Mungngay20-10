// =========================================================================================
// 🌸 CẤU HÌNH DÀNH CHO BẠN (DỄ DÀNG CHỈNH SỬA TẤT CẢ TẠI ĐÂY) 🌸
// 
// 💡 HỆ THỐNG 3 PHẦN RIÊNG BIỆT (TRANG / MẸ / CHỊ HOẶC BẠN):
// - Mỗi người có MẬT KHẨU RIÊNG (6 số), LỜI CHÚC RIÊNG, TÂM THƯ RIÊNG và PHẦN ẢNH RIÊNG.
// - Thuộc tính `hasPictures`:
//     + true:  Dành cho người CÓ ẢNH (Web sẽ rơi ảnh và xếp các ảnh thành hình trái tim kỷ niệm).
//     + false: Dành cho người KHÔNG CÓ ẢNH (Web sẽ chạy mưa hoa hồng và xếp thành đóa hoa hồng tình yêu).
// - Khi người nhận nhập mật khẩu ở màn hình 1, web sẽ TỰ ĐỘNG CHUYỂN ĐỔI sang kịch bản
//   dành riêng cho người đó theo đúng mật mã đã nhập!
// =========================================================================================

const CONFIG = {
  // Người nhận mặc định ("auto" = tự động nhận diện theo mật khẩu 6 số nhập vào)
  defaultRecipient: "auto",

  // Link nhạc YouTube mặc định (nếu từng người không cài nhạc riêng)
  youtubeUrl: "https://www.youtube.com/watch?v=GczyPW3vbrc&list=RDGczyPW3vbrc&start_radio=1",

  // Câu hỏi món quà bí mật (ở màn hình mưa quà)
  secretQuestion: "Có 1 món quà bí mật có muốn nhận không? 🎁",
  btnYesText: "Có! Nhận ngay ✨",
  btnNoText: "Không 🙈",

  // =======================================================================================
  // 👥 3 PHẦN ĐƯỢC CHIA TÁCH BIỆT: TRANG • MẸ • CHỊ HOẶC BẠN
  // =======================================================================================
  recipients: {

    // =====================================================================================
    // 🌸 PHẦN 1: BẠN TRANG (CÓ ẢNH: hasPictures = true)
    // =====================================================================================
    "Trang": {
      passcode: "041105",             // Mật khẩu mở quà của Trang
      alternatePasscode: "051104",    // Mật khẩu dự phòng của Trang
      recipientName: "Trang",
      hasPictures: true,              // 👉 TRUE: Hiển thị mưa ảnh và xếp ảnh thành trái tim
      youtubeUrl: "https://www.youtube.com/watch?v=GczyPW3vbrc&list=RDGczyPW3vbrc&start_radio=1",
      roseGreeting: {
        badge: "Happy Vietnamese Women's Day • 20/10",
        title: "Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10 🌹",
        content: "Chúc người tuyệt vời nhất luôn luôn rạng ngời như những đóa hoa hồng, ngập tràn niềm vui, bình an và hạnh phúc. Cảm ơn vì đã luôn mang đến những điều ngọt ngào và ấm áp nhất!",
        giftPromptPrefix: "Có 1 món quà đặc biệt tặng cho ",
        giftPromptSuffix: ""
      },
      finalLetter: [
        "✨ Chúc bạn có một ngày 20/10 thật trọn vẹn, ý nghĩa và ngập tràn yêu thương.",
        "🌸 Mong rằng bạn luôn giữ nụ cười rạng rỡ trên môi, dù là hôm nay hay bất kỳ ngày nào khác.",
        "💖 Cảm ơn vì đã xuất hiện và làm cho thế giới này trở nên dịu dàng và đẹp đẽ hơn rất nhiều.",
        "🎁 Món quà lớn nhất hôm nay và mãi mãi về sau chính là nụ cười hạnh phúc của bạn!",
        "Luôn hạnh phúc nhé thanh xuân của tôi"
      ],
      signature: "From: With all my love & respect 🌹",
      // Thư mục ảnh riêng của Trang: ./Picture/Trang/
      pictures: [
        "./Picture/Trang/1792472648177_183047390399561637_1493747914768374165_0957a466da836c953c9dc6042632ee64.jpg",
        "./Picture/Trang/1792472648204_183047390399561637_1493747914768374165_3891e0b3ed6b1ca2d1e7d93f9dc66b5b.jpg",
        "./Picture/Trang/1792472648232_183047390399561637_1493747914768374165_cfb19b5a8ba66f5e7be0a8f9958d2572.jpg",
        "./Picture/Trang/1792472648296_183047390399561637_1493747914768374165_68a81676d7a5226349f0d3c7e728ac3d.jpg",
        "./Picture/Trang/1792472648320_183047390399561637_1493747914768374165_b9c3f7ee4346eb06bb82d3c9e79b293a.jpg",
        "./Picture/Trang/1792472648347_183047390399561637_1493747914768374165_36193a8db58b286b4bf6ec27190c683a.jpg",
        "./Picture/Trang/1792472648375_183047390399561637_1493747914768374165_d02817e3ac5e95110f92c587a564c7c7.jpg",
        "./Picture/Trang/17924748400_183047390399561637_1493747914768374165_27f60d37f8f1215eab70bf3cdebc981a.jpg",
        "./Picture/Trang/1792472648430_183047390399561637_1493747914768374165_c5e8c6ba12d1da56058f732b1373daa9.jpg",
        "./Picture/Trang/1792472648456_183047390399561637_1493747914768374165_c5a04b6e52f106fdcc327b8ee51005d0.jpg",
        "./Picture/Trang/1792472648482_183047390399561637_1493747914768374165_2feb52cc9446fbada6593b1d241847d3.jpg",
        "./Picture/Trang/1792472648509_183047390399561637_1493747914768374165_1dd3f55fbdb26866197df972219216c3.jpg",
        "./Picture/Trang/1792472648537_183047390399561637_1493747914768374165_03f9a97b88b0711462200bbefb7db3ef.jpg",
        "./Picture/Trang/1792472648565_183047390399561637_1493747914768374165_16fccc84074ff1ba0aa79d80c533a939.jpg",
        "./Picture/Trang/1792472648591_183047390399561637_1493747914768374165_56f69fffda7fbde5aef6753e5b645335.jpg",
        "./Picture/Trang/1792472648617_183047390399561637_1493747914768374165_a1fa84bfb0d7e35a1391e138b3ef709a.jpg",
        "./Picture/Trang/1792472648645_183047390399561637_1493747914768374165_334e0afaa3d8d9699aae1a6aa76e9496.jpg",
        "./Picture/Trang/1792472648668_183047390399561637_1493747914768374165_49f2080737229a13b2fe0e9530f2d82b.jpg",
        "./Picture/Trang/1792472648695_183047390399561637_1493747914768374165_ac35bc4ad2b7e15dd8ef500667c21696.jpg",
        "./Picture/Trang/1792476176741_183047390399561637_1493747914768374165_69aebd8f03731c5969d103cc6515efc1.jpg",
        "./Picture/Trang/1792476176769_183047390399561637_1493747914768374165_186a08a1cbdae4b25fc7e9b83963a25c.jpg"
      ]
    },

    // =====================================================================================
    // 💐 PHẦN 2: MẸ YÊU (KHÔNG DÙNG ẢNH: hasPictures = false)
    // =====================================================================================
    "Me": {
      passcode: "201026",             // Mật khẩu mở quà của Mẹ
      recipientName: "Mẹ Yêu",
      hasPictures: false,             // 👉 FALSE: Hiển thị mưa hoa hồng và vườn hoa hồng tình yêu
      youtubeUrl: "https://www.youtube.com/watch?v=GczyPW3vbrc&list=RDGczyPW3vbrc&start_radio=1",
      roseGreeting: {
        badge: "Happy Vietnamese Women's Day • 20/10",
        title: "Chúc Mừng Ngày 20/10 Mẹ Yêu 💐",
        content: "Chúc Mẹ luôn luôn mạnh khỏe, bình an, nhiều niềm vui và hạnh phúc mỗi ngày. Cảm ơn Mẹ vì tất cả sự hy sinh và tình yêu thương vô bờ bến!",
        giftPromptPrefix: "Có 1 món quà đặc biệt dành tặng cho mẹ",
        giftPromptSuffix: ""
      },
      // Các lời chúc ấm áp khi chạm vào từng bông hoa hồng
      roseWishes: [
        "Chúc Mẹ luôn mạnh khỏe và bình an mỗi ngày 💐",
        "Cảm ơn Mẹ vì tất cả sự hy sinh thầm lặng dành cho con 🌹",
        "Con yêu Mẹ rất nhiều, người phụ nữ tuyệt vời nhất đời con 💖",
        "Mong Mẹ luôn giữ nụ cười hạnh phúc trên môi 🌸",
        "Chúc Mẹ luôn an vui, tươi trẻ và ngập tràn niềm vui 🌷",
        "Mẹ luôn là điểm tựa bình yên và vững chắc nhất của con 🌺",
        "Cảm ơn tình yêu thương vô bờ bến của Mẹ dành cho gia đình 💕"
      ],
      finalLetter: [
        "💐 Con chúc Mẹ một ngày 20/10 thật nhiều niềm vui và ấm áp.",
        "💖 Cảm ơn Mẹ đã luôn là điểm tựa bình yên và vững chãi nhất của cuộc đời con.",
        "🌸 Chúc Mẹ luôn mạnh khỏe, nở nụ cười tươi mỗi ngày!",
        "Mẹ là người phụ nữ tuyệt vời nhất trong lòng con."
      ],
      signature: "From: Con của Mẹ 💖",
      pictures: [] // Không dùng ảnh
    },

    // =====================================================================================
    // 🌷 PHẦN 3: BẠN HOẶC CHỊ (Tùy chọn: hasPictures = false hoặc true)
    // =====================================================================================
    "Chi": {
      passcode: "120426",             // Mật khẩu mở quà cho Chị hoặc Bạn
      recipientName: "Chị Gái",
      hasPictures: false,             // 👉 Đổi thành true nếu bạn thêm ảnh vào ./Picture/Chi/
      youtubeUrl: "https://www.youtube.com/watch?v=GczyPW3vbrc&list=RDGczyPW3vbrc&start_radio=1",
      roseGreeting: {
        badge: "Happy Vietnamese Women's Day • 20/10",
        title: "Chúc Mừng Ngày 20/10 🌷",
        content: "Chúc chị có một ngày 20/10 ngập tràn niềm vui, xinh đẹp rạng ngời và luôn thành công trong mọi dự định tương lai!",
        giftPromptPrefix: "Có 1 món quà đặc biệt gửi đến ",
        giftPromptSuffix: ""
      },
      roseWishes: [
        "Luôn luôn tươi trẻ và rạng ngời như hoa mùa xuân 🌷",
        "Gặp nhiều may mắn và thành công trong công việc 🍀",
        "Mỗi ngày trôi qua đều là một ngày hạnh phúc 🌸",
        "Mãi giữ nụ cười đáng yêu và năng lượng tích cực ✨"
      ],
      finalLetter: [
        "🌷 Chúc chị luôn tự tin, rạng rỡ và đạt được mọi điều mình mơ ước.",
        "✨ Cảm ơn vì chúng mình luôn đồng hành và chia sẻ những khoảnh khắc đẹp cùng nhau!",
        "Mãi vui vẻ, hạnh phúc và thành công nhé!"
      ],
      signature: "From: Chúc một ngày 20/10 trọn vẹn niềm vui 🌸",
      // Thư mục ảnh riêng (nếu hasPictures = true): ./Picture/Chi/
      pictures: []
    }

  }
};
