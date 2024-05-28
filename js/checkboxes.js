import Checkbox from './classes/checkbox';

let rentalPriceSliderCheckbox;
let landPriceRangesCheckbox;

export function initializeCheckboxes() {
    rentalPriceSliderCheckbox = new Checkbox("rentalPriceSliderCheckbox", "rentalPriceSliderContainer", "_rentalPriceFiltered");
    landPriceRangesCheckbox = new Checkbox("landPriceRangesCheckbox", "landPriceRangesContainer", "_landPriceFiltered");
    rentalPriceSliderCheckbox.initializeCheckbox();
    landPriceRangesCheckbox.initializeCheckbox();
}

export function resetAllCheckboxes() {
    rentalPriceSliderCheckbox.activateCheckbox();
    landPriceRangesCheckbox.resetCheckbox();
}