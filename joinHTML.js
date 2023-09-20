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

    var combinedHTML = `${head}${header}${nav}`;

    if (sections != null) {
        sections.forEach(element => {
            const section = fs.readFileSync(element, 'utf8');
            combinedHTML += `${section}`
        });

    }

    combinedHTML += `${footer}`;

    //console.log(combinedHTML)

    return combinedHTML;
}

function getHead() {
    return fs.readFileSync(publicPath + 'head.html', 'utf8');
}

function getHeader() {
    return fs.readFileSync(publicPath + 'header.html', 'utf8');
}

function getNav() {
    return fs.readFileSync(publicPath + 'nav.html', 'utf8');
}

function getFooter() {
    return fs.readFileSync(publicPath + 'footer.html', 'utf8');
}



module.exports = {
    combineHTML: combineHTML,
    getHead: getHead,
    getHeader: getHeader,
    getNav: getNav,
    getFooter: getFooter
};