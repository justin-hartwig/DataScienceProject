import Slider from './classes/slider';

let rentalPriceSlider;

export function initializeSliders() {
    rentalPriceSlider = new Slider("rentalPriceSlider", "rentalPriceSliderRangeValue", "rentalprices", "Von", "bis", "€ pro m²");
    rentalPriceSlider.initializeSlider();
}

export function resetAllSlider() {
    rentalPriceSlider.resetSlider();
}