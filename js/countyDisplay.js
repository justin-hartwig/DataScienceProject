import County from './classes/county';
import Filter from './classes/filter';

let allCounties;
let displayedCounties;

export async function requestCountyData() {
    try {
        // Fetch county data
        const countyResponse = await fetch('/counties');
        const countyData = await countyResponse.json();

        // Fetch rental prices data
        const rentalResponse = await fetch('/rentalprices');
        const rentalData = await rentalResponse.json();

        // Combine data based on id
        const combinedData = countyData.map(county => {
            const rentalInfo = rentalData.find(rental => rental.id === county.id) || {};
            return {
                ...county,
                numberOfOffersAnalysed: rentalInfo.numberofoffersanalysed || 0,
                pricePerSquareMeter: rentalInfo.pricepersquaremeters || 0
            };
        });

        // Create County objects and store them in allCountys
        allCounties = combinedData.map(item => new County(
            item.id,
            item.name,
            item.federalstate,
            item.numberOfOffersAnalysed,
            item.pricePerSquareMeter
        ));
        setAllColors(allCounties);
        displayedCounties = allCounties;
    } catch (error) {
        console.error('Error fetching county data:', error);
    }
}

export function getMaxPricePerSquareMeter() {
    if (!allCounties || allCounties.length === 0) {
        return null;
    }

    const maxPrice = Math.max(...allCounties.map(county => parseFloat(county.pricePerSquareMeter)));
    return Math.ceil(maxPrice);
}

export function getMinPricePerSquareMeter() {
    if (!allCounties || allCounties.length === 0) {
        return null;
    }

    const minPrice = Math.min(...allCounties.map(county => parseFloat(county.pricePerSquareMeter)));
    return Math.floor(minPrice);
}

export function updateDisplayedCounties(filter) {
    displayedCounties = allCounties.filter(county => {
        const price = parseFloat(county.pricePerSquareMeter);
        return price >= filter.minRentalPrice && price <= filter.maxRentalPrice;
    });

    setAllColors(displayedCounties);
}

function colorByPrice(county, counties) {
    const minPrice = Math.min(...counties.map(county => parseFloat(county.pricePerSquareMeter)));
    const maxPrice = Math.max(...counties.map(county => parseFloat(county.pricePerSquareMeter)));

    const normalizedPrice = (county.pricePerSquareMeter - minPrice) / (maxPrice - minPrice);

    // RGB values for the color scale
    const lowColor = [55, 196, 116]; // RGB for #37C474
    const mediumColor = [244, 210, 39]; // RGB for #F4D227
    const highColor = [227, 82, 82]; // RGB for #E35252

    let color;
    if (normalizedPrice < 0.5) {
        // Interpolate between lowColor and mediumColor
        const ratio = normalizedPrice * 2; // normalized to range [0, 1]
        color = lowColor.map((low, index) => {
            const medium = mediumColor[index];
            return Math.round(low + (medium - low) * ratio);
        });
    } else {
        // Interpolate between mediumColor and highColor
        const ratio = (normalizedPrice - 0.5) * 2; // normalized to range [0, 1]
        color = mediumColor.map((medium, index) => {
            const high = highColor[index];
            return Math.round(medium + (high - medium) * ratio);
        });
    }

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

function setAllColors(counties) {
    counties.forEach(county => {
        const color = colorByPrice(county, counties);
        county.color = color;
    });
}

export function getDisplayedCounties() {
    return displayedCounties;
}