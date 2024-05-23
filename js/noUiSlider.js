import Slider from './classes/slider';

let rentalPriceSlider;

export function initializeSliders() {
    rentalPriceSlider = new Slider("rentalPriceSlider", "rentalPriceSliderRangeValue", "rentalprice");
    rentalPriceSlider.initializeSlider();
}

export function resetAllSlider() {
    rentalPriceSlider.resetSlider();
}