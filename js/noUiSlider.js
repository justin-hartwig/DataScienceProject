import Slider from './classes/slider';

let rentalPriceSlider;
let disposableIncomeSlider;

export function initializeSliders() {
    const rentalSliderDiv = document.getElementById("rentalPriceSlider");
    const incomeSliderDiv = document.getElementById("disposableIncomeSlider");

    if (!rentalSliderDiv || !incomeSliderDiv) {
        console.warn("Slider-Elemente nicht gefunden. Slider werden nicht initialisiert (wahrscheinlich falsche Unterseite).");
        return;
    }

    rentalPriceSlider = new Slider("rentalPriceSlider", "rentalPriceSliderRangeValue", "RentalPrice", "Von", "bis", "€ pro m²");
    disposableIncomeSlider = new Slider("disposableIncomeSlider", "disposableIncomeSliderRangeValue", "DisposableIncome", "Von", "bis", "€ pro Jahr");
    
    rentalPriceSlider.initializeSlider();
    disposableIncomeSlider.initializeSlider();
}

export function resetAllSlider() {
    // Prüfen, ob die Variablen existieren, bevor resettet wird
    if (rentalPriceSlider) rentalPriceSlider.resetSlider();
    if (disposableIncomeSlider) disposableIncomeSlider.resetSlider();
}