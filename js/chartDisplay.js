import Chart from './classes/chart';

let predictionHousingmarketChart;
export let disposableIncomeMean;
export let rentalPricesStatesMedian;
export let correlationAgeAveragePopulationDesity;
export let bavariaIncomePrognoses;
let countyRentalPriceImpact;
let countiesTop10Chart;

export function initializeCharts() {
    predictionHousingmarketChart = new Chart("prediction-housingmarket", "/simulationhousingmarkets", "predictionHousingmarket");
    disposableIncomeMean = new Chart("disposable-income-mean", "/disposableincomesstates", "disposableIncomeMean");
    rentalPricesStatesMedian = new Chart("rental-prices-states-median", "/rentalpricesstates", "rentalPricesStatesMedian");
    correlationAgeAveragePopulationDesity = new Chart("correlation-ageaverage-populationdesity", "/ageaveragepopulationdesities", "correlationAgeAveragePopulationDesity");
    bavariaIncomePrognoses = new Chart("bavaria-income-prognoses", "/bavariaincomeprognoses", "bavariaIncomePrognoses");
    countyRentalPriceImpact = new Chart("county-rental-price-impact", "/countyrentalpriceimpacts", "countyRentalPriceImpact");
    countiesTop10Chart = new Chart("counties-top-10", "/countiestop10s", "countiesTop10Chart");
    predictionHousingmarketChart.initializeChart();
    disposableIncomeMean.initializeChart();
    rentalPricesStatesMedian.initializeChart();
    correlationAgeAveragePopulationDesity.initializeChart();
    bavariaIncomePrognoses.initializeChart();
    countyRentalPriceImpact.initializeChart();
    countiesTop10Chart.initializeChart();
}