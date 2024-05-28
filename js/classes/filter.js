export default class Filter {
    constructor(rentalPriceFiltered, landPriceFiltered, minRentalPrice, maxRentalPrice, landPriceActiveRange) {
        this._rentalPriceFiltered = rentalPriceFiltered;
        this._landPriceFiltered = landPriceFiltered;
        this._minRentalPrice = minRentalPrice;
        this._maxRentalPrice = maxRentalPrice;
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

    get minRentalPrice() {
        return this._minRentalPrice;
    }

    get maxRentalPrice() {
        return this._maxRentalPrice;
    }

    get landPriceActiveRange() {
        return this._landPriceActiveRange;
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