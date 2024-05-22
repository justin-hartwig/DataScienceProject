// Imports SCSS
import '../scss/main.scss';

// Imports JS
import { requestCountyData } from './countyDisplay';
import { drawMainMap } from './openStreetMapLeaflet';
import { initializeRentalPriceSlider } from './noUiSlider';
import { initializeButtons } from './buttons';

async function initializeApp() {
    document.addEventListener('DOMContentLoaded', async () => {
        // Data
        await requestCountyData();

        // UI
        drawMainMap();
        initializeRentalPriceSlider();
        initializeButtons();
    });
}

initializeApp();