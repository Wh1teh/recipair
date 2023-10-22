export class TitleManager {
    title;
    dupeAmount;
    offset;
    offsetMultiplier;

    constructor(title, amount, offset, offsetMultiplier) {
        this.title = title;
        this.dupeAmount = amount;
        this.offset = offset;
        this.offsetMultiplier = offsetMultiplier;
    }

    generateTitle() {
        for (let index = 0; index < this.dupeAmount; index++) {
            const titleElement = document.createElement('h1');

            // Set content and attributes of the element
            titleElement.textContent = this.title;
            titleElement.setAttribute('class', 'splash-title');
            titleElement.setAttribute('data-content', this.title)
            titleElement.style.zIndex = index;
            titleElement.style.opacity = (index + 1) / this.dupeAmount;

            //is last element
            if (index + 1 == this.dupeAmount) {
                titleElement.style.color = "transparent";
                titleElement.style.opacity = "1";
                titleElement.style.textShadow = "none";
            } else {
                titleElement.style.marginTop = ((this.dupeAmount - index - 1) * this.offset) + 'dvw';
                titleElement.style.webkitTextStrokeColor = "transparent";
            }

            const interval = 800;
            const intervalPhase = this.dupeAmount; //if this is 2, you're gonna see 2 trails at a time
            setTimeout(() => {
                setTimeout(() => {
                    //is last element
                    if (index + 1 == this.dupeAmount) {
                        titleElement.style.color = "var(--first-color)";
                        titleElement.style.opacity = "1";
                    } else {
                        titleElement.style.webkitTextStrokeColor = "var(--first-color)";
                        titleElement.style.color = "transparent";
                    }
                }, interval);

                titleElement.style.color = "var(--first-color)";
            }, interval * (index + 1) / intervalPhase);

            // Write element to document
            document.querySelector('.splash-title-container').appendChild(titleElement);
        }
    }

    // change title margin-top based on aspect ratio 
    changeTitleMarginTop(aspectQueryList) {
        //find first aspect ratio that matches
        switch (aspectQueryList.findIndex((item) => item.matches === true)) {
            case 0:
                console.log("detected <2/3 aspect ratio");
                this.offsetMultiplier = 1.5;
                break;

            case 1:
                console.log("detected <6/5 aspect ratio");
                this.offsetMultiplier = 1.5;
                break;

            default:
                console.log("default? aspect ratio");
                this.offsetMultiplier = 1.0
                break;
        }

        const titleElements = document.querySelectorAll('.splash-content h1');

        for (let index = 0; index < this.dupeAmount; index++) {
            if (index + 1 != this.dupeAmount) {
                //don't apply to last title (this is gonna be the main one)
                titleElements[index].style.marginTop =
                    ((this.dupeAmount - index - 1) * (this.offset * this.offsetMultiplier)) + 'dvw';
            }
        }
    }

}