
document.addEventListener("DOMContentLoaded", () => {
  const song = document.getElementById("loveSong");

  const musicButton = document.getElementById("musicButton");
  const startButton = document.getElementById("startButton");
  const messageButton = document.getElementById("messageButton");

  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");
  const page3 = document.getElementById("page3");

  if (!song || !musicButton || !startButton || !messageButton ||
      !page1 || !page2 || !page3) {
    console.error("يوجد عنصر ناقص في index.html");
    return;
  }

  // محاولة تشغيل الأغنية عند فتح الموقع
  function tryAutoplay() {
    const attempt = song.play();

    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {
        musicButton.textContent = "♪ اضغط هنا لتشغيل الأغنية";
      });
    }
  }

  // تشغيل الأغنية من ضغطة المستخدم
  function startMusic() {
    if (!song.paused) return;

    const attempt = song.play();

    if (attempt && typeof attempt.then === "function") {
      attempt.then(() => {
        musicButton.textContent = "♫ الأغنية شغالة";
      }).catch((error) => {
        console.error("تعذر تشغيل الأغنية:", error);
        musicButton.textContent = "تعذر تشغيل الأغنية";
      });
    }
  }

  // تشغيل تلقائي عند تحميل الصفحة
  tryAutoplay();

  // زر الموسيقى
  musicButton.addEventListener("click", () => {
    if (song.paused) {
      startMusic();
    } else {
      song.pause();
    }
  });

  // أول صفحة إلى ثاني صفحة
  startButton.addEventListener("click", () => {
    startMusic();

    page1.classList.add("hidden");
    page2.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ثاني صفحة إلى ثالث صفحة
  messageButton.addEventListener("click", () => {
    page2.classList.add("hidden");
    page3.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // تحديث اسم زر الموسيقى
  song.addEventListener("play", () => {
    musicButton.textContent = "♫ الأغنية شغالة";
  });

  song.addEventListener("pause", () => {
    musicButton.textContent = "♪ تشغيل الأغنية";
  });

  // إظهار خطأ واضح لو ملف الأغنية غير موجود أو غير صالح
  song.addEventListener("error", () => {
    console.error("ملف الأغنية لم يتم تحميله. تأكد من وجود alaa-song.mp3.mp3");
    musicButton.textContent = "ملف الأغنية غير موجود";
  });
});
