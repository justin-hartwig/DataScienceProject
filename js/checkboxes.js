import Checkbox from './classes/checkbox';

let rentalPriceSliderCheckbox;
let landPriceRangesCheckbox;
let disposableIncomeSliderCheckbox;

export function initializeCheckboxes() {
    rentalPriceSliderCheckbox = new Checkbox("rentalPriceSliderCheckbox", "rentalPriceSliderContainer", "_rentalPriceFiltered");
    landPriceRangesCheckbox = new Checkbox("landPriceRangesCheckbox", "landPriceRangesContainer", "_landPriceFiltered");
    disposableIncomeSliderCheckbox = new Checkbox("disposableIncomeSliderCheckbox", "disposableIncomeSliderContainer", "_disposableIncomeFiltered");
    rentalPriceSliderCheckbox.initializeCheckbox();
    landPriceRangesCheckbox.initializeCheckbox();
    disposableIncomeSliderCheckbox.initializeCheckbox();
}

export function resetAllCheckboxes() {
    rentalPriceSliderCheckbox.activateCheckbox();
    landPriceRangesCheckbox.resetCheckbox();
    disposableIncomeSliderCheckbox.resetCheckbox();
}