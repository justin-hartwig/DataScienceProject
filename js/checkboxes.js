import Checkbox from './classes/checkbox';

let rentalPriceSliderCheckbox;
let landPriceRangesCheckbox;
let disposableIncomeSliderCheckbox;
let populationDensityRangesCheckbox;
let unemploymentRateRangesCheckbox;
let leasurePerAreaCheckbox;

export function initializeCheckboxes() {
    if (!document.getElementById("rentalPriceSliderCheckbox")) {
        return;
    }
    rentalPriceSliderCheckbox = new Checkbox("rentalPriceSliderCheckbox", "rentalPriceSliderContainer", "_rentalPriceFiltered");
    landPriceRangesCheckbox = new Checkbox("landPriceRangesCheckbox", "landPriceRangesContainer", "_landPriceFiltered");
    disposableIncomeSliderCheckbox = new Checkbox("disposableIncomeSliderCheckbox", "disposableIncomeSliderContainer", "_disposableIncomeFiltered");
    populationDensityRangesCheckbox = new Checkbox("populationDensityRangesCheckbox", "populationDensityRangesContainer", "_populationDensityFiltered");
    unemploymentRateRangesCheckbox = new Checkbox("unemploymentRateRangesCheckbox", "unemploymentRateRangesContainer", "_unemploymentRateFiltered");
    leasurePerAreaCheckbox = new Checkbox("leasurePerAreaCheckbox", "leasurePerAreaContainer", "_leasurePerAreaFiltered");
    rentalPriceSliderCheckbox.initializeCheckbox();
    landPriceRangesCheckbox.initializeCheckbox();
    disposableIncomeSliderCheckbox.initializeCheckbox();
    populationDensityRangesCheckbox.initializeCheckbox();
    unemploymentRateRangesCheckbox.initializeCheckbox();
    leasurePerAreaCheckbox.initializeCheckbox();
}

export function resetAllCheckboxes() {
    if (rentalPriceSliderCheckbox) rentalPriceSliderCheckbox.activateCheckbox();
    if (landPriceRangesCheckbox) landPriceRangesCheckbox.resetCheckbox();
    if (disposableIncomeSliderCheckbox) disposableIncomeSliderCheckbox.resetCheckbox();
    if (populationDensityRangesCheckbox) populationDensityRangesCheckbox.resetCheckbox();
    if (unemploymentRateRangesCheckbox) unemploymentRateRangesCheckbox.resetCheckbox();
    if (leasurePerAreaCheckbox) leasurePerAreaCheckbox.resetCheckbox();
}