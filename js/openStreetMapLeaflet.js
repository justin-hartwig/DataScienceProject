import L from 'leaflet';
import { getDisplayedCounties } from './countyDisplay';
import { filter } from './countyDisplay';
import { formatNumberWithThousandSeparator } from './utilities';

let mainMap;
let countyLayerGroup;
let geojsonLayer;
let initialBounds;
const initialCenter = [50.9787, 11.0328];
const initialZoom = 5.5;

export async function drawMainMap() {
    mainMap = L.map('main-map', {
        zoomSnap: 0.5,
        zoomDelta: 0.5
    }).setView(initialCenter, initialZoom);

    L.Icon.Default.imagePath = "/dist/images/";

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(mainMap);

    // Initialize the layer group and GeoJSON layer here
    countyLayerGroup = L.layerGroup().addTo(mainMap);
    geojsonLayer = L.geoJSON(null, {
        filter: featureFilter,
        style: styleFeature,
        onEachFeature: onEachFeature
    }).addTo(countyLayerGroup);

    await fetchGeoJSONData();

    // Add reset button to the map
    const resetButton = L.control({ position: 'topright' });
    resetButton.onAdd = function () {
        const btn = L.DomUtil.create('button', 'reset-button btn btn-primary btn-small');
        btn.innerHTML = 'Karte zurücksetzten';
        btn.onclick = resetMapView;
        return btn;
    };
    resetButton.addTo(mainMap);
}

function featureFilter(feature) {
    const countyName = feature.properties.gen;
    return getDisplayedCounties().some(county => county._name === countyName);
}

function styleFeature(feature) {
    const countyName = feature.properties.gen;
    const county = getDisplayedCounties().find(county => county._name === countyName);

    let fillColor = '#1B76FF'; // Default fill color
    const defaultBorderColor = 'rgba(255, 255, 255, 0)';
    let borderColor = defaultBorderColor;

    if (county) {
        fillColor = county.color;
        if (county.color !== 'rgba(255, 255, 255, 0)') {
            borderColor = '#FFF';
        }
    }

    return {
        color: borderColor,
        weight: 0.5, // Border weight
        opacity: 1.0, // Border opacity
        fillColor: fillColor,
        fillOpacity: 0.6
    };
}

function onEachFeature(feature, layer) {
    const countyName = feature.properties.gen;
    const county = getDisplayedCounties().find(county => county._name === countyName);

    if (county) {
        let popupContent = `<strong>${county.name}</strong><br>Bundesland: ${county.federalState}<br>`;

        if (filter.rentalPriceFiltered) {
            let priceRating = "";
            let infoIcon = "";
            if(county.anomalieErrorType) {
                infoIcon = `<a href="/#anomalies" title="Wie kommen wir auf diese Einschätzung?"><i class="fa-solid fa-circle-info"></i></a>`;
            }
            if(county.anomalieErrorType == "Correct") {
                priceRating = `<span class="text-highlight">(Fairer Preis)</span>`;
            } else if(county.anomalieErrorType == "Price too high") {
                priceRating = `<span class="text-highlight-red">(Preis zu teuer)</span>`;
            } else if(county.anomalieErrorType == "Price too low") {
                priceRating = `<span class="text-highlight-green">(Günstiger Preis)</span>`;
            }
            popupContent += `Mietpreis: ${formatNumberWithThousandSeparator(county.rentalPricePerSquareMeter)} € pro m² ${priceRating} ${infoIcon}<br>`;
        }

        if (filter.landPriceFiltered) {
            popupContent += `Baulandpreise: ${formatNumberWithThousandSeparator(county.landPricePerSquareMeter)} € pro m²<br>`;
        }

        if (filter.disposableIncomeFiltered) {
            popupContent += `Verfügbares Einkommen: ${formatNumberWithThousandSeparator(county.disposableIncome)} € pro Jahr<br>`;
        }

        if (filter.populationDensityFiltered) {
            popupContent += `Bevölkerungsdichte: ${formatNumberWithThousandSeparator(county.populationDensity)} Einwohner pro km²<br>`;
        }

        if (filter.unemploymentRateFiltered) {
            popupContent += `Arbeitslosenquote: ${formatNumberWithThousandSeparator(county.unemploymentRate)} %<br>`;
        }

        if (filter.leasurePerAreaFiltered) {
            popupContent += `Anteil der Freizeitaktivitäten an Gesamtfläche: ${formatNumberWithThousandSeparator(county.leasurePerArea)} %<br>`;
        }

        layer.bindPopup(popupContent);
    }
}


async function fetchGeoJSONData() {
    try {
        const response = await fetch('/data/geodata/K-2023-AIG-24--AI2401--2024-05-09-EPSG-4326.geojson');
        const data = await response.json();
        geojsonLayer.addData(data);

        // Fit the map to the bounds of the GeoJSON layer
        initialBounds = geojsonLayer.getBounds();
        mainMap.fitBounds(initialBounds);
    } catch (error) {
        console.error('Error loading GeoJSON data:', error);
    }
}

function resetMapView() {
    // Temporarily change the map view
    mainMap.setView([initialCenter[0] + 0.001, initialCenter[1] + 0.001], initialZoom - 1, { animate: false });

    setTimeout(() => {
        // Reset to initial zoom and fit bounds
        mainMap.setView(initialCenter, initialZoom, { animate: true });
        mainMap.fitBounds(initialBounds, { animate: true });

        // Optionally, reset highlighting or other states if needed
    }, 0);
}

export async function updateCounties() {
    try {
        // Clear the existing data
        geojsonLayer.clearLayers();

        // Fetch the new GeoJSON data
        const response = await fetch('/data/geodata/K-2023-AIG-24--AI2401--2024-05-09-EPSG-4326.geojson');
        const data = await response.json();
        
        // Define the new GeoJSON layer with updated filtering and styling
        const updatedGeoJsonLayer = L.geoJSON(data, {
            filter: function (feature) {
                const countyName = feature.properties.gen;
                return getDisplayedCounties().some(county => county._name === countyName);
            },
            style: styleFeature,
            onEachFeature: onEachFeature
        });

        // Add the updated GeoJSON layer to the map
        geojsonLayer.addLayer(updatedGeoJsonLayer);

        // Fit the map to the bounds of the updated GeoJSON layer
        if (geojsonLayer.getLayers().length > 0) {
            initialBounds = geojsonLayer.getBounds();
            mainMap.fitBounds(initialBounds);
        }
    } catch (error) {
        console.error('Error updating GeoJSON data:', error);
    }
}