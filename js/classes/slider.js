import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import Filter from './filter';
import { getMaxValue, getMinValue, updateDisplayedCounties } from '../countyDisplay';
import { drawCounties } from '../openStreetMapLeaflet';

let filter = new Filter;

export default class Slider {
    constructor(sliderId, rangeId, tableName, fromText, toText, unitText) {
        this._sliderId = sliderId;
        this._sliderElement;
        this._rangeId = rangeId;
        this._rangeElement;
        this._defaultRange;
        this._tableName = tableName;
        this._fromText = fromText;
        this._toText = toText;
        this._unitText = unitText;
    }

    get sliderId() {
        return this._sliderId;
    }

    get rangeId() {
        return this._rangeId;
    }

    initializeSlider() {
        filter._rentalPriceDisplayed = true;
        this._sliderElement = document.getElementById(this._sliderId);
    
        const minPrice = parseFloat(getMinValue(this._tableName));
        const maxPrice = parseFloat(getMaxValue(this._tableName));
    
        if (isNaN(minPrice) || isNaN(maxPrice)) {
            console.error('Error: minPrice or maxPrice is not a number.');
            return;
        }
    
        noUiSlider.create(this._sliderElement, {
            start: [minPrice, maxPrice], // Initial values for the handles
            connect: true,  // Connect the handles with a colored bar
            range: {
                'min': minPrice,
                'max': maxPrice
            },
            format: wNumb({
                decimals: 2,  // Show 2 decimal places
                thousand: '.',  // Use '.' as the thousand separator
            })
        });
    
        this._rangeElement = document.getElementById(this._rangeId);
        this._defaultRange = `${this._fromText} ${minPrice} ${this._toText} ${maxPrice} ${this._unitText}`;
        this._rangeElement.innerHTML = this._defaultRange;
    
        this._sliderElement.noUiSlider.on('change', () => {
            this.onSliderValueChange();
        });
    }
    
    getCurrentSliderValues() {
        if (this._sliderElement && this._sliderElement.noUiSlider) {
            const values = this._sliderElement.noUiSlider.get();
            return {
                min: parseFloat(values[0].replace('.', '').replace(',', '.')),
                max: parseFloat(values[1].replace('.', '').replace(',', '.'))
            };
        } else {
            return null;
        }
    }
    
    onSliderValueChange() {
        const sliderValues = this.getCurrentSliderValues();
     
        if (sliderValues) {
            this._rangeElement.innerHTML = `${this._fromText} ${sliderValues.min} ${this._toText} ${sliderValues.max} ${this._unitText}`;
            filter._maxRentalPrice = sliderValues.max;
            filter._minRentalPrice = sliderValues.min;
            updateDisplayedCounties(filter);
            drawCounties();
        }
    }
    
    resetSlider() {
        this._sliderElement.noUiSlider.reset();
        this.onSliderValueChange();
    }
}

