import County from './classes/county';

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

export function updateDisplayedCounties(maxRentalPrice, minRentalPrice) {
    displayedCounties = allCounties.filter(county => {
        const price = parseFloat(county.pricePerSquareMeter);
        return price >= minRentalPrice && price <= maxRentalPrice;
    });
}