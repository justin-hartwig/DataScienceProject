import Chart from './classes/chart';

let predictionHousingmarketChart;
export let disposableIncomeMean;
export let rentalPricesStatesMedian;
export let correlationAgeAveragePopulationDesity;
let countiesTop10Chart;

export function initializeCharts() {
    predictionHousingmarketChart = new Chart("prediction-housingmarket", "/simulationhousingmarkets", "predictionHousingmarket");
    disposableIncomeMean = new Chart("disposable-income-mean", "/disposableincomesstates", "disposableIncomeMean");
    rentalPricesStatesMedian = new Chart("rental-prices-states-median", "/rentalpricesstates", "rentalPricesStatesMedian");
    correlationAgeAveragePopulationDesity = new Chart("correlation-ageaverage-populationdesity", "/ageaveragepopulationdesities", "correlationAgeAveragePopulationDesity");
    countiesTop10Chart = new Chart("counties-top-10", "/countiestop10s", "countiesTop10Chart");
    predictionHousingmarketChart.initializeChart();
    disposableIncomeMean.initializeChart();
    rentalPricesStatesMedian.initializeChart();
    correlationAgeAveragePopulationDesity.initializeChart();
    countiesTop10Chart.initializeChart();
}