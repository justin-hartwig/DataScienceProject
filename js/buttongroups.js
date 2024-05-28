import ButtonGroup from './classes/buttongroup';

let landPriceButtonGroup;

export function initializeButtonGroups() {
    landPriceButtonGroup = new ButtonGroup("landPriceRanges", ["< 50", "50 - 100", "100 - 200", "200 - 300", "300 - 500", "> 500"], ["bis unter 50", "50 bis unter 100", "100 bis unter 200", "200 bis unter 300", "300 bis unter 500", "500 und mehr"]);
    landPriceButtonGroup.initializeButtonGroup();
}

export function resetAllButtonGroups() {
    landPriceButtonGroup.resetButtonGroup();
}