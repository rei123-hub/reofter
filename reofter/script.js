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

let isZoomed = false;

function zoomCard(card, event) {
    event.stopPropagation();

    if (isZoomed) return;
    isZoomed = true;

    const rect = card.getBoundingClientRect();

    const clone = card.cloneNode(true);
clone.classList.add("clone");

// hapus event
clone.removeAttribute("onclick");
clone.onclick = null;

Object.assign(clone.style, {
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px"
});

document.body.appendChild(clone);

// ✅ BUAT CLOSE DI SINI (BUKAN DI BAWAH)
const closeBtn = document.createElement("span");
closeBtn.className = "close-btn";
closeBtn.innerHTML = "×";

clone.appendChild(closeBtn);

const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

// klik tombol close
closeBtn.onclick = (e) => {
    e.stopPropagation(); // 🔥 penting banget
    overlay.click();
};

requestAnimationFrame(() => {
    clone.classList.add("active");
    overlay.classList.add("show");
});

overlay.onclick = (e) => {
    e.stopPropagation();
    
    clone.classList.remove("active");
    overlay.classList.remove("show");

    setTimeout(() => {
        clone.remove();
        overlay.remove();
        isZoomed = false;
    }, 300);
};
}

// email
(function(){
    emailjs.init("tzkZmYsZxzDpNdlxV");
})();

function kirimEmail(e) {
    e.preventDefault();

    const btn = document.querySelector("button");
    btn.innerText = "Mengirim...";

    emailjs.send("service_yf8ne1", "template_v4xhuob", {
        nama: document.querySelector('input[name="nama"]').value,
        email: document.querySelector('input[name="email"]').value,
        pesan: document.querySelector('textarea[name="pesan"]').value
    })
    .then(() => {
        alert("Pesan berhasil dikirim!");
        document.querySelector("form").reset();
        btn.innerText = "Kirim";
    }, (error) => {
        console.log(error);
        alert("Gagal mengirim!");
        btn.innerText = "Kirim";
    });
}
