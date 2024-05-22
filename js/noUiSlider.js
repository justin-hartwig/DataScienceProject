import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import { getMaxPricePerSquareMeter, getMinPricePerSquareMeter, updateDisplayedCounties } from './countyDisplay';
import { drawCounties } from './openStreetMapLeaflet';
import Filter from './classes/filter';

let rentalPriceSlider;
let rentalPriceRangeValue;
let rentalPriceRangeDefault;
let filter = new Filter;

export function initializeRentalPriceSlider() {

    rentalPriceSlider = document.getElementById('rentalPriceSlider');

    const minPrice = parseFloat(getMinPricePerSquareMeter());
    const maxPrice = parseFloat(getMaxPricePerSquareMeter());

    if (isNaN(minPrice) || isNaN(maxPrice)) {
        console.error('Error: minPrice or maxPrice is not a number.');
        return;
    }

    noUiSlider.create(rentalPriceSlider, {
        start: [minPrice, maxPrice], // Initial values for the handles
        connect: true,  // Connect the handles with a colored bar
        range: {
            'min': minPrice,
            'max': maxPrice
        },
        format: wNumb({
            decimals: 2,  // Show 2 decimal places
            thousand: '.',  // Use '.' as the thousand separator
        })
    });

    rentalPriceRangeValue = document.getElementById('rentalPriceSliderRangeValue');
    rentalPriceRangeDefault = `Von ${minPrice} bis ${maxPrice} € pro m²`
    rentalPriceRangeValue.innerHTML = rentalPriceRangeDefault;

    rentalPriceSlider.noUiSlider.on('change', function (values, handle) {
        onRentalPriceSliderSliderChange();
    });
}

export function getCurrentSliderValues() {
    if (rentalPriceSlider && rentalPriceSlider.noUiSlider) {
        const values = rentalPriceSlider.noUiSlider.get();
        return {
            min: parseFloat(values[0].replace('.', '').replace(',', '.')),
            max: parseFloat(values[1].replace('.', '').replace(',', '.'))
        };
    } else {
        return null;
    }
}

function onRentalPriceSliderSliderChange() {
    const sliderValues = getCurrentSliderValues();
 
    if (sliderValues) {
        rentalPriceRangeValue.innerHTML = `Von ${sliderValues.min} bis ${sliderValues.max} € pro m²`;
        filter._maxRentalPrice = sliderValues.max;
        filter._minRentalPrice = sliderValues.min;
        updateDisplayedCounties(filter);
        drawCounties();
    }
}

export function resetRentalPriceSlider() {
    rentalPriceSlider.noUiSlider.reset();
    onRentalPriceSliderSliderChange();
}