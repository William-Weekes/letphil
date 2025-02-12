const images = document.querySelectorAll(".slider img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const counter = document.querySelector(".counter");

let currentIndex = 0;

function updateSlider() {
    images.forEach((img, index) => { 
        img.classList.toggle("active", index === currentIndex)
    });
    counter.textContent = `Image ${currentIndex + 1} of ${images.length}`; 
}
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
});

updateSlider();