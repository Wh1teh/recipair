import { Helper } from "./classes/helper.js"
const helper = new Helper();

import { TitleManager } from "./classes/title_manager.js"
const titleManager = new TitleManager("RECIPAIR", 9, -2, 1.0);

titleManager.generateTitle();

// clone the container and box elements
helper.createDuplicateBoxes(
    document.querySelector('.splash-featured-container'), document.querySelector('.splash-featured'));


//

var splashInput = document.querySelector("#splash-search");
var splashContent = document.querySelector('.splash-content');
var splashTitles = document.querySelectorAll(".splash-title");

//handle form input
var splashForm = document.querySelector("#splash-form");
splashForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Filter and separate words in formData 
    const filteredFormData = {};
    for (let [key, value] of formData.entries()) {
        const words = value.split(/\W+/); // Split words using non-alphabet characters 
        words.forEach(word => {
            if (word.length > 0) {
                filteredFormData[key] = [...new Set(filteredFormData[key] || []), word]; // Ignore duplicates 
            }
        });
    }

    // Create a promise 
    const requestPromise = new Promise((resolve, reject) => {
        // Convert filteredFormData to query string
        const queryString = Object.entries(filteredFormData)
            .map(([key, values]) => values.map(value => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join("&")).join("&");

        fetch(this.getAttribute("action") + "?" + queryString).then(response => {
            if (response.ok) {
                resolve(response.text()); // Resolve promise with response text 
            } else {
                reject(new Error('Request failed')); // Reject promise with error 
            }
        }).catch(error => {
            reject(error); // Reject promise with error 
        });
    });

    Promise.all([requestPromise, startFeaturedTransition()])
        .then(([responseText, animationTimer]) => {
            handleResponseJson(responseText);
            putDataToFeatured();
            finishFeaturedTransition(animationTimer);
        })
        .catch(error => {
            // Handle error 
            console.error(error);
            displaySearchError("Found no results...");
            putDataToFeatured(); //put old data, TODO: check if old data even exists
            finishFeaturedTransition(0);
        });
});

function displaySearchError(errorText) {
    var element = document.getElementById("splash-form");

    element.classList.add("search-error", "nothing-found");

    element.setAttribute("data-content", errorText);

    setTimeout(() => {
        element.classList.add("fading-out");

        setTimeout(() => {
            element.classList.remove("search-error", "nothing-found", "fading-out");
        }, 5000);
    }, 15000);
}

//
document.addEventListener('DOMContentLoaded', function () {
    // Create a promise 
    const requestPromise = new Promise((resolve, reject) => {
        fetch(splashForm.getAttribute("action")).then(response => {
            if (response.ok) {
                resolve(response.text()); // Resolve promise with response text 
            } else {
                reject(new Error('Request failed')); // Reject promise with error 
            }
        }).catch(error => {
            reject(error); // Reject promise with error 
        });
    });

    Promise.all([requestPromise, startFeaturedTransition(0)])
        .then(([responseText, animationTimer]) => {
            handleResponseJson(responseText);
            putDataToFeatured();
            finishFeaturedTransition(animationTimer);
        })
        .catch(error => {
            // Handle error 
            console.error(error);
            handleResponseJson(helper.getErrorObject());
            putDataToFeatured();
            finishFeaturedTransition(animationTimer);
        });
});

var recipeList = [];
var RECIPE_INDEX = 0;
function handleResponseJson(serverResponse, animationTimer) {
    // console.log(serverResponse);

    var jsonTable = JSON.parse(serverResponse)
    if (!Object.keys(jsonTable).length > 0) {
        throw new Error("Empty response");
    }

    //replace global list with sorted json
    recipeList = helper.zigzagSort(jsonTable);

    // putDataToFeatured(animationTimer);
}

function putDataToFeatured() {
    if (recipeList.length >= 3) {
        //reverse first half of list so the best result is in the middle
        RECIPE_INDEX = Math.floor(recipeList.length / 2);

        printToFeatured(recipeList[RECIPE_INDEX], featuredBoxes[fMID]);
        printToFeatured(recipeList[RECIPE_INDEX - 1], featuredBoxes[fLEFT]);
        printToFeatured(recipeList[RECIPE_INDEX + 1], featuredBoxes[fRIGHT]);

        featuredBoxes.forEach(element => {
            element.style.opacity = "1";
        });
    } else {
        RECIPE_INDEX = 0;

        printToFeatured(recipeList[0], featuredBoxes[fMID]);
        featuredBoxes[fRIGHT].style.opacity = "0";
        featuredBoxes[fLEFT].style.opacity = "0";

        if (recipeList.length == 2) {
            printToFeatured(recipeList[1], featuredBoxes[fRIGHT]);
            featuredBoxes[fRIGHT].style.opacity = "1";
        }
    }

    console.log("final list: ", recipeList);

    // finishFeaturedTransition(animationTimer);
}

const TRANSITION_LEN = 1000;
const FLASH_DELAY = 500;
function startFeaturedTransition(timerMultiplier = 1) {
    return new Promise((resolve) => {
        const titleH3 = document.querySelector(".featured-title h3");
        titleH3.classList.add("animation-in");

        const sideImgOverlay = document.querySelector(".featured-img .img-overlay");
        sideImgOverlay.classList.add("animation-in");

        //add flashing animation
        var animationTimer = Date.now() + FLASH_DELAY * timerMultiplier;

        setTimeout(() => {
            document.querySelector(".featured-title").classList.add("waiting");
            document.querySelector(".featured-content").classList.add("waiting");
        }, FLASH_DELAY * timerMultiplier)

        //remove the transition animation after one second
        setTimeout(() => {
            titleH3.style.opacity = 0;
            titleH3.classList.remove("animation-in");

            document.querySelector(".featured-img img").style.filter = "brightness(0)";
            sideImgOverlay.classList.remove("animation-in");

            resolve(animationTimer);
        }, TRANSITION_LEN * timerMultiplier);
    });
}

function finishFeaturedTransition(animationTimer) {
    //remove flashing animation
    const currentTime = Date.now();
    console.log("animation start: " + animationTimer);
    console.log("animation end: " + currentTime);
    console.log("duration: " + (animationTimer - currentTime));
    console.log("mod 2000: " + (currentTime - animationTimer) % (TRANSITION_LEN * 2));
    console.log("remaining: " + ((TRANSITION_LEN * 2) - ((currentTime - animationTimer) % (TRANSITION_LEN * 2))));

    setTimeout(() => {
        document.querySelector(".featured-title").classList.remove("waiting");
        document.querySelector(".featured-content").classList.remove("waiting");
    }, (TRANSITION_LEN * 2) - ((currentTime - animationTimer) % (TRANSITION_LEN * 2)));

    const titleH3 = document.querySelector(".featured-title h3");
    titleH3.classList.add("animation-out");
    titleH3.style.opacity = 1;

    const sideImgOverlay = document.querySelector(".featured-img .img-overlay");
    document.querySelector(".featured-img img").style.filter = "brightness(1)";
    sideImgOverlay.classList.add("animation-out");

    setTimeout(() => {
        titleH3.classList.remove("animation-out");
        sideImgOverlay.classList.remove("animation-out");
    }, TRANSITION_LEN);
}

function printToFeatured(jsonObj, featuredBox) {
    const pathToRecipe = "recipe/" + jsonObj.id;

    // console.log("obj: ", jsonObj, "box: ", featuredBox)
    var title = featuredBox.querySelector(".featured-title h3");
    title.parentNode.href = pathToRecipe;

    title.innerHTML = jsonObj.title;
    reduceFontIfWrapped(title, 2, "em");

    featuredBox.querySelector(".featured-text p").innerHTML = jsonObj.content;
    featuredBox.querySelector(".featured-text a").href = pathToRecipe;

    var imageElement = featuredBox.querySelector(".featured-img img");
    helper.putImagetoElement(imageElement, title.innerHTML);
    featuredBox.querySelector("img").parentNode.href = pathToRecipe;

    featuredBox.querySelector(".star-rating").setAttribute("data-content", jsonObj.rating);
    updateRatings(featuredBox);

    featuredBox.querySelector(".featured-submitter a").innerHTML = "PLACEHOLDER"; //TODO 

    updateFeaturedNav(featuredBox);
}

function cloneFromFeatured(cloneFrom, cloneTo) {
    cloneTo.appendChild(cloneFrom.cloneNode(true));
}

function reduceFontIfWrapped(textElement, baseValue, unit) {
    textElement.style.textWrap = "nowrap";
    textElement.style.fontSize = baseValue + unit;

    if (!helper.isTextOverflowingHorizontally(textElement)) {
        textElement.style.textWrap = "balance";
        return;
    }

    textElement.style.textWrap = "balance";

    var counter = 0;
    while (helper.isTextOverflowingVertically(textElement)) {
        counter++;
        baseValue /= 1.1;
        textElement.style.fontSize = baseValue + unit;

        if (counter > 100) break;
    }
}

function updateRatings(featuredBox, forceRating = -1) {
    //stars gradient
    const MAX_RATING = 5;

    var stars = featuredBox.querySelector('.star-rating');
    if (forceRating < 0) {
        var rating = parseFloat(stars.getAttribute('data-content'));
    } else {
        var rating = forceRating;
    }

    stars.style.backgroundImage = 'linear-gradient(90deg, var(--second-color) '
        + rating / MAX_RATING * 100 + '%, var(--first-background-light) 0%)';
}

function updateFeaturedNav(featuredBox) {
    var featuredNavButtons = featuredBox.querySelector('.featured-nav-buttons');
    const oldButtons = featuredBox.querySelectorAll('.featured-nav-buttons span');

    //add fadeout to previous button
    for (var indexOfPrevious = 0; indexOfPrevious < oldButtons.length; indexOfPrevious++) {
        const button = oldButtons[indexOfPrevious];

        if (button.classList.contains("featured-current-nav-position")) {
            break;
        }
    }

    featuredNavButtons.innerHTML = "";

    // Generate new <a> tags
    for (var index = 0; index < recipeList.length; index++) {
        var newButton = document.createElement('span');
        // newButton.href = ''; //TODO: replace with the URL
        newButton.textContent = '•';

        if (index == RECIPE_INDEX) {
            newButton.classList.add("featured-current-nav-position");
        } else if (index == indexOfPrevious) {
            newButton.classList.add("featured-nav-phasing-out");
        }

        featuredNavButtons.appendChild(newButton);
    }

    for (let index = 0; index < recipeList.length; index++) {
        const element = featuredNavButtons.children[index];
        element.addEventListener("click", () => {
            featuredNavButtonClicked(index);
        })
    }
}

function featuredNavButtonClicked(buttonIndex) {
    console.log(buttonIndex)

    //see if index is left or right of current
    var goingLeft = false;
    buttonIndex < RECIPE_INDEX ? goingLeft = true : goingLeft = false;

    //move RECIPE_INDEX accordingly 
    RECIPE_INDEX = buttonIndex + (goingLeft ? 1 : -1);

    //move left or right
    swipeToNext(goingLeft)
}


// Get all the star spans
const starContainer = document.querySelector('.star-rating');
const starSpans = starContainer.querySelectorAll('.star-rating span');

console.log("starContainer:", starContainer, "starSpans:", starSpans)

starContainer.addEventListener('mouseleave', (event) => {
    updateRatings(document.querySelector(".splash-featured"));
});

// Add a click event listener to each star span
for (let index = 0; index < starSpans.length; index++) {
    starSpans[index].addEventListener('mouseover', (event) => {
        // Get the clicked star
        const element = starSpans[index];

        updateRatings(document.querySelector(".splash-featured"), index + 1);
    });

}


//helper functions below

//check if parameter is json
function isJson(jsonString) {
    try {
        const json = JSON.parse(jsonString);
        return typeof json === 'object' && json !== null;
    } catch (error) {
        return false;
    }
}

//mobile stuff below

// ignore keyboard
if ('virtualKeyboard' in navigator) {
    navigator.virtualKeyboard.overlaysContent = true;
}

// Detect changes in aspect ratio
const aspectRatios = ['2/3', '6/5', '1000/1'];
var aspectQueryList = [];

for (let i = 0; i < aspectRatios.length; i++) {
    const aspectQuery = window.matchMedia(`(max-aspect-ratio: ${aspectRatios[i]})`);
    aspectQueryList.push(aspectQuery);

    // Add event listener for changes in aspect ratio
    aspectQuery.addEventListener("change", function () {
        titleManager.changeTitleMarginTop(aspectQueryList);
    });
}

// Initial check
titleManager.changeTitleMarginTop(aspectQueryList);


//swiping for featured
var featuredContainer = document.querySelector('.splash-featured-container');
var featuredBoxes = document.querySelectorAll('.splash-featured');
const fLEFT = 2, fMID = 0, fRIGHT = 1;

console.log(featuredBoxes)

var startX;
var currentX = 0;

var startY;
var currentY = 0;
var scrollingEnabled = false;

var SWIPE_LENIENCY = 8;
const SWIPE_TRANSITION = 500;

var isDragging = false;

function disableScroll() {
    scrollingEnabled = false;
    document.body.classList.add("stop-scrolling");
}

function enableScroll() {
    scrollingEnabled = true;
    document.body.classList.remove("stop-scrolling");
}

featuredContainer.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
    enableScroll();
});

featuredContainer.addEventListener('touchmove', function (e) {
    if (!isDragging) return;

    var moveX = e.touches[0].clientX - startX;
    currentX += moveX;
    startX = e.touches[0].clientX;

    //lock to initial drag direction
    if (scrollingEnabled) {
        var moveY = e.touches[0].clientY - startY;
        currentY += moveY;
        startY = e.touches[0].clientY;

        var deltaX = Math.abs(currentX);
        var deltaY = Math.abs(currentY);

        //if neither past threshold then don't do anything
        const scrollLockThreshold = 10;
        if (deltaX < scrollLockThreshold && deltaY < scrollLockThreshold) return;

        //which direction was dragged more
        if (deltaX > deltaY) {
            disableScroll();

            //negate threshold from movement calculations
            currentX += scrollLockThreshold * (currentX < 0 ? 1 : -1);
        } else {
            isDragging = false;
        }

        return;
    }

    //move elements
    for (let index = 0; index < 3; index++) {
        featuredBoxes[index].style.transform = "translateX(" + currentX + "px)";
        featuredContainer.style.transition = "0ms";
    }
});


featuredContainer.addEventListener('touchend', function () {
    isDragging = false;
    enableScroll();

    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    console.log("Viewport width: " + viewportWidth + ", currentX: " + currentX);

    currentY = 0;
    if (viewportWidth / SWIPE_LENIENCY > Math.abs(currentX)) {
        currentX = 0;
    } else {
        swipeToNext(currentX > 0, SWIPE_TRANSITION);
    }

    updateFeaturedPosition(SWIPE_TRANSITION);
});

function updateFeaturedPosition(SWIPE_TRANSITION) {
    for (let index = 0; index < 3; index++) {
        featuredBoxes[index].style.transition = SWIPE_TRANSITION + "ms";
        featuredBoxes[index].style.transform = "translateX(" + currentX + "px)";

        setTimeout(() => {
            featuredBoxes[index].style.transition = "0ms";
        }, SWIPE_TRANSITION);
    }
}

//check if slider index is at one of the edges
function atEdge() {
    // console.log(0, " < ", RECIPE_INDEX , " < ", recipeList.length - 1)
    if (0 < RECIPE_INDEX && RECIPE_INDEX < recipeList.length - 1) {
        // console.log(false);
        return false;
    } else {
        // console.log(true);
        return true;
    }
}

function swipeToNext(goingLeft, SWIPE_TRANSITION) {
    if (atEdge()) {
        if (goingLeft ? RECIPE_INDEX <= 0 : RECIPE_INDEX + 1 >= recipeList.length) {
            console.log("ALREADY AT THE EDGE");

            //move all elements back to default position
            currentX = 0;
            return;
        }
    }

    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var isMobile = window.matchMedia("(max-aspect-ratio: 6/5)").matches;

    if (goingLeft) {
        //do left stuff
        currentX = featuredBoxes[fMID].clientWidth * (isMobile ? 1.333 : 1.25);
    } else {
        //do right stuff
        currentX = featuredBoxes[fMID].clientWidth * (isMobile ? 1.333 : 1.25) * -1;
    }

    const oldSide = goingLeft ? fRIGHT : fLEFT;
    const newSide = goingLeft ? fLEFT : fRIGHT;
    const offset = goingLeft ? 1 : -1;

    //swap elements after timeout
    setTimeout(() => {
        //move index
        nudgeListIndex(goingLeft);

        //put new mid's data to mid box (which is now to the side)
        printToFeatured(recipeList[RECIPE_INDEX], featuredBoxes[fMID]);

        console.log("list[", RECIPE_INDEX + (offset), "], boxes[", oldSide, "]")
        //put old mid's data to right?left
        printToFeatured(recipeList[RECIPE_INDEX + (offset)], featuredBoxes[oldSide]);

        if (!atEdge()) {
            console.log("edge[", RECIPE_INDEX + (offset * -1), "], box[", newSide, "]")
            //put new data to left?right
            printToFeatured(recipeList[RECIPE_INDEX + (offset * -1)], featuredBoxes[newSide]);
        }

        //move all elements back to default position
        currentX = 0;

        //make element beyond edge invisible
        if (atEdge()) {
            featuredBoxes[newSide].style.opacity = "0";
            //TODO: show end of list indicator
        } else {
            featuredBoxes[oldSide].style.opacity = "1";
        }

        //update visual
        updateFeaturedPosition(0); //zero transition time
    }, SWIPE_TRANSITION);
}

function nudgeListIndex(goingLeft) {
    console.log("current index: ", RECIPE_INDEX)

    goingLeft ? RECIPE_INDEX-- : RECIPE_INDEX++;
    console.log("moved to: ", RECIPE_INDEX);
}
