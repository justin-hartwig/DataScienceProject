export default class County {
  constructor(id, name, federalState, numberOfOffersAnalysed, pricePerSquareMeter) {
    this._id = id;
    this._name = name;
    this._federalState = federalState;
    this._numberOfOffersAnalysed = numberOfOffersAnalysed;
    this._pricePerSquareMeter = pricePerSquareMeter;
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

  get numberOfOffersAnalysed() {
    return this._numberOfOffersAnalysed;
  }

  get pricePerSquareMeter() {
    return this._pricePerSquareMeter;
  }

  get pricePerSquareMeter() {
    return this._pricePerSquareMeter;
  }

  get color() {
    return this._color;
  }

  set color(color) {
    this._color = color;
  }
}