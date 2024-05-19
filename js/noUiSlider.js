import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import {getMaxPricePerSquareMeter, getMinPricePerSquareMeter, updateDisplayedCounties} from './countyDisplay';
import {drawCounties} from './openStreetMapLeaflet';

let rentalPriceSlider;

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
                postfix: ' €',   // Append '€' to the values
            })
        });

        var rangeValue = document.getElementById('rentalPriceSliderRangeValue');

        rentalPriceSlider.noUiSlider.on('change', function (values, handle) {
            rangeValue.innerHTML = `Von ${values[0]} bis ${values[1]}`;
    
            // Get current slider values and update displayed counties
            const sliderValues = getCurrentSliderValues();
            if (sliderValues) {
                updateDisplayedCounties(sliderValues.max, sliderValues.min);
                drawCounties();
            }
        });
}

export function getCurrentSliderValues() {
    if (rentalPriceSlider && rentalPriceSlider.noUiSlider) {
        const values = rentalPriceSlider.noUiSlider.get();
        return {
            min: parseFloat(values[0].replace(' €', '').replace('.', '').replace(',', '.')),
            max: parseFloat(values[1].replace(' €', '').replace('.', '').replace(',', '.'))
        };
    } else {
        return null;
    }
}