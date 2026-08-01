/* ===========================
   Я нашёл тебе мужчину
   script.js
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    // ------------------------
    // Плавое появление страницы
    // ------------------------

    document.body.style.opacity = 0;

    requestAnimationFrame(() => {

        document.body.style.transition = "opacity .8s ease";
        document.body.style.opacity = 1;

    });

    // ------------------------
    // Прогресс чтения
    // ------------------------

    const progress = document.querySelector(".progress");

    function updateProgress() {

        if (!progress) return;

        const scroll =
            window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent =
            height > 0
                ? (scroll / height) * 100
                : 0;

        progress.style.width = percent + "%";

    }

    updateProgress();

    window.addEventListener("scroll", updateProgress);

    // ------------------------
    // Запоминаем последнюю главу
    // ------------------------

    const page =
        window.location.pathname
            .split("/")
            .pop();

    if (page.startsWith("chapter")) {

        localStorage.setItem(
            "lastChapter",
            page
        );

    }

    // ------------------------
    // Кнопка "Продолжить"
    // ------------------------

    const continueButton =
        document.querySelector("#continue-reading");

    if (continueButton) {

        const last =
            localStorage.getItem("lastChapter");

        if (last) {

            continueButton.href = last;

            continueButton.style.display = "inline-block";

        }


   if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(registration => {
        console.log(
          "Service worker registered with scope:",
          registration.scope
        );
      })
      .catch(error => {
        console.error(
          "Service worker registration failed:",
          error
        );
      });
  });
}    

    }

});
