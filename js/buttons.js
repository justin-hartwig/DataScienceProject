import {resetAllSlider} from './noUiSlider';
import {resetAllCheckboxes} from './checkboxes';
import {resetAllButtonGroups} from './buttongroups';
import {updateDisplayedCounties} from './countyDisplay';
import {updateCounties} from './openStreetMapLeaflet';


export function initializeButtons() {
    initializeResetAllFiltersButton();
}

function initializeResetAllFiltersButton() {
    const resetButton = document.getElementById("resetAllFilters");

    resetButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        resetAllSlider();
        resetAllButtonGroups();
        resetAllCheckboxes();
        updateDisplayedCounties();
        updateCounties();
    });
}