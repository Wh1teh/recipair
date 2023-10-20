//recipe page

document.addEventListener("DOMContentLoaded", function () {
    console.log("content loaded")
    // Check if the "section .recipe" exists
    if (document.querySelector("section.recipe") !== null) {
        console.log("exists")
        // Change the "src" attribute of ".recipe-image img"
        // document.querySelector(".recipe-image img").src = "orange_chicken.jpg";
        putImagetoElementGeneric(".recipe-image img", ".recipe-title");
    }
});

function putImagetoElementGeneric(putToElement, titleElement,) {
    console.log(putToElement, titleElement)
    const title = document.querySelector(titleElement).innerHTML

    //TODO? maybe these shouldn't be this hardcoded idk
    const path = "../img/";
    const prefix = "featured_sample_";

    // parse/title_into_this_form.jpg
    const imgPath = path + prefix + title.split(" ").join("_").toLowerCase() + ".jpg";

    const imgElement = document.querySelector(putToElement)
    imgElement.setAttribute("src", imgPath);
}