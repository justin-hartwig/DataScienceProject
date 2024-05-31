import County from './classes/county';
import Filter from './classes/filter';

let allCounties;
let displayedCounties;
export let filter = new Filter(true, false);

export async function requestCountyData() {
    try {
        // Fetch county data
        const countyResponse = await fetch('/counties');
        const countyData = await countyResponse.json();

        // Fetch rental prices data
        const rentalResponse = await fetch('/rentalprices');
        const rentalData = await rentalResponse.json();

        // Fetch land prices data
        const landResponse = await fetch('/landprices');
        const landData = await landResponse.json();

        // Fetch disposable income data
        const incomeResponse = await fetch('/disposableincomes');
        const incomeData = await incomeResponse.json();

        // Combine data based on id
        const combinedData = countyData.map(county => {
            const rentalInfo = rentalData.find(rental => rental.id === county.id) || {};
            const landInfo = landData.find(land => land.id === county.id) || {};
            const incomeInfo = incomeData.find(income => income.id === county.id) || {};
            return {
                ...county,
                rentalPriceNumberOfOffersAnalysed: rentalInfo.numberofoffersanalysed || 0,
                rentalPricePerSquareMeter: rentalInfo.pricepersquaremeters || 0,
                landPricePerSquareMeter: landInfo.pricepersquaremeters || 0,
                disposableIncome: incomeInfo.disposableincome || 0
            };
        });

        // Create County objects and store them in allCountys
        allCounties = combinedData.map(item => new County(
            item.id,
            item.name,
            item.federalstate,
            item.rentalPriceNumberOfOffersAnalysed,
            item.rentalPricePerSquareMeter,
            item.landPricePerSquareMeter,
            item.disposableIncome
        ));
        setAllColors(allCounties);
        displayedCounties = allCounties;
        filter.initalizeFilter();
    } catch (error) {
        console.error('Error fetching county data:', error);
    }
}


export function getMaxValue(value) {
    if (!allCounties || allCounties.length === 0) {
        return null;
    }

    const maxPrice = Math.max(...allCounties.map(county => parseFloat(county[value])));
    return Math.ceil(maxPrice);
}

export function getMinValue(value) {
    if (!allCounties || allCounties.length === 0) {
        return null;
    }

    const minPrice = Math.min(...allCounties.map(county => parseFloat(county[value])));
    return Math.floor(minPrice);
}

export function updateDisplayedCounties() {
    displayedCounties = allCounties.filter(county => {
        const rentalPrice = parseFloat(county.rentalPricePerSquareMeter);
        const disposableIncome = county.disposableIncome;
        const landPrice = county.landPricePerSquareMeter;
        
        let rentalPriceMatch = true;
        let landPriceMatch = true;
        let disposableIncomeMatch = true;

        if (filter.rentalPriceFiltered) {
            rentalPriceMatch = rentalPrice >= filter.minRentalPrice && rentalPrice <= filter.maxRentalPrice;
        }
        
        if (filter.landPriceFiltered) {
            landPriceMatch = filter.landPriceActiveRange.includes(landPrice);
        }
        
        if (filter.disposableIncomeFiltered) {
            disposableIncomeMatch = disposableIncome >= filter.minDisposableIncome && disposableIncome <= filter.maxDisposableIncome;
        }

        return rentalPriceMatch && landPriceMatch && disposableIncomeMatch;
    });

    setAllColors(displayedCounties);
}

function convertLandPriceToNumber(priceString) {
    const landPriceRanges = {
        "bis unter 50": 0,
        "50 bis unter 100": 0.2,
        "100 bis unter 200": 0.4,
        "200 bis unter 300": 0.6,
        "300 bis unter 500": 0.8,
        "500 und mehr": 1
    };
    return landPriceRanges[priceString] || 0;
}

function colorByCounty(county, counties) {
    let filterNumber = 0;
    let rentalMinPrice, rentalMaxPrice, rentalNormalizedPrice;
    let landNormalizedPrice;
    let disposableIncomeMinPrice, disposableIncomeMaxPrice, disposableIncomeNormalizedPrice;

    if (filter.rentalPriceFiltered) {
        filterNumber++;
        rentalMinPrice = Math.min(...counties.map(county => parseFloat(county.rentalPricePerSquareMeter)));
        rentalMaxPrice = Math.max(...counties.map(county => parseFloat(county.rentalPricePerSquareMeter)));
        rentalNormalizedPrice = (county.rentalPricePerSquareMeter - rentalMinPrice) / (rentalMaxPrice - rentalMinPrice);
    } else {
        rentalNormalizedPrice = 0;
    }

    if (filter.landPriceFiltered) {
        filterNumber++;
        landNormalizedPrice = convertLandPriceToNumber(county.landPricePerSquareMeter);
    } else {
        landNormalizedPrice = 0;
    }

    if (filter.disposableIncomeFiltered) {
        filterNumber++;
        disposableIncomeMinPrice = Math.min(...counties.map(county => county.disposableIncome));
        disposableIncomeMaxPrice = Math.max(...counties.map(county => county.disposableIncome));
        disposableIncomeNormalizedPrice = (county.disposableIncome - disposableIncomeMinPrice) / (disposableIncomeMaxPrice - disposableIncomeMinPrice);
    } else {
        disposableIncomeNormalizedPrice = 0;
    }

    // Combine the normalized values with equal weight
    const combinedNormalizedPrice = (rentalNormalizedPrice + landNormalizedPrice + disposableIncomeNormalizedPrice) / filterNumber;

    // RGB values for the color scale
    const lowColor = [55, 196, 116]; // RGB for #37C474
    const mediumColor = [244, 210, 39]; // RGB for #F4D227
    const highColor = [227, 82, 82]; // RGB for #E35252

    let color;
    if (combinedNormalizedPrice < 0.5) {
        // Interpolate between lowColor and mediumColor
        const ratio = combinedNormalizedPrice * 2; // normalized to range [0, 1]
        color = lowColor.map((low, index) => {
            const medium = mediumColor[index];
            return Math.round(low + (medium - low) * ratio);
        });
    } else {
        // Interpolate between mediumColor and highColor
        const ratio = (combinedNormalizedPrice - 0.5) * 2; // normalized to range [0, 1]
        color = mediumColor.map((medium, index) => {
            const high = highColor[index];
            return Math.round(medium + (high - medium) * ratio);
        });
    }

    if(color[0] && color[1] && color[2]) {
        return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }
    else {
        return `rgba(255, 255, 255, 0)`;
    }
}

function setAllColors(counties) {
    counties.forEach(county => {
        const color = colorByCounty(county, counties);
        county.color = color;
    });
}

export function getDisplayedCounties() {
    return displayedCounties;
}