// Imports SCSS
import '../scss/main.scss';

// Imports JS
import { drawMainMap } from './openStreetMapLeaflet';
import { initializeSliders } from './noUiSlider';

initializeSliders();
drawMainMap();