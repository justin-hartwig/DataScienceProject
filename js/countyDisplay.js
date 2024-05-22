import County from './classes/county';
import Filter from './classes/filter';

export let allCounties;
export let displayedCounties;

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
        resetDisplayedCounties();
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

export function resetDisplayedCounties() {
    displayedCounties = allCounties;
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
    const startColor = [255, 255, 255]; // RGB for #FFFFFF
    const endColor = [27, 118, 255]; // RGB for #1B76FF

    const color = startColor.map((start, index) => {
        const end = endColor[index];
        return Math.round(start + (end - start) * normalizedPrice);
    });

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

function setAllColors(counties) {
    counties.forEach(county => {
        const color = colorByPrice(county, counties);
        county.color = color;
    });
}