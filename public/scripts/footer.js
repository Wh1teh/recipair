//footer desktop
var isAtFooter = false;
window.addEventListener('wheel', function (e) {
    //check based on aspect ratio
    var isMobile = window.matchMedia("(max-aspect-ratio: 6/5)").matches;
    if (isMobile) {
        return;
    }

    //determine scroll direction
    var deltaY = e.deltaY;
    var scrollingDown = deltaY > 0 ? true : false;

    //get elements
    var footer = document.querySelector(".footer-container");
    var featured = document.querySelector(".splash-featured-container");


    const ROTATION_TRANSITION = 1000;

    featured.style.transition = ROTATION_TRANSITION + "ms";
    footer.style.transition = ROTATION_TRANSITION + "ms";
    if (scrollingDown) {
        //move elements
        footer.style.transform = 'rotate3d(1, 0, 0, 360deg)';
        featured.style.transform = 'rotate3d(1, 0, 0, 180deg)';
        setTimeout(() => {
            footer.style.pointerEvents = 'auto';
        }, ROTATION_TRANSITION / 2);

    } else {
        //move elements
        footer.style.transform = 'rotate3d(1, 0, 0, 180deg)';
        featured.style.transform = 'rotate3d(1, 0, 0, 0deg)';
        setTimeout(() => {
            footer.style.pointerEvents = 'none';
        }, ROTATION_TRANSITION) / 2;
    }

}, false);