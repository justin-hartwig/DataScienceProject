export default class Filter {
    constructor(rentalPriceDisplayed, minRentalPrice, maxRentalPrice) {
        this._rentalPriceDisplayed = rentalPriceDisplayed;
        this._minRentalPrice = minRentalPrice;
        this._maxRentalPrice = maxRentalPrice;
    }

    get rentalPriceDisplayed() {
        return this._rentalPriceDisplayed;
    }

    get minRentalPrice() {
        return this._minRentalPrice;
    }

    get maxRentalPrice() {
        return this._maxRentalPrice;
    }
}