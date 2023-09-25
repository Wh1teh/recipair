//background parallax effect
window.addEventListener('scroll', function () {
    var parallax = document.querySelector('.splash-parallax');
    var scrolled = window.scrollY;
    parallax.style.transform = 'translateY(' + (scrolled * 0.8) + 'px)';
});


//splash title generation
var title = "RECIPAIR";
const DUPE_AMOUNT = 8;
const TITLE_OFFSET = -2;
var TITLE_OFFSET_MULTIPLIER = 1.0

for (let index = 0; index < DUPE_AMOUNT; index++) {
    const titleElement = document.createElement('h1');

    // Set content and attributes of the element
    titleElement.textContent = title;
    titleElement.setAttribute('class', 'splash-title');
    titleElement.setAttribute('data-content', title)
    titleElement.style.zIndex = -index;
    titleElement.style.opacity = (index + 1) / DUPE_AMOUNT;
    if (index + 1 != DUPE_AMOUNT) {
        //don't apply to last title (this is gonna be the main one)
        titleElement.style.marginTop = ((DUPE_AMOUNT - index - 1) * TITLE_OFFSET) + 'dvw';
    }

    // Write element to document
    document.querySelector('.splash-title-container').appendChild(titleElement);
}




//

var splashInput = document.querySelector("#splash-search");
var splashContent = document.querySelector('.splash-content');
var splashTitles = document.querySelectorAll(".splash-title");

splashInput.addEventListener("focus", function () {
    for (let index = 0; index < splashTitles.length; index++) {
        splashTitles[index].style.marginTop = "0";
    }

    splashContent.style.transform =
        'translateY(' + (splashTitles.length - 1) * (TITLE_OFFSET * TITLE_OFFSET_MULTIPLIER) + 'dvw)';
});

splashInput.addEventListener("blur", function () {
    for (let index = 0; index < splashTitles.length; index++) {
        splashTitles[index].style.marginTop =
            ((splashTitles.length - index - 1) * (TITLE_OFFSET * TITLE_OFFSET_MULTIPLIER)) + 'dvw';
    }

    splashContent.style.transform = 'translateY(' + 0 + 'dvh)';
});

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
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    resolve(this.responseText); // Resolve promise with response text
                } else {
                    reject(new Error('Request failed')); // Reject promise with error
                }
            }
        };

        // Convert filteredFormData to query string
        const queryString = Object.entries(filteredFormData)
            .map(([key, values]) => values.map(value => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&"))
            .join("&");

        xhttp.open("GET", this.getAttribute("action") + "?" + queryString, true);
        xhttp.send();
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

function putRecipeData(serverResponse, animationTimer) {
    console.log(serverResponse);

    if (!isJson(serverResponse)) {
        console.log("not json");
    }

    var jsonTable = JSON.parse(serverResponse)
    if (!Object.keys(jsonTable).length > 0) {
        console.log("empty response");
    }

    for (let index = 0; index < jsonTable.length; index++) {
        const jsonObj = jsonTable[index];

        printToFeatured(jsonObj);
    }

    finishFeaturedTransition(animationTimer);
}

const TRANSITION_LEN = 1000;
const FLASH_DELAY = 500;
function startFeaturedTransition() {
    return new Promise((resolve) => {
        const titleH3 = document.querySelector(".featured-title h3");
        titleH3.classList.add("animation-in");

        const sideImgOverlay = document.querySelector(".featured-img .img-overlay");
        sideImgOverlay.classList.add("animation-in");

        //add flashing animation
        var animationTimer = Date.now() - FLASH_DELAY;

        setTimeout(() => {
            document.querySelector(".featured-title").classList.add("waiting");
            document.querySelector(".featured-content").classList.add("waiting");
        }, FLASH_DELAY)

        //remove the transition animation after one second
        setTimeout(() => {
            titleH3.style.opacity = 0;
            titleH3.classList.remove("animation-in");

            document.querySelector(".featured-img img").style.filter = "brightness(0)";
            sideImgOverlay.classList.remove("animation-in");

            resolve(animationTimer);
        }, TRANSITION_LEN);
    });
}

function finishFeaturedTransition(animationTimer) {
    //remove flashing animation
    const currentTime = Date.now();
    setTimeout(() => {
        document.querySelector(".featured-title").classList.remove("waiting");
        document.querySelector(".featured-content").classList.remove("waiting");
    }, (currentTime - animationTimer) % (TRANSITION_LEN * 2));

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

function printToFeatured(jsonObj) {
    document.querySelector(".featured-title h3").innerHTML = jsonObj.title;
    document.querySelector(".featured-text p").innerHTML = jsonObj.content;

    document.querySelector(".star-rating").setAttribute("data-content", jsonObj.rating);
    updateRatings();

    document.querySelector(".featured-submitter a").innerHTML = "PLACEHOLDER"; //TODO  
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
if('virtualKeyboard' in navigator) {
    navigator.virtualKeyboard.overlaysContent = true;
  }

// Function to change h1 margin-top
function changeTitleMarginTop(aspectQueryList) {
    //find first aspect ratio that matches
    switch (aspectQueryList.findIndex((item) => item.matches === true)) {
        case 0:
            console.log("detected <2/3 aspect ratio");
            TITLE_OFFSET_MULTIPLIER = 2.5;
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
