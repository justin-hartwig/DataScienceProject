import { filter, updateDisplayedCounties } from '../countyDisplay';
import { updateCounties } from '../openStreetMapLeaflet';

export default class Checkbox {
    constructor(checkboxId, containerClass, filterValue) {
        this._checkboxId = checkboxId;
        this._containerClass = containerClass;
        this._filterValue = filterValue;
        this._checkboxElement;
        this._containerElement;
    }

    get checkboxId() {
        return this._checkboxId;
    }

    get containerClass() {
        return this._containerClass;
    }

    get filterValue() {
        return this._filterValue;
    }

    get containerElement() {
        return this._containerElement;
    }

    get checkboxElement() {
        return this._checkboxElement;
    }

    initializeCheckbox() {
        this._checkboxElement = document.getElementById(this._checkboxId);
        this._containerElement = document.querySelector("." + this._containerClass);
        this._checkboxElement.addEventListener('click', (event) => {
            this.toggleFilter();
        })
    }

    toggleFilter() {
        if (this._checkboxElement.checked) {
            this._containerElement.classList.remove('disabled');
            filter[this._filterValue] = true;

        } else {
            this._containerElement.classList.add('disabled');
            filter[this._filterValue] = false;
        }
        
        updateDisplayedCounties();
        updateCounties();
    }

    resetCheckbox() {
        this._containerElement.classList.add('disabled');
        this._checkboxElement.checked = false;
        filter[this._filterValue] = false;
    }

    activateCheckbox() {
        this._containerElement.classList.remove('disabled');
        this._checkboxElement.checked = true;
        filter[this._filterValue] = true;
    }
}