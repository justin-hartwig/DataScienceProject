import Slider from './classes/slider';

let rentalPriceSlider;
let disposableIncomeSlider;

export function initializeSliders() {
    rentalPriceSlider = new Slider("rentalPriceSlider", "rentalPriceSliderRangeValue", "RentalPrice", "Von", "bis", "€ pro m²");
    disposableIncomeSlider = new Slider("disposableIncomeSlider", "disposableIncomeSliderRangeValue", "DisposableIncome", "Von", "bis", "€ pro Jahr");
    rentalPriceSlider.initializeSlider();
    disposableIncomeSlider.initializeSlider();
}

export function resetAllSlider() {
    rentalPriceSlider.resetSlider();
    disposableIncomeSlider.resetSlider();
}