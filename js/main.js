// Imports SCSS
import '../scss/main.scss';

// Imports JS
import { drawMainMap } from './openStreetMapLeaflet';
import { initializeRentalPriceSlider } from './noUiSlider';

initializeRentalPriceSlider();
drawMainMap();