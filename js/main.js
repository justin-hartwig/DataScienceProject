// Imports SCSS
import '../scss/main.scss';

// Imports JS
import { requestCountyData } from './countyDisplay';
import { drawMainMap } from './openStreetMapLeaflet';
import { initializeRentalPriceSlider } from './noUiSlider';

// Data
requestCountyData();

// UI
initializeRentalPriceSlider();
drawMainMap();
