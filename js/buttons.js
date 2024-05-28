import {resetAllSlider} from './noUiSlider';
import {resetAllCheckboxes} from './checkboxes';
import {resetAllButtonGroups} from './buttongroups';


export function initializeButtons() {
    initializeResetAllFiltersButton();
}

function initializeResetAllFiltersButton() {
    const resetButton = document.getElementById("resetAllFilters");

    resetButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        resetAllSlider();
        resetAllCheckboxes();
        resetAllButtonGroups();
    });
}