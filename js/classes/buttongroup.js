import { filter, updateDisplayedCounties } from '../countyDisplay';
import { drawCounties } from '../openStreetMapLeaflet';

export default class ButtonGroup {
    constructor(buttonGroupId, rangesSite, rangesDb) {
        this._buttonGroupId = buttonGroupId;
        this._rangesSite = rangesSite;
        this._rangesDb = rangesDb;
        this._buttonGroupElement;
        this._buttonActive = false;
        this._buttons;
    }

    get buttonGroupId() {
        return this._buttonGroupId;
    }

    get rangesSite() {
        return this._rangesSite;
    }

    get rangesDb() {
        return this._rangesDb;
    }

    get buttonGroupElement() {
        return this._buttonGroupElement;
    }

    get buttonActive() {
        return this._buttonActive;
    }


    initializeButtonGroup() {
        this._buttonGroupElement = document.getElementById(this._buttonGroupId);
        this._buttons = this._buttonGroupElement.children;

        Array.from(this._buttons).forEach(button => {
            button.addEventListener('click', (event) => {
                this.toggleButton(event);
            });
        });
    }


    toggleButton(event) {
        const button = event.target;
        const buttonText = button.textContent || button.innerText;
        if (button.classList.contains("active")) {
            filter.removeRange(filter._landPriceActiveRange, this.mapRangeValue(buttonText));
        } else {
            filter.addRange(filter._landPriceActiveRange, this.mapRangeValue(buttonText));
        }
        button.classList.toggle('active');
        updateDisplayedCounties();
        drawCounties();
    }

    resetButtonGroup() {
        Array.from(this._buttons).forEach(button => {
            button.classList.add('active');
        });
        filter.resetRange(filter._landPriceDefaultRange, filter._landPriceActiveRange);
    }

    mapRangeValue(siteValue) {
        const index = this._rangesSite.indexOf(siteValue);
        if (index !== -1) {
            return this._rangesDb[index];
        }
        return null;
    }
}