import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import {getMaxPricePerSquareMeter, getMinPricePerSquareMeter, updateDisplayedCounties} from './countyDisplay';
import {drawCounties} from './openStreetMapLeaflet';
import Filter from './classes/filter';

let rentalPriceSlider;
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

        var rangeValue = document.getElementById('rentalPriceSliderRangeValue');
        rangeValue.innerHTML = `Von ${minPrice} bis ${maxPrice} € pro m²`;

        rentalPriceSlider.noUiSlider.on('change', function (values, handle) {
            rangeValue.innerHTML = `Von ${values[0]} bis ${values[1]} € pro m²`;
    
            // Get current slider values and update displayed counties
            const sliderValues = getCurrentSliderValues();
            
            if (sliderValues) {
                filter._maxRentalPrice = sliderValues.max;
                filter._minRentalPrice = sliderValues.min;
                updateDisplayedCounties(filter);
                drawCounties();
            }
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