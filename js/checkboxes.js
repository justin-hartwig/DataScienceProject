import Checkbox from './classes/checkbox';

let rentalPriceSliderCheckbox;
let landPriceRangesCheckbox;
let disposableIncomeSliderCheckbox;
let populationDensityRangesCheckbox;
let unemploymentRateRangesCheckbox;

export function initializeCheckboxes() {
    rentalPriceSliderCheckbox = new Checkbox("rentalPriceSliderCheckbox", "rentalPriceSliderContainer", "_rentalPriceFiltered");
    landPriceRangesCheckbox = new Checkbox("landPriceRangesCheckbox", "landPriceRangesContainer", "_landPriceFiltered");
    disposableIncomeSliderCheckbox = new Checkbox("disposableIncomeSliderCheckbox", "disposableIncomeSliderContainer", "_disposableIncomeFiltered");
    populationDensityRangesCheckbox = new Checkbox("populationDensityRangesCheckbox", "populationDensityRangesContainer", "_populationDensityFiltered");
    unemploymentRateRangesCheckbox = new Checkbox("unemploymentRateRangesCheckbox", "unemploymentRateRangesContainer", "_unemploymentRateFiltered");
    rentalPriceSliderCheckbox.initializeCheckbox();
    landPriceRangesCheckbox.initializeCheckbox();
    disposableIncomeSliderCheckbox.initializeCheckbox();
    populationDensityRangesCheckbox.initializeCheckbox();
    unemploymentRateRangesCheckbox.initializeCheckbox();
}

export function resetAllCheckboxes() {
    rentalPriceSliderCheckbox.activateCheckbox();
    landPriceRangesCheckbox.resetCheckbox();
    disposableIncomeSliderCheckbox.resetCheckbox();
    populationDensityRangesCheckbox.resetCheckbox();
    unemploymentRateRangesCheckbox.resetCheckbox();
}