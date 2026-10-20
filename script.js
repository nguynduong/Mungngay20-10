/**
 * =========================================================================
 * 🌹 JAVASCRIPT ĐIỀU KHIỂN WEBSITE CHÚC MỪNG 20/10
 * Hỗ trợ chuyển cảnh mượt mà, mưa ảnh rơi liên tục, phóng to ảnh, 
 * tạo hình trái tim từ ảnh và âm thanh lãng mạn.
 * =========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. KHỞI TẠO CÁC BIẾN VÀ THAM CHIẾU DOM
  let currentPasscode = "";
  const PASSCODE_LENGTH = 6;
  let rainInterval = null;
  let isRainingActive = false;

  // DOM Elements
  const scenePasscode = document.getElementById("scene-passcode");
  const sceneRoses = document.getElementById("scene-roses");
  const sceneRain = document.getElementById("scene-rain");
  const sceneHeart = document.getElementById("scene-heart");

  const pinBoxes = document.querySelectorAll(".pin-box");
  const hiddenPinInput = document.getElementById("hidden-pin-input");
  const passcodeError = document.getElementById("passcode-error");
  const numericKeypad = document.getElementById("numeric-keypad");

  // Lightbox Modal Elements
  const lightboxModal = document.getElementById("image-lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");
  const lightboxBackdrop = document.querySelector(".lightbox-backdrop");

  // Music Elements
  const musicToggle = document.getElementById("music-toggle");
  let audioContext = null;
  let isMusicPlaying = false;
  let musicTimer = null;

  // =========================================================================
  // 🎵 HỆ THỐNG ÂM THANH: YOUTUBE PLAYER + WEB AUDIO DỰ PHÒNG
  // Cho phép cấu hình bất kỳ link YouTube nào trong config.js
  // Nếu không có link hoặc có lỗi, tự động chuyển sang giai điệu piano lãng mạn.
  // =========================================================================

  // Trích xuất YouTube Video ID từ link bất kỳ
  function extractYouTubeId(url) {
    if (!url || typeof url !== "string") return null;
    const cleanUrl = url.trim();
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = cleanUrl.match(regExp);
    return match ? match[1] : (cleanUrl.length === 11 ? cleanUrl : null);
  }

  const ytVideoId = extractYouTubeId(CONFIG.youtubeUrl);
  let ytPlayer = null;
  let isYTReady = false;

  // Nạp YouTube IFrame API nếu có link YouTube
  if (ytVideoId) {
    const ytScript = document.createElement("script");
    ytScript.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(ytScript, firstScript);

    window.onYouTubeIframeAPIReady = function () {
      ytPlayer = new YT.Player("yt-player", {
        height: "200",
        width: "200",
        videoId: ytVideoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: ytVideoId,
          playsinline: 1,
          modestbranding: 1
        },
        events: {
          onReady: function (event) {
            isYTReady = true;
            try {
              event.target.unMute();
              event.target.playVideo();
            } catch (e) { }
            if (isMusicPlaying) {
              stopChimeLoop();
            }
          },
          onStateChange: function (event) {
            if (event.data === YT.PlayerState.PLAYING) {
              isMusicPlaying = true;
              musicToggle.classList.add("playing");
              stopChimeLoop();
            } else if (event.data === YT.PlayerState.ENDED) {
              event.target.playVideo(); // Lặp lại bài hát
            }
          },
          onError: function (err) {
            console.warn("YouTube player gặp lỗi, tự động chuyển sang giai điệu piano:", err);
            ytPlayer = null;
            if (isMusicPlaying) {
              startChimeLoop();
            }
          }
        }
      });
    };
  }

  // Khởi tạo Web Audio Context cho hiệu ứng âm thanh nhẹ
  function initAudio() {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioContext = new AudioContextClass();
      }
    }
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume();
    }
  }

  // Giai điệu Canon lãng mạn ấm áp dự phòng
  const MELODY_NOTES = [
    [523.25, 0.6], [493.88, 0.6], [440.00, 0.6], [392.00, 0.6],
    [349.23, 0.6], [329.63, 0.6], [293.66, 0.6], [392.00, 0.6],
    [523.25, 0.6], [659.25, 0.6], [587.33, 0.6], [523.25, 0.6],
    [493.88, 0.6], [440.00, 0.6], [392.00, 0.6], [440.00, 0.6]
  ];
  let noteIndex = 0;

  function playGentleChime(freq, duration = 0.5) {
    if (!audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);

      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.warn("Audio chime error:", e);
    }
  }

  function startChimeLoop() {
    if (musicTimer) clearInterval(musicTimer);
    isMusicPlaying = true;
    musicToggle.classList.add("playing");

    musicTimer = setInterval(() => {
      if (!isMusicPlaying) return;
      const [freq, dur] = MELODY_NOTES[noteIndex % MELODY_NOTES.length];
      playGentleChime(freq, dur * 1.5);
      if (noteIndex % 2 === 0) {
        playGentleChime(freq / 2, dur * 2);
      }
      noteIndex++;
    }, 650);
  }

  function stopChimeLoop() {
    if (musicTimer) clearInterval(musicTimer);
  }

  // Điều khiển phát nhạc thống nhất (Ưu tiên YouTube, nếu không thì Chime)
  function playMusic() {
    initAudio();
    isMusicPlaying = true;
    musicToggle.classList.add("playing");

    if (ytPlayer && isYTReady && typeof ytPlayer.playVideo === "function") {
      try {
        ytPlayer.unMute();
        ytPlayer.playVideo();
      } catch (e) {
        startChimeLoop();
      }

      // Dự phòng an toàn: nếu sau 1.2s YouTube vẫn chưa phát do bị trình duyệt chặn autoplay, tự động phát piano chime
      setTimeout(() => {
        if (isMusicPlaying && ytPlayer) {
          const state = typeof ytPlayer.getPlayerState === "function" ? ytPlayer.getPlayerState() : -1;
          if (state !== 1 && state !== 3) {
            console.log("YouTube chưa phát được, chuyển sang giai điệu piano dự phòng");
            startChimeLoop();
          }
        }
      }, 1200);
    } else if (ytVideoId && !isYTReady) {
      // Đang chờ YouTube API load xong, tạm thời chạy chime
      startChimeLoop();
    } else {
      startChimeLoop();
    }
  }

  function pauseMusic() {
    isMusicPlaying = false;
    musicToggle.classList.remove("playing");

    if (ytPlayer && isYTReady && typeof ytPlayer.pauseVideo === "function") {
      try {
        ytPlayer.pauseVideo();
      } catch (e) { }
    }
    stopChimeLoop();
  }

  function toggleMusic() {
    if (isMusicPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  musicToggle.addEventListener("click", toggleMusic);

  // Cố gắng phát nhạc ngay lập tức khi vừa truy cập trang web
  playMusic();

  // Bật nhạc ngay ở cú chạm/gõ phím đầu tiên (đối với các trình duyệt chặn autoplay khi chưa có tương tác)
  const autoStartMusicOnInteraction = () => {
    initAudio();
    if (!isMusicPlaying || (ytPlayer && ytPlayer.getPlayerState && ytPlayer.getPlayerState() !== 1)) {
      playMusic();
    }
    window.removeEventListener("pointerdown", autoStartMusicOnInteraction);
    window.removeEventListener("touchstart", autoStartMusicOnInteraction);
    window.removeEventListener("click", autoStartMusicOnInteraction);
    window.removeEventListener("keydown", autoStartMusicOnInteraction);
  };
  window.addEventListener("pointerdown", autoStartMusicOnInteraction, { passive: true });
  window.addEventListener("touchstart", autoStartMusicOnInteraction, { passive: true });
  window.addEventListener("click", autoStartMusicOnInteraction);
  window.addEventListener("keydown", autoStartMusicOnInteraction);


  // =========================================================================
  // 🌟 HIỆU ỨNG HẠT LẤP LÁNH NỀN (AMBIENT PARTICLES CANVAS)
  // =========================================================================
  const canvas = document.getElementById("ambient-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.8;
      this.speedY = Math.random() * 0.4 + 0.1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.isHeart = Math.random() < 0.2;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.opacity += Math.sin(Date.now() * this.pulseSpeed) * 0.01;
      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
        this.y = canvas.height + 10;
      }
    }
    draw() {
      ctx.save();
      ctx.fillStyle = `rgba(255, 179, 193, ${Math.max(0.1, Math.min(1, this.opacity))})`;
      if (this.isHeart) {
        ctx.font = `${this.size * 5}px serif`;
        ctx.fillText("❤", this.x, this.y);
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < 45; i++) {
    particles.push(new Particle());
  }

  function animateAmbient() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animateAmbient);
  }
  animateAmbient();


  // =========================================================================
  // 🔄 CHUYỂN ĐỔI GIỮA CÁC MÀN HÌNH (SCENE SWITCHER)
  // =========================================================================
  function switchScene(targetScene) {
    const scenes = [scenePasscode, sceneRoses, sceneRain, sceneHeart];
    scenes.forEach(s => {
      s.classList.remove("active");
    });

    setTimeout(() => {
      targetScene.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);

    // Kích hoạt logic tương ứng với từng màn hình
    if (targetScene === sceneRoses) {
      initSceneRoses();
      // Bắt đầu phát nhạc nếu chưa phát
      if (!isMusicPlaying) {
        playMusic();
      }
    } else if (targetScene === sceneRain) {
      startRainingPictures();
    } else {
      stopRainingPictures();
    }

    if (targetScene === sceneHeart) {
      initSceneHeart();
    }
  }


  // =========================================================================
  // 🔒 MÀN HÌNH 1: LOGIC NHẬP MẬT MÃ 6 CHỮ SỐ
  // =========================================================================
  function updatePinBoxes() {
    pinBoxes.forEach((box, idx) => {
      if (idx < currentPasscode.length) {
        box.classList.add("filled");
        box.classList.remove("active");
      } else if (idx === currentPasscode.length) {
        box.classList.add("active");
        box.classList.remove("filled");
      } else {
        box.classList.remove("filled", "active");
      }
    });
  }

  function handleDigitInput(digit) {
    if (currentPasscode.length >= PASSCODE_LENGTH) return;
    passcodeError.textContent = "";
    currentPasscode += digit;
    updatePinBoxes();

    // Phát âm thanh gõ nhẹ và bắt đầu phát nhạc nếu trước đó bị browser chặn autoplay
    initAudio();
    if (!isMusicPlaying) {
      playMusic();
    }
    playGentleChime(400 + currentPasscode.length * 60, 0.15);

    // Kiểm tra khi đủ 6 chữ số
    if (currentPasscode.length === PASSCODE_LENGTH) {
      setTimeout(verifyPasscode, 300);
    }
  }

  function handleBackspace() {
    if (currentPasscode.length > 0) {
      currentPasscode = currentPasscode.slice(0, -1);
      passcodeError.textContent = "";
      updatePinBoxes();
    }
  }

  function handleClear() {
    currentPasscode = "";
    passcodeError.textContent = "";
    updatePinBoxes();
  }

  function verifyPasscode() {
    const expectedPasscode = CONFIG.passcode || "201024";
    if (currentPasscode === expectedPasscode) {
      passcodeError.style.color = "#52b788";
      passcodeError.textContent = "Mật khẩu chính xác! Đang mở quà... 🌹";
      playGentleChime(659.25, 0.4);
      setTimeout(() => playGentleChime(783.99, 0.5), 150);

      // 🎵 PHÁT NHẠC NGAY KHI VỪA XÁC NHẬN MẬT KHẨU (Tận dụng gesture tương tác của người dùng)
      playMusic();

      setTimeout(() => {
        switchScene(sceneRoses);
      }, 700);
    } else {
      passcodeError.style.color = "#ff4d6d";
      passcodeError.textContent = "Mật khẩu chưa chính xác! Thử lại nhé 🌸";
      const card = document.querySelector(".passcode-card");
      card.classList.add("shake-anim");
      setTimeout(() => card.classList.remove("shake-anim"), 500);

      // Reset sau khi nhập sai
      setTimeout(() => {
        handleClear();
      }, 900);
    }
  }

  // Lắng nghe bàn phím số trên màn hình
  numericKeypad.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    if (btn.dataset.key) {
      handleDigitInput(btn.dataset.key);
    } else if (btn.dataset.action === "backspace") {
      handleBackspace();
    } else if (btn.dataset.action === "clear") {
      handleClear();
    }
  });

  // Lắng nghe bàn phím vật lý của máy tính
  window.addEventListener("keydown", (e) => {
    if (!scenePasscode.classList.contains("active")) return;
    if (e.key >= "0" && e.key <= "9") {
      handleDigitInput(e.key);
    } else if (e.key === "Backspace") {
      handleBackspace();
    } else if (e.key === "Escape") {
      handleClear();
    }
  });

  // Chạm vào các ô mã số sẽ mở bàn phím điện thoại nếu cần
  const pinDisplayWrapper = document.getElementById("pin-boxes");
  pinDisplayWrapper.addEventListener("click", () => {
    hiddenPinInput.focus();
  });

  hiddenPinInput.addEventListener("input", (e) => {
    const val = hiddenPinInput.value.replace(/\D/g, "");
    currentPasscode = val.slice(0, PASSCODE_LENGTH);
    updatePinBoxes();
    if (currentPasscode.length === PASSCODE_LENGTH) {
      setTimeout(verifyPasscode, 200);
    }
  });


  // =========================================================================
  // 🌹 MÀN HÌNH 2: HOA HỒNG NỞ RỘ & LỜI CHÚC 20/10
  // =========================================================================
  function initSceneRoses() {
    // Tải lời chúc từ CONFIG
    const badgeEl = document.getElementById("greeting-badge");
    const titleEl = document.getElementById("rose-greeting-title");
    const contentEl = document.getElementById("rose-greeting-content");
    const promptPrefixEl = document.getElementById("prompt-prefix");
    const recipientNameEl = document.getElementById("recipient-name");
    const promptSuffixEl = document.getElementById("prompt-suffix");

    if (CONFIG.roseGreeting) {
      if (badgeEl && CONFIG.roseGreeting.badge) badgeEl.textContent = CONFIG.roseGreeting.badge;
      if (titleEl && CONFIG.roseGreeting.title) titleEl.textContent = CONFIG.roseGreeting.title;
      if (contentEl && CONFIG.roseGreeting.content) contentEl.textContent = CONFIG.roseGreeting.content;
      if (promptPrefixEl && typeof CONFIG.roseGreeting.giftPromptPrefix === "string") {
        promptPrefixEl.textContent = CONFIG.roseGreeting.giftPromptPrefix;
      }
      if (promptSuffixEl && typeof CONFIG.roseGreeting.giftPromptSuffix === "string") {
        promptSuffixEl.textContent = CONFIG.roseGreeting.giftPromptSuffix;
      }
    }

    if (recipientNameEl && CONFIG.recipientName) {
      recipientNameEl.textContent = CONFIG.recipientName;
    }

    // Tạo cánh hoa hồng rơi
    createFallingRosePetals();
  }

  function createFallingRosePetals() {
    const container = document.getElementById("rose-petals-container");
    container.innerHTML = "";
    const petalCount = 18;

    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement("div");
      petal.className = "falling-petal";
      const size = Math.random() * 16 + 14;
      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.25}px`;
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.animationDuration = `${Math.random() * 4 + 4}s`;
      petal.style.animationDelay = `${Math.random() * 5}s`;
      petal.style.opacity = (Math.random() * 0.4 + 0.6).toFixed(2);
      container.appendChild(petal);
    }
  }

  // Nút bấm "Mở quà ngay" chuyển sang màn hình mưa ảnh
  const btnNextToRain = document.getElementById("btn-next-to-rain");
  btnNextToRain.addEventListener("click", () => {
    switchScene(sceneRain);
  });


  // =========================================================================
  // 🌧️ MÀN HÌNH 3: CƠN MƯA HÌNH ẢNH & CÂU HỎI QUÀ BÍ MẬT
  // =========================================================================
  const rainStage = document.getElementById("rain-stage");
  const secretQuestionText = document.getElementById("secret-question-text");
  const btnYesText = document.getElementById("btn-yes-text");
  const btnNoText = document.getElementById("btn-no-text");
  const btnGiftYes = document.getElementById("btn-gift-yes");
  const btnGiftNo = document.getElementById("btn-gift-no");

  // Nạp câu hỏi từ CONFIG
  if (CONFIG.secretQuestion) secretQuestionText.textContent = CONFIG.secretQuestion;
  if (CONFIG.btnYesText) btnYesText.textContent = CONFIG.btnYesText;
  if (CONFIG.btnNoText) btnNoText.textContent = CONFIG.btnNoText;

  function spawnRainPhoto() {
    if (!isRainingActive || !CONFIG.pictures || CONFIG.pictures.length === 0) return;

    // Lấy ảnh ngẫu nhiên từ danh sách
    const randomImgSrc = CONFIG.pictures[Math.floor(Math.random() * CONFIG.pictures.length)];

    const card = document.createElement("div");
    card.className = "rain-photo-card";

    // Random vị trí ngang, thời gian rơi và góc nghiêng
    const leftPos = Math.random() * 88 + 2; // 2% đến 90% chiều rộng
    const fallDuration = Math.random() * 3.5 + 4.5; // 4.5s đến 8s
    const rotateDeg = (Math.random() - 0.5) * 40; // -20deg đến +20deg
    const swayAmount = (Math.random() - 0.5) * 60; // Lắc ngang

    card.style.left = `${leftPos}%`;

    const inner = document.createElement("div");
    inner.className = "rain-photo-inner";

    const img = document.createElement("img");
    img.src = randomImgSrc;
    img.className = "rain-photo-img";
    img.alt = "Ảnh kỷ niệm";
    img.loading = "lazy";

    inner.appendChild(img);
    card.appendChild(inner);

    rainStage.appendChild(card);

    // Chuyển động rơi mượt bằng Web Animations API
    const anim = card.animate([
      { transform: `translate3d(0, -160px, 0) rotate(${rotateDeg}deg)`, opacity: 0 },
      { opacity: 1, offset: 0.1 },
      { opacity: 1, offset: 0.85 },
      { transform: `translate3d(${swayAmount}px, calc(100vh + 180px), 0) rotate(${rotateDeg + 15}deg)`, opacity: 0 }
    ], {
      duration: fallDuration * 1000,
      easing: "linear"
    });

    anim.onfinish = () => {
      if (card.parentNode) {
        card.parentNode.removeChild(card);
      }
    };

    // Chạm/bấm vào ảnh phóng to Modal ngay lập tức (hỗ trợ siêu nhạy trên điện thoại và laptop)
    let isOpening = false;
    const triggerLightbox = (e) => {
      if (isOpening) return;
      isOpening = true;
      if (e) {
        e.stopPropagation();
      }
      try {
        anim.pause(); // Cố định ảnh ngay tại vị trí chạm, không bị trôi đi
      } catch (err) { }

      openLightbox(randomImgSrc);

      setTimeout(() => {
        isOpening = false;
        try {
          if (anim.playState === "paused") anim.play();
        } catch (err) { }
      }, 600);
    };

    card.addEventListener("pointerdown", triggerLightbox);
    card.addEventListener("click", triggerLightbox);
  }

  function startRainingPictures() {
    isRainingActive = true;
    rainStage.innerHTML = "";
    // Thả ngay vài ảnh đầu tiên
    for (let i = 0; i < 4; i++) {
      setTimeout(spawnRainPhoto, i * 400);
    }
    // Lặp lại liên tục cơn mưa ảnh
    if (rainInterval) clearInterval(rainInterval);
    rainInterval = setInterval(spawnRainPhoto, 900);
  }

  function stopRainingPictures() {
    isRainingActive = false;
    if (rainInterval) clearInterval(rainInterval);
    rainStage.innerHTML = "";
  }

  // Nút "Không": Tinh nghịch né tránh hoặc nhắc nhở
  let noClickCount = 0;
  const funnyTexts = [
    "Ơ đừng mà 🥺",
    "Thật sự không muốn sao? 🙈",
    "Bấm 'Có' đi nà! ✨",
    "Không nhận là tiếc lắm đấy nha! 💕"
  ];

  btnGiftNo.addEventListener("click", (e) => {
    e.preventDefault();
    noClickCount++;
    btnNoText.textContent = funnyTexts[noClickCount % funnyTexts.length];

    // Rung lắc nhẹ
    btnGiftNo.style.transform = `scale(0.9) translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 20}px)`;
    setTimeout(() => {
      btnGiftNo.style.transform = "none";
    }, 300);
  });

  // Nút "Có": Chuyển sang màn hình hình trái tim xếp từ ảnh
  btnGiftYes.addEventListener("click", () => {
    switchScene(sceneHeart);
  });


  // =========================================================================
  // 💖 MÀN HÌNH 4: HÌNH TRÁI TIM TỪ CÁC ẢNH & LỜI NHẮN
  // =========================================================================
  function initSceneHeart() {
    const heartContainer = document.getElementById("heart-photos-container");
    const letterBody = document.getElementById("final-letter-lines");
    heartContainer.innerHTML = "";
    letterBody.innerHTML = "";

    // Nạp các dòng chữ từ CONFIG.finalLetter
    if (CONFIG.finalLetter && Array.isArray(CONFIG.finalLetter)) {
      CONFIG.finalLetter.forEach((line) => {
        const p = document.createElement("p");
        p.className = "letter-line";
        p.textContent = line;
        letterBody.appendChild(p);
      });
    }

    // Tính toán tọa độ toán học hình trái tim:
    // x = 16 * sin^3(t)
    // y = -(13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t))
    const pictures = CONFIG.pictures || [];
    const count = pictures.length;
    if (count === 0) return;

    // Chiều rộng & chiều cao tương đối của container
    const isMobile = window.innerWidth <= 600;
    const radiusX = isMobile ? 125 : 190;
    const radiusY = isMobile ? 110 : 160;

    // Sắp xếp các ảnh theo chu vi hình trái tim
    for (let i = 0; i < count; i++) {
      // Góc t từ 0 đến 2*PI
      const t = (i / count) * 2 * Math.PI - Math.PI / 2;

      // Phương trình hình trái tim
      const xMath = 16 * Math.pow(Math.sin(t), 3);
      const yMath = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      // Quy đổi sang pixel với tâm ở (50%, 46%)
      const leftPercent = 50 + (xMath / 16) * (radiusX / (isMobile ? 2.6 : 3.4));
      const topPercent = 46 + (yMath / 16) * (radiusY / (isMobile ? 2.6 : 3.4));

      const photoItem = document.createElement("div");
      photoItem.className = "heart-photo-item";
      photoItem.style.left = `${leftPercent}%`;
      photoItem.style.top = `${topPercent}%`;
      photoItem.style.transform = `translate(-50%, -50%) rotate(${(Math.random() - 0.5) * 24}deg)`;
      photoItem.style.zIndex = 10;

      const frame = document.createElement("div");
      frame.className = "heart-photo-frame";

      const img = document.createElement("img");
      img.src = pictures[i];
      img.className = "heart-photo-img";
      img.alt = `Ảnh kỷ niệm ${i + 1}`;
      img.loading = "lazy";

      frame.appendChild(img);
      photoItem.appendChild(frame);

      // Hiệu ứng xuất hiện dần theo nhịp
      photoItem.style.opacity = "0";
      setTimeout(() => {
        photoItem.style.transition = "opacity 0.6s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
        photoItem.style.opacity = "1";
      }, i * 70);

      // Bấm vào ảnh trong trái tim cũng phóng to xem
      photoItem.addEventListener("click", () => {
        openLightbox(pictures[i]);
      });

      heartContainer.appendChild(photoItem);
    }
  }

  // Nút xem lại từ đầu
  const btnRestart = document.getElementById("btn-restart");
  btnRestart.addEventListener("click", () => {
    currentPasscode = "";
    updatePinBoxes();
    switchScene(scenePasscode);
  });


  // =========================================================================
  // 🔍 LIGHTBOX MODAL (PHÓNG TO ẢNH KHI NHẤP VÀO)
  // =========================================================================
  function openLightbox(src) {
    lightboxImg.src = src;
    lightboxModal.classList.add("active");
    playGentleChime(550, 0.2);
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
    setTimeout(() => {
      lightboxImg.src = "";
    }, 300);
  }

  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
      closeLightbox();
    }
  });

});
