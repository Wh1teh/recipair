//background parallax effect
window.addEventListener('scroll', function () {
    var parallax = document.querySelector('.splash-parallax');
    var scrolled = window.scrollY;
    parallax.style.transform = 'translateY(' + (scrolled * 0.8) + 'px)';
});


//splash title generation
var title = "RECIPAIR";
const DUPE_AMOUNT = 8;

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
        titleElement.style.marginTop = ((DUPE_AMOUNT - index - 1) * -2) + 'vw';
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

    splashContent.style.transform = 'translateY(' + (splashTitles.length - 1) * -2 + 'vw)';
});

splashInput.addEventListener("blur", function () {
    for (let index = 0; index < splashTitles.length; index++) {
        splashTitles[index].style.marginTop = ((splashTitles.length - index - 1) * -2) + 'vw';
    }

    splashContent.style.transform = 'translateY(' + 0 + 'vh)';
});


// function getWords(inputString) {
//     // Split the input string using non-alphabet characters as separators
//     var words = inputString.split(/[^a-zA-Z]+/);

//     // Remove duplicates, null, and zero-length items
//     var uniqueWords = words.filter(function (item, index, self) {
//         return item && index === self.indexOf(item);
//     });

//     return uniqueWords;
// }

// function handleFormSubmit() {
//     // Get the input value from the form
//     var inputString = document.getElementById("inputString").value;

//     // Call the getWords function to process the input and get the array of unique words
//     var uniqueWords = getWords(inputString);

//     // Output the result
//     console.log(uniqueWords); // You can change this to do whatever you want with the array

//     // Prevent form submission
//     return false;
// }

var splashForm = document.querySelector("#splash-form");
splashForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            putRecipeData(this.responseText);
        }
    };
    xhttp.open("GET", this.getAttribute("action") + "?" + new URLSearchParams(formData).toString(), true);
    xhttp.send();
});

function putRecipeData(serverResponse) {
    console.log(serverResponse);

    if (!isJson(serverResponse)) {
        console.log("not json")
        return false;
    }

    var jsonTable = JSON.parse(serverResponse)
    if (!Object.keys(jsonTable).length > 0) {
        console.log("empty response")
        return false;
    }

    for (let index = 0; index < jsonTable.length; index++) {
        const jsonObj = jsonTable[index];

        console.log(jsonObj.title)
        printToFeatured(jsonObj)
    }

    return true
}

function printToFeatured(jsonObj) {
    console.log(jsonObj.title)

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