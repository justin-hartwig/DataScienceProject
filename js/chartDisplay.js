import Chart from './classes/chart';

let predictionHousingmarketChart;
export let disposableIncomeMean;
export let rentalPricesStatesMedian;
export let correlationAgeAveragePopulationDesity;
export let bavariaIncomePrognoses;
let countyRentalPriceImpact;
let countiesTop10Chart;
let anomaliesCountiesChart;

export function initializeCharts() {
    predictionHousingmarketChart = new Chart("prediction-housingmarket", "/api/simulationhousingmarkets", "predictionHousingmarket");
    disposableIncomeMean = new Chart("disposable-income-mean", "/api/disposableincomesstates", "disposableIncomeMean");
    rentalPricesStatesMedian = new Chart("rental-prices-states-median", "/api/rentalpricesstates", "rentalPricesStatesMedian");
    correlationAgeAveragePopulationDesity = new Chart("correlation-ageaverage-populationdesity", "/api/ageaveragepopulationdesities", "correlationAgeAveragePopulationDesity");
    bavariaIncomePrognoses = new Chart("bavaria-income-prognoses", "/api/bavariaincomeprognoses", "bavariaIncomePrognoses");
    countyRentalPriceImpact = new Chart("county-rental-price-impact", "/api/countyrentalpriceimpacts", "countyRentalPriceImpact");
    countiesTop10Chart = new Chart("counties-top-10", "/api/countiestop10s", "countiesTop10Chart");
    anomaliesCountiesChart = new Chart("anomalies-counties", "/api/anomaliescounties", "displayAnomaliesCounties");
    predictionHousingmarketChart.initializeChart();
    disposableIncomeMean.initializeChart();
    rentalPricesStatesMedian.initializeChart();
    correlationAgeAveragePopulationDesity.initializeChart();
    bavariaIncomePrognoses.initializeChart();
    countyRentalPriceImpact.initializeChart();
    countiesTop10Chart.initializeChart();
    anomaliesCountiesChart.initializeChart();
}