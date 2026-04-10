document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.getElementById("gallery");
    const btnLeft = document.querySelector(".left");
    const btnRight = document.querySelector(".right");

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
            left: 220,
            behavior: "smooth"
        });
        setTimeout(updateTombol, 300);
    };

    // tombol kiri
    window.geserKiri = function () {
        gallery.scrollBy({
            left: -220,
            behavior: "smooth"
        });
        setTimeout(updateTombol, 300);
    };

    gallery.addEventListener("scroll", updateTombol);

    updateTombol(); // langsung cek saat load

});