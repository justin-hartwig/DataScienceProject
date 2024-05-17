import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import {getMaxPricePerSquareMeter, getMinPricePerSquareMeter} from './countyDisplay';

export function initializeRentalPriceSlider() {
    
        var slider = document.getElementById('rentalPriceSlider');

        const minPrice = parseFloat(getMinPricePerSquareMeter());
        const maxPrice = parseFloat(getMaxPricePerSquareMeter());

        console.log(getMinPricePerSquareMeter(), getMaxPricePerSquareMeter())
        console.log(minPrice, maxPrice)

        if (isNaN(minPrice) || isNaN(maxPrice)) {
            console.error('Error: minPrice or maxPrice is not a number.');
            return;
        }

        noUiSlider.create(slider, {
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

        slider.noUiSlider.on('update', function (values, handle) {
            rangeValue.innerHTML = `Von ${values[0]} bis ${values[1]}`;
        });

}
