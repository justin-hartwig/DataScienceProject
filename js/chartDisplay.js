import Chart from './classes/chart';

let predictionHousingmarketChart;

export function initializeCharts() {
    predictionHousingmarketChart = new Chart("prediction-housingmarket", "/simulationhousingmarkets", "predictionHousingmarket");
    predictionHousingmarketChart.initializeChart();
}