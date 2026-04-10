document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.getElementById("gallery");
    const btnLeft = document.querySelector(".left");
    const btnRight = document.querySelector(".right");
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close");


    function getCardWidth() {
        const card = gallery.querySelector(".card");
        const style = window.getComputedStyle(card);
        const margin = parseInt(style.marginRight) || 0;
        return card.offsetWidth + margin;
    }

    function updateTombol() {
        if (gallery.scrollLeft <= 0) {
            btnLeft.style.display = "none";
        } else {
            btnLeft.style.display = "block";
        }

        if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 5) {
            btnRight.style.display = "none";
        } else {
            btnRight.style.display = "block";
        }
    }

    // tombol kanan
    window.geserKanan = function () {
        gallery.scrollBy({
            left: getCardWidth(),
            behavior: "smooth"
        });
        setTimeout(updateTombol, 300);
    };

    // tombol kiri
    window.geserKiri = function () {
        gallery.scrollBy({
            left: -getCardWidth(),
            behavior: "smooth"
        });
        setTimeout(updateTombol, 300);
    };

    gallery.addEventListener("scroll", updateTombol);

    updateTombol();

    document.querySelectorAll(".card img").forEach(img => {
        img.addEventListener("click", function () {
            modal.classList.add("show");
            modalImg.src = this.src;
        });
    });

    function closeModal() {
        modal.classList.remove("show");
    }

    closeBtn.onclick = closeModal;

    modal.onclick = function (e) {
        if (e.target === modal) {
            closeModal();
        }
    };

});
