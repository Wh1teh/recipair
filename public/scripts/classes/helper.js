export class Helper {
    constructor() {
        console.log("Helper created!")
    }

    putImagetoElement(toElement, title, customImgPath) {
        //base of image path   
        const path = "../img/";
        const prefix = "featured_sample_";

        //parse/title_into_this_form.jpg
        const imgPath = customImgPath || path + prefix + title.split(" ").join("_").toLowerCase() + ".jpg";

        //put img path to element
        toElement.setAttribute("src", imgPath);
    }

    zigzagSort(objects) {
        // Sort the objects by the "rating" key in descending order
        objects.sort((a, b) => b.rating - a.rating);

        const result = [];

        //add to end and front alternatingly from the top, resulting in lowest values being at the edges
        for (let index = 0; index < objects.length; index++) {
            const element = objects[index];
            if (index % 2 == 0) {
                result.push(element);
            } else {
                result.unshift(element);
            }
        }

        return result;
    }

    getErrorObject() {
        const errorObject = [
            {
                content:
                    "Something went wrong..."
                , date:
                    null
                , edit_date:
                    null
                , edited:
                    null
                , id:
                    null
                , rating:
                    null
                , title:
                    "Network Error"
                , writer_id:
                    null
            }
        ]

        return JSON.stringify(errorObject);
    }

    isTextOverflowingHorizontally(element) {
        return element.offsetWidth > element.parentNode.offsetWidth;
    }

    isTextOverflowingVertically(element) {
        return element.offsetHeight > element.parentNode.offsetHeight;
    }

    //for mobile debug reasons print to search bar
    debugPrintToSearch(whatToPrint) {
        document.getElementById("splash-search").setAttribute("placeholder", whatToPrint);
    }

}
