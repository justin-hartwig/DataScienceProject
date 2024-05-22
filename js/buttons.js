import {resetRentalPriceSlider} from './noUiSlider';
import {drawCounties} from './openStreetMapLeaflet';


export function initializeButtons() {
    initializeResetAllFiltersButton();
}

function initializeResetAllFiltersButton() {
    const resetButton = document.getElementById("resetAllFilters");

    resetButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        resetRentalPriceSlider();
    });
}