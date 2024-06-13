import Chart from './classes/chart';

let predictionHousingmarketChart;
export let disposableIncomeMean;

export function initializeCharts() {
    predictionHousingmarketChart = new Chart("prediction-housingmarket", "/simulationhousingmarkets", "predictionHousingmarket");
    disposableIncomeMean = new Chart("disposable-income-mean", "/simulationhousingmarkets", "disposableIncomeMean");
    predictionHousingmarketChart.initializeChart();
    disposableIncomeMean.initializeChart();
}