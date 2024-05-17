import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

// Assuming you've already imported noUiSlider and wNumb

export function initializeSliders() {
    document.addEventListener('DOMContentLoaded', () => {
        var slider = document.getElementById('rentalPriceSlider');
        noUiSlider.create(slider, {
            start: [20, 80], // Initial values for the handles
            connect: true,  // Connect the handles with a colored bar
            range: {
                'min': 0,
                'max': 100
            },
            tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })] // Tooltips to show current values
        });
    
        var rangeValue = document.getElementById('rentalPriceSliderRangeValue');
    
        slider.noUiSlider.on('update', function (values, handle) {
            rangeValue.innerHTML = `Range: ${values[0]} - ${values[1]}`;
        });
    });
}