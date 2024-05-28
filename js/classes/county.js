export default class County {
  constructor(id, name, federalState, rentalPriceNumberOfOffersAnalysed, rentalPricePerSquareMeter, landPricePerSquareMeter) {
    this._id = id;
    this._name = name;
    this._federalState = federalState;
    this._rentalPriceNumberOfOffersAnalysed = rentalPriceNumberOfOffersAnalysed;
    this._rentalPricePerSquareMeter = rentalPricePerSquareMeter;
    this._landPricePerSquareMeter = landPricePerSquareMeter;
    this._color = "#1B76FF"; // default color
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get federalState() {
    return this._federalState;
  }

  get rentalPriceNumberOfOffersAnalysed() {
    return this._rentalPriceNumberOfOffersAnalysed;
  }

  get rentalPricePerSquareMeter() {
    return this._rentalPricePerSquareMeter;
  }

  get landPricePerSquareMeter() {
    return this._landPricePerSquareMeter;
  }

  get color() {
    return this._color;
  }

  set color(color) {
    this._color = color;
  }
}