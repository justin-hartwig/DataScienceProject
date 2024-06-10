// Imports SCSS
import '../scss/main.scss';

// Imports JS
import { requestCountyData } from './countyDisplay';
import { initializeCharts } from './chartDisplay';
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

function initializeStory() {
    initializeCharts();
}

function handleRoutesForJS() {
    const url = window.location.href;
    if (url.includes("app")) {
        initializeApp();
    } else if (url.endsWith('/') || url === window.location.origin) {
        initializeStory();
    }
}

// Execute the function
handleRoutesForJS();