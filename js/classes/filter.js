import { getMaxValue, getMinValue } from '../countyDisplay';

export default class Filter {
    constructor(rentalPriceFiltered, landPriceFiltered, disposableIncomeFiltered, populationDensityFiltered, unemploymentRateFiltered) {
        this._rentalPriceFiltered = rentalPriceFiltered;
        this._landPriceFiltered = landPriceFiltered;
        this._disposableIncomeFiltered = disposableIncomeFiltered;
        this._populationDensityFiltered = populationDensityFiltered;
        this._unemploymentRateFiltered = unemploymentRateFiltered;
        this._minRentalPrice;
        this._maxRentalPrice;
        this._minDisposableIncome;
        this._maxDisposableIncome;
        this._landPriceDefaultRange = ["bis unter 50",
            "50 bis unter 100",
            "100 bis unter 200",
            "200 bis unter 300",
            "300 bis unter 500",
            "500 und mehr"]
        this._populationDensityDefaultRange = [66,
            10584.75,
            21103.5,
            31622.25,
            42141]
        this._unemploymentRateDefaultRange = [1.7,
            4.8,
            7.9,
            11.0,
            14.1]
        this._landPriceActiveRange = this._landPriceDefaultRange;
        this._populationDensityActiveRange = this._populationDensityDefaultRange;
        this._unemploymentRateActiveRange = this._unemploymentRateDefaultRange;
    }

    get rentalPriceFiltered() {
        return this._rentalPriceFiltered;
    }

    set rentalPriceFiltered(rentalPriceFiltered) {
        this._rentalPriceFiltered = rentalPriceFiltered;
    }

    get landPriceFiltered() {
        return this._landPriceFiltered;
    }

    set landPriceFiltered(landPriceFiltered) {
        this._landPriceFiltered = landPriceFiltered;
    }

    get disposableIncomeFiltered() {
        return this._disposableIncomeFiltered;
    }

    set disposableIncomeFiltered(disposableIncomeFiltered) {
        this._disposableIncomeFiltered = disposableIncomeFiltered;
    }

    get populationDensityFiltered() {
        return this._populationDensityFiltered;
    }

    set populationDensityFiltered(populationDensityFiltered) {
        this._populationDensityFiltered = populationDensityFiltered;
    }

    get unemploymentRateFiltered() {
        return this._unemploymentRateFiltered;
    }

    set unemploymentRateFiltered(unemploymentRateFiltered) {
        this._unemploymentRateFiltered = unemploymentRateFiltered;
    }

    get minRentalPrice() {
        return this._minRentalPrice;
    }

    get maxRentalPrice() {
        return this._maxRentalPrice;
    }

    get minDisposableIncome() {
        return this._minDisposableIncome;
    }

    get maxDisposableIncome() {
        return this._maxDisposableIncome;
    }

    get landPriceActiveRange() {
        return this._landPriceActiveRange;
    }

    get populationDensityActiveRange() {
        return this._populationDensityActiveRange;
    }

    get unemploymentRateActiveRange() {
        return this._unemploymentRateActiveRange;
    }

    initalizeFilter() {
        // Slider
        this._maxRentalPrice = parseFloat(getMaxValue("rentalPricePerSquareMeter"));
        this._minRentalPrice = parseFloat(getMinValue("rentalPricePerSquareMeter"));
        this._maxDisposableIncome = getMaxValue("disposableIncome");
        this._minDisposableIncome = getMinValue("disposableIncome");
    }

    addRange(range, item) {
        range.push(item);
    }

    removeRange(range, item) {
        const index = range.indexOf(item);
        if (index !== -1) {
            range.splice(index, 1);
        }
    }

    resetRange(defaultRange, range) {
        range = defaultRange;
    }
}