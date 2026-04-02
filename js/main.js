// Packages
import * as d3 from 'd3';
import 'bootstrap'

// Imports SCSS
import '../scss/main.scss';

// Imports JS
import { requestCountyData } from './countyDisplay';
import { initializeCharts } from './chartDisplay';
import { initializeQuiz } from './quiz';
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
    initializeQuiz();
}

function handleRoutesForJS() {
    const path = window.location.pathname;

    if (path === "/app" || path === "/app.html" || path.endsWith("/app")) {
        initializeApp();
    } 
    else if (path === "/" || path === "/index.html" || path === "") {
        initializeStory();
    
        if (window.location.hash) {
            const hash = window.location.hash;
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) element.scrollIntoView();
            }, 500);
        }
    }
    else {
        console.log("Kein spezifisches JS für diese Route geladen.");
    }
}

handleRoutesForJS();