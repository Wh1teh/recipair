// const fs = require('fs');

// // Read the content of each HTML file
// const nav = fs.readFileSync('nav.html', 'utf-8');
// const article = fs.readFileSync('article.html', 'utf-8');
// const footer = fs.readFileSync('footer.html', 'utf-8');

// // Concatenate the HTML components
// const fullHTML = nav + article + footer;

// // Write the concatenated HTML to a new file
// fs.writeFileSync('joined.html', fullHTML);

const fs = require('fs');

const publicPath = 'public/html/';

function combineHTML(sections) {
    const head = getHead();
    const header = getHeader();
    const nav = getNav();
    const footer = getFooter();

    var combined = `${head}${header}${nav}`;

    combined += getSections(sections)

    combined += `${footer}`;

    //console.log(combinedHTML)

    return combined;
}

function combineHTMLcustom(customGetters) {
    var combined = ``

    customGetters.forEach(element => {
        combined += `${element}`
    });

    return combined;
}

function getHead() {
    return fs.readFileSync(publicPath + 'head.html', 'utf8');
}

function getHeader() {
    if (arguments.length > 1) {
        throw new Error("Invalid number of parameters");
    }

    if (arguments.length === 0) {
        return fs.readFileSync(publicPath + 'header.html', 'utf8');
    }

    if (arguments[0] == "mini") {
        return fs.readFileSync(publicPath + 'miniheader.html', 'utf8');
    }

    throw new Error("Invalid parameter value");
}

function getNav() {
    return fs.readFileSync(publicPath + 'nav.html', 'utf8');
}

function getFooter() {
    return fs.readFileSync(publicPath + 'footer.html', 'utf8');
}

function getSections(sections) {
    var combined = ``

    sections.forEach(element => {
        combined += `${fs.readFileSync(element, 'utf8')}`
    });

    return combined
}



module.exports = {
    combineHTML: combineHTML,
    combineHTMLcustom: combineHTMLcustom,
    getHead: getHead,
    getHeader: getHeader,
    getNav: getNav,
    getFooter: getFooter,
    getSections: getSections,
};