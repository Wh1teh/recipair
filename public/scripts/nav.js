//nav
var navOpener = document.querySelector(".nav-opener");
var mobileNavOpened = false;
navOpener.addEventListener("click", () => {
    var animationDelay = 1000;
    var animationIncrement = 100;

    if (mobileNavOpened) {
        mobileNavOpened = false;

        //reset classes otherwise reverse doesn't work (I love css)
        navOpener.parentNode.classList.remove("open-nav");
        void navOpener.parentNode.offsetWidth; // DOM reflow hack

        navOpener.parentNode.classList.add("close-nav");
        navOpener.parentNode.querySelectorAll('*').forEach(element => {
            element.classList.remove("open-nav");
            void element.offsetWidth; // DOM reflow hack

            element.classList.add("close-nav");

            if (element.tagName === "LI") {
                element.style.animationDelay = 0 + "ms";
            }
        });
    } else {
        mobileNavOpened = true;

        //reset classes otherwise reverse doesn't work (I love css)
        navOpener.parentNode.classList.remove("close-nav");
        void navOpener.parentNode.offsetWidth; // DOM reflow hack

        navOpener.parentNode.classList.add("open-nav");
        navOpener.parentNode.querySelectorAll('*').forEach(element => {
            element.classList.remove("close-nav");
            void element.offsetWidth; // DOM reflow hack

            element.classList.add("open-nav");

            if (element.tagName === "LI") {
                element.style.animationDelay = animationDelay + "ms";
                animationDelay += animationIncrement;
            }
        });
    }
})

// Get the current base URL
const baseUrl = window.location.href.split('#')[0];

// Create the dynamic URL
const dynamicUrl = `${baseUrl}#about`;

console.log(dynamicUrl);
// Output: "http://www.example.com/#about" (assuming the base URL is "http://www.example.com/")



document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#link-to-about").href = dynamicUrl;
});