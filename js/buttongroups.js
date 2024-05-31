import ButtonGroup from './classes/buttongroup';

let landPriceButtonGroup;
let populationDensityButtonGroup;
let unemploymentRateButtonGroup;

export function initializeButtonGroups() {
    landPriceButtonGroup = new ButtonGroup("landPriceRanges", "landPrice", ["< 50", "50 - 100", "100 - 200", "200 - 300", "300 - 500", "> 500"], ["bis unter 50", "50 bis unter 100", "100 bis unter 200", "200 bis unter 300", "300 bis unter 500", "500 und mehr"]);
    populationDensityButtonGroup = new ButtonGroup("populationDensityRanges", "populationDensity", ["Sehr Niedrig", "Niedrig", "Mittel", "Hoch", "Sehr Hoch"], [66, 10584.75, 21103.5, 31622.25, 42141]);
    unemploymentRateButtonGroup = new ButtonGroup("unemploymentRateRanges", "unemploymentRate", ["Sehr Niedrig", "Niedrig", "Mittel", "Hoch", "Sehr Hoch"], [1.7, 4.8, 7.9, 11.0, 14.1]);
    landPriceButtonGroup.initializeButtonGroup();
    populationDensityButtonGroup.initializeButtonGroup();
    unemploymentRateButtonGroup.initializeButtonGroup();
}

export function resetAllButtonGroups() {
    landPriceButtonGroup.resetButtonGroup();
    populationDensityButtonGroup.resetButtonGroup();
    unemploymentRateButtonGroup.resetButtonGroup();
}