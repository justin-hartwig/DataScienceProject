import L from 'leaflet';
import { displayedCounties } from './countyDisplay';

let mainMap;
let countyLayerGroup;

export function drawMainMap() {
    mainMap = L.map('main-map', {
        zoomSnap: 0.5,
        zoomDelta: 0.5
    }).setView([50.9787, 11.0328], 5.5);

    L.Icon.Default.imagePath = "/dist/images/";

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mainMap);

    // Initialize the layer group here
    countyLayerGroup = L.layerGroup().addTo(mainMap);

    drawCounties();
}

export function drawCounties() {
    // Clear existing layers in the layer group
    countyLayerGroup.clearLayers();

    fetch('/data/geodata/K-2023-AIG-24--AI2401--2024-05-09-EPSG-4326.geojson')
        .then(response => response.json())
        .then(data => {
            const geoJsonLayer = L.geoJSON(data, {
                filter: function (feature) {
                    const countyName = feature.properties.gen;
                    const isDisplayed = displayedCounties.some(county => county._name === countyName);
                    return isDisplayed;
                },
                style: function (feature) {
                    const countyName = feature.properties.gen;
                    const county = displayedCounties.find(county => county._name === countyName);

                    let fillColor = '#1B76FF'; // Default fill color
                    if (county) {
                        fillColor = county.color; // Use the pre-set color for fill
                    }

                    return {
                        color: '#1B76FF',
                        weight: 2,
                        opacity: 1.0, // Border opacity remains constant
                        fillColor: fillColor, // Set the calculated fill color
                        fillOpacity: 0.5 // Full opacity for fill color
                    };
                },
                onEachFeature: function (feature, layer) {
                    if (feature.properties && feature.properties.gen) {
                        layer.bindPopup(feature.properties.gen);
                    }
                }
            });

            // Add the filtered GeoJSON layer to the layer group
            countyLayerGroup.addLayer(geoJsonLayer);
        })
        .catch(error => {
            console.error('Error loading GeoJSON data:', error);
        });
}
