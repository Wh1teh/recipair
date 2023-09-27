//background parallax effect
window.addEventListener('scroll', function () {
    var parallax = document.querySelector('.splash-parallax');
    var scrolled = window.scrollY;
    parallax.style.transform = 'translateY(' + (scrolled * 0.8) + 'px)';
});


//splash title generation
var title = "RECIPAIR";
const DUPE_AMOUNT = 9;
const TITLE_OFFSET = -2;
var TITLE_OFFSET_MULTIPLIER = 1.0

for (let index = 0; index < DUPE_AMOUNT; index++) {
    const titleElement = document.createElement('h1');

    // Set content and attributes of the element
    titleElement.textContent = title;
    titleElement.setAttribute('class', 'splash-title');
    titleElement.setAttribute('data-content', title)
    titleElement.style.zIndex = index;
    titleElement.style.opacity = (index + 1) / DUPE_AMOUNT;

    //is last element
    if (index + 1 == DUPE_AMOUNT) {
        titleElement.style.color = "transparent";
        titleElement.style.opacity = "1";
        titleElement.style.textShadow = "none";
    } else {
        titleElement.style.marginTop = ((DUPE_AMOUNT - index - 1) * TITLE_OFFSET) + 'dvw';
        titleElement.style.webkitTextStrokeColor = "transparent";
    }

    const INTERVAL = 800;
    const INTERVAL_PHASE = DUPE_AMOUNT; //if this is 2, you're gonna see 2 trails at a time
    setTimeout(() => {
        setTimeout(() => {
            //is last element
            if (index + 1 == DUPE_AMOUNT) {
                titleElement.style.color = "var(--first-color)";
                titleElement.style.opacity = "1";
            } else {
                titleElement.style.webkitTextStrokeColor = "var(--first-color)";
                titleElement.style.color = "transparent";
            }
        }, INTERVAL);

        titleElement.style.color = "var(--first-color)";
    }, INTERVAL * (index + 1) / INTERVAL_PHASE);

    // Write element to document
    document.querySelector('.splash-title-container').appendChild(titleElement);
}

function createDuplicateBoxes(parent, child) {
    // Clone the original box element
    var duplicateBox = child.cloneNode(true);

    // Add the "duplicate" class to the new box element
    duplicateBox.classList.add('duplicate-left');

    // Insert the duplicate box after the original box within the container
    parent.insertBefore(duplicateBox, child.nextSibling);

    duplicateBox = child.cloneNode(true);
    duplicateBox.classList.add('duplicate-right');
    parent.insertBefore(duplicateBox, child.nextSibling);
}

// clone the container and box elements
createDuplicateBoxes(
    document.querySelector('.splash-featured-container'), document.querySelector('.splash-featured'));


//

var splashInput = document.querySelector("#splash-search");
var splashContent = document.querySelector('.splash-content');
var splashTitles = document.querySelectorAll(".splash-title");

// splashInput.addEventListener("focus", function () {
//     for (let index = 0; index < splashTitles.length; index++) {
//         splashTitles[index].style.marginTop = "0";
//     }

//     splashContent.style.transform =
//         'translateY(' + (splashTitles.length - 1) * (TITLE_OFFSET * TITLE_OFFSET_MULTIPLIER) + 'dvw)';
// });

// splashInput.addEventListener("blur", function () {
//     for (let index = 0; index < splashTitles.length; index++) {
//         splashTitles[index].style.marginTop =
//             ((splashTitles.length - index - 1) * (TITLE_OFFSET * TITLE_OFFSET_MULTIPLIER)) + 'dvw';
//     }

//     splashContent.style.transform = 'translateY(' + 0 + 'dvh)';
// });

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
            putRecipeData(responseText, animationTimer);
        })
        .catch(error => {
            // Handle error 
            console.error(error);
        });
});

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
            putRecipeData(responseText, animationTimer);
        })
        .catch(error => {
            // Handle error 
            console.error(error);
        });
});

var recipeList = [];
var RECIPE_INDEX = 0;
function putRecipeData(serverResponse, animationTimer) {
    // console.log(serverResponse);

    var jsonTable = JSON.parse(serverResponse)
    if (!Object.keys(jsonTable).length > 0) {
        throw new Error("Empty response");
    }

    console.log("received: ", jsonTable);

    // clear list
    recipeList = [];
    for (let index = 0; index < jsonTable.length; index++) {
        recipeList.push(jsonTable[index]);
    }

    //TODO: what to do when there are only less than 3
    if (recipeList.length >= 3) {
        RECIPE_INDEX = Math.floor(jsonTable.length / 2);
        let firstHalf = jsonTable.slice(0, RECIPE_INDEX);

        recipeList.splice(0, Math.ceil(jsonTable.length / 2), ...firstHalf.reverse());

        printToFeatured(recipeList[RECIPE_INDEX], featuredBoxes[fMID]);
        printToFeatured(recipeList[RECIPE_INDEX - 1], featuredBoxes[fLEFT]);
        printToFeatured(recipeList[RECIPE_INDEX + 1], featuredBoxes[fRIGHT]);
    }
    console.log("reversed half: ", recipeList);

    finishFeaturedTransition(animationTimer);
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
    // console.log("obj: ", jsonObj, "box: ", featuredBox)
    featuredBox.querySelector(".featured-title h3").innerHTML = jsonObj.title;
    featuredBox.querySelector(".featured-text p").innerHTML = jsonObj.content;

    featuredBox.querySelector(".star-rating").setAttribute("data-content", jsonObj.rating);
    updateRatings();

    featuredBox.querySelector(".featured-submitter a").innerHTML = "PLACEHOLDER"; //TODO  
}

function cloneFromFeatured(cloneFrom, cloneTo) {
    cloneTo.appendChild(cloneFrom.cloneNode(true));
}

function updateRatings(forceRating) {
    //stars gradient
    const MAX_RATING = 5;

    var stars = document.querySelector('.star-rating');
    var rating = 0;
    if (forceRating != null) {
        rating = forceRating;
    } else {
        rating = parseFloat(stars.getAttribute('data-content'));
    }

    stars.style.backgroundImage = 'linear-gradient(90deg, var(--second-color) '
        + rating / MAX_RATING * 100 + '%, var(--first-background-light) 0%)';
}

// Get all the star spans
const starSpans = document.querySelectorAll('.star-rating span');
const starContainer = document.querySelector('.star-rating');

starContainer.addEventListener('mouseleave', (event) => {
    console.log("unhovered");

    updateRatings();
});

// Add a click event listener to each star span
for (let index = 0; index < starSpans.length; index++) {
    starSpans[index].addEventListener('mouseover', (event) => {
        // Get the clicked star
        const element = starSpans[index];
        console.log(element + ', ' + index); // Print the position of star

        updateRatings(index + 1);
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

// Function to change h1 margin-top
function changeTitleMarginTop(aspectQueryList) {
    //find first aspect ratio that matches
    switch (aspectQueryList.findIndex((item) => item.matches === true)) {
        case 0:
            console.log("detected <2/3 aspect ratio");
            TITLE_OFFSET_MULTIPLIER = 1.5;
            break;

        case 1:
            console.log("detected <6/5 aspect ratio");
            TITLE_OFFSET_MULTIPLIER = 1.5;
            break;

        default:
            console.log("default? aspect ratio");
            TITLE_OFFSET_MULTIPLIER = 1.0
            break;
    }

    const titleElements = document.querySelectorAll('.splash-content h1');

    for (let index = 0; index < DUPE_AMOUNT; index++) {
        if (index + 1 != DUPE_AMOUNT) {
            //don't apply to last title (this is gonna be the main one)
            titleElements[index].style.marginTop =
                ((DUPE_AMOUNT - index - 1) * (TITLE_OFFSET * TITLE_OFFSET_MULTIPLIER)) + 'dvw';
        }
    }
}

// Detect changes in aspect ratio
const aspectRatios = ['2/3', '6/5', '1000/1'];
var aspectQueryList = [];

for (let i = 0; i < aspectRatios.length; i++) {
    const aspectQuery = window.matchMedia(`(max-aspect-ratio: ${aspectRatios[i]})`);
    aspectQueryList.push(aspectQuery);

    // Add event listener for changes in aspect ratio
    aspectQuery.addEventListener("change", function () {
        changeTitleMarginTop(aspectQueryList);
    });
}

// Initial check
changeTitleMarginTop(aspectQueryList);


//swiping for featured
var featuredContainer = document.querySelector('.splash-featured-container');
var featuredBoxes = document.querySelectorAll('.splash-featured');
const fLEFT = 2, fMID = 0, fRIGHT = 1;

console.log(featuredBoxes)

var startX;
var currentX = 0;
var isDragging = false;

var SWIPE_LENIENCY = 8;
const SWIPE_TRANSITION = 500;

featuredContainer.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    isDragging = true;
});

featuredContainer.addEventListener('touchmove', function (e) {
    if (isDragging) {
        var moveX = e.touches[0].clientX - startX;
        currentX += moveX;
        startX = e.touches[0].clientX;

        if (atEdge()) {
            //see which way can go
            if (currentX >= 0 ? RECIPE_INDEX <= 0 : RECIPE_INDEX + 1 >= recipeList.length) {
                var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

                //movement is restricted
                if (viewportWidth / SWIPE_LENIENCY < Math.abs(currentX)) {
                    let mult = currentX < 0 ? -1 : 1;
                    currentX = viewportWidth / SWIPE_LENIENCY * mult;
                    return;
                }
            }
        }

        for (let index = 0; index < 3; index++) {
            featuredBoxes[index].style.transform = "translateX(" + currentX + "px)";
            featuredContainer.style.transition = "0ms";
        }
    }
});


featuredContainer.addEventListener('touchend', function () {
    isDragging = false;

    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    console.log("Viewport width: " + viewportWidth + ", currentX: " + currentX);

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

function swipeToNext(goingRight, SWIPE_TRANSITION) {
    if (atEdge()) {
        if (goingRight ? RECIPE_INDEX <= 0 : RECIPE_INDEX + 1 >= recipeList.length) {
            console.log("ALREADY AT THE EDGE");

            //move all elements back to default position
            currentX = 0;
            return;
        }
    }

    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var isMobile = window.matchMedia("(max-aspect-ratio: 6/5)").matches;

    if (goingRight) {
        //do right stuff
        currentX = featuredBoxes[fMID].clientWidth * (isMobile ? 1.333 : 1.25);
    } else {
        //do left stuff
        currentX = featuredBoxes[fMID].clientWidth * (isMobile ? 1.333 : 1.25) * -1;
    }

    const oldSide = goingRight ? fRIGHT : fLEFT;
    const newSide = goingRight ? fLEFT : fRIGHT;

    //swap elements after timeout
    setTimeout(() => {
        //move index
        nudgeListIndex(goingRight);

        //put new mid's data to mid box (which is now to the side)
        printToFeatured(recipeList[RECIPE_INDEX], featuredBoxes[fMID]);

        //put old mid's data to right?left
        printToFeatured(recipeList[RECIPE_INDEX + (goingRight ? 1 : -1)], featuredBoxes[oldSide]);

        if (!atEdge()) {
            //put new data to left?right
            printToFeatured(recipeList[RECIPE_INDEX + (goingRight ? -1 : 1)], featuredBoxes[newSide]);
        }

        //move all elements back to default position
        currentX = 0;

        //update visual
        updateFeaturedPosition(0); //zero transition time

        //make element beyond edge invisible
        if (atEdge()) {
            featuredBoxes[newSide].style.opacity = "0";
        } else {
            featuredBoxes[newSide].style.opacity = "1";
        }
    }, SWIPE_TRANSITION);
}

function nudgeListIndex(goingRight) {
    console.log("current index: ", RECIPE_INDEX)

    //can go further
    if (!atEdge()) {
        goingRight ? RECIPE_INDEX-- : RECIPE_INDEX++;
        console.log("moved to: ", RECIPE_INDEX);
    } else {
        console.log("can't move further");
    }
}
