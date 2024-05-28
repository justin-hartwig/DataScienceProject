// Imports SCSS
import '../scss/main.scss';

// Imports JS
import { requestCountyData } from './countyDisplay';
import { drawMainMap } from './openStreetMapLeaflet';
import { initializeSliders } from './noUiSlider';
import { initializeButtons } from './buttons';
import { initializeButtonGroups } from './buttongroups';
import { initializeCheckboxes } from './checkboxes';

async function initializeApp() {
    document.addEventListener('DOMContentLoaded', async () => {
        // Data
        await requestCountyData();

        // UI
        drawMainMap();
        initializeSliders();
        initializeButtonGroups();
        initializeButtons();
        initializeCheckboxes();
    });
}

initializeApp();