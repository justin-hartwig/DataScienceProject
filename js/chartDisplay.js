import Chart from './classes/chart';

let predictionHousingmarketChart;
export let disposableIncomeMean;
export let rentalPricesStatesMedian;

export function initializeCharts() {
    predictionHousingmarketChart = new Chart("prediction-housingmarket", "/simulationhousingmarkets", "predictionHousingmarket");
    disposableIncomeMean = new Chart("disposable-income-mean", "/disposableincomesstates", "disposableIncomeMean");
    rentalPricesStatesMedian = new Chart("rental-prices-states-median", "/rentalpricesstates", "rentalPricesStatesMedian");
    predictionHousingmarketChart.initializeChart();
    disposableIncomeMean.initializeChart();
    rentalPricesStatesMedian.initializeChart();
}