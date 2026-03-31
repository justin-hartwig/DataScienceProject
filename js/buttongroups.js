import ButtonGroup from './classes/buttongroup';

let landPriceButtonGroup;
let populationDensityButtonGroup;
let unemploymentRateButtonGroup;

export function initializeButtonGroups() {
    if (!document.getElementById("landPriceRanges")) {
        return;
    }
    landPriceButtonGroup = new ButtonGroup("landPriceRanges", "landPrice", ["unter 50", "50 bis 100", "100 bis 200", "200 bis 300", "300 bis 500", "über 500"], ["bis unter 50", "50 bis unter 100", "100 bis unter 200", "200 bis unter 300", "300 bis unter 500", "500 und mehr"]);
    populationDensityButtonGroup = new ButtonGroup("populationDensityRanges", "populationDensity", ["Sehr Niedrig", "Niedrig", "Mittel", "Hoch", "Sehr Hoch"], [66, 10584.75, 21103.5, 31622.25, 42141]);
    unemploymentRateButtonGroup = new ButtonGroup("unemploymentRateRanges", "unemploymentRate", ["Sehr Niedrig", "Niedrig", "Mittel", "Hoch", "Sehr Hoch"], [1.7, 4.8, 7.9, 11.0, 14.1]);
    landPriceButtonGroup.initializeButtonGroup();
    populationDensityButtonGroup.initializeButtonGroup();
    unemploymentRateButtonGroup.initializeButtonGroup();
}

export function resetAllButtonGroups() {
    if (landPriceButtonGroup) landPriceButtonGroup.resetButtonGroup();
    if (populationDensityButtonGroup) populationDensityButtonGroup.resetButtonGroup();
    if (unemploymentRateButtonGroup) unemploymentRateButtonGroup.resetButtonGroup();
}