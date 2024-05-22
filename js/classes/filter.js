export default class Filter {
    constructor(minRentalPrice, maxRentalPrice) {
        this._minRentalPrice = minRentalPrice;
        this._maxRentalPrice = maxRentalPrice;
    }

    get minRentalPrice() {
        return this._minRentalPrice;
    }

    get maxRentalPrice() {
        return this._maxRentalPrice;
    }
}