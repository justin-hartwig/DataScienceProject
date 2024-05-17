export default class County {
    constructor(id, name, federalState, numberOfOffersAnalysed, pricePerSquareMeter) {
      this._id = id;
      this._name = name;
      this._federalState = federalState;
      this._numberOfOffersAnalysed = numberOfOffersAnalysed;
      this._pricePerSquareMeter = pricePerSquareMeter;
    }
  
    // Getter for id
    get id() {
      return this._id;
    }
  
    // Getter for name
    get name() {
      return this._name;
    }
  
    // Getter for federalState
    get federalState() {
      return this._federalState;
    }
  
    // Getter for numberOfOffersAnalysed
    get numberOfOffersAnalysed() {
      return this._numberOfOffersAnalysed;
    }
  
    // Getter for pricePerSquareMeter
    get pricePerSquareMeter() {
      return this._pricePerSquareMeter;
    }
  }