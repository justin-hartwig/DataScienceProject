export default class County {
  constructor(id, name, federalState, rentalPriceNumberOfOffersAnalysed, rentalPricePerSquareMeter, landPricePerSquareMeter, disposableIncome, populationDensity, unemploymentRate, leasurePerArea, anomalieErrorType) {
    this._id = id;
    this._name = name;
    this._federalState = federalState;
    this._rentalPriceNumberOfOffersAnalysed = rentalPriceNumberOfOffersAnalysed;
    this._rentalPricePerSquareMeter = rentalPricePerSquareMeter;
    this._landPricePerSquareMeter = landPricePerSquareMeter;
    this._disposableIncome = disposableIncome;
    this._populationDensity = populationDensity;
    this._unemploymentRate = unemploymentRate;
    this._leasurePerArea = leasurePerArea;
    this._anomalieErrorType = anomalieErrorType;
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

  get disposableIncome() {
    return this._disposableIncome;
  }

  get populationDensity() {
    return this._populationDensity;
  }

  get unemploymentRate() {
    return this._unemploymentRate;
  }

  get leasurePerArea() {
    return this._leasurePerArea;
  }

  get anomalieErrorType() {
    return this._anomalieErrorType;
  }

  get color() {
    return this._color;
  }

  set color(color) {
    this._color = color;
  }
}