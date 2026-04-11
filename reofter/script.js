document.addEventListener("click", function (e) {
    const nav = document.getElementById("nav-links");
    const toggle = document.querySelector(".menu-toggle");

    const isClickInsideMenu = nav.contains(e.target);
    const isClickHamburger = toggle.contains(e.target);

    if (!isClickInsideMenu && !isClickHamburger) {
        nav.classList.remove("active");
        toggle.classList.remove("active");
    }
});

function toggleMenu(el) {
    document.getElementById("nav-links").classList.toggle("active");
    el.classList.toggle("active");
}

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

function zoomCard(card, event) {
    event.stopPropagation(); // penting

    // overlay
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    // clone card
    const clone = card.cloneNode(true);
    clone.classList.add("preview");
    
    // hapus onclick dari clone
    clone.onclick = null;
    clone.removeAttribute("onclick");

    document.body.appendChild(overlay);
    document.body.appendChild(clone);

    // animasi muncul
    setTimeout(() => {
        clone.classList.add("show");
    }, 10);

    // klik luar = tutup
    overlay.onclick = function () {
        clone.remove();
        overlay.remove();
    };
}
