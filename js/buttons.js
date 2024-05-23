import {resetAllSlider} from './noUiSlider';

export function initializeButtons() {
    initializeResetAllFiltersButton();
}

function initializeResetAllFiltersButton() {
    const resetButton = document.getElementById("resetAllFilters");

    resetButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        resetAllSlider();
    });
}