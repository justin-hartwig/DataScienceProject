import { getMaxValue, getMinValue } from '../countyDisplay';

export default class Filter {
    constructor(rentalPriceFiltered, landPriceFiltered, disposableIncomeFiltered) {
        this._rentalPriceFiltered = rentalPriceFiltered;
        this._landPriceFiltered = landPriceFiltered;
        this._disposableIncomeFiltered = disposableIncomeFiltered;
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
        this._landPriceActiveRange = this._landPriceDefaultRange;
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

    initalizeFilter() {
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