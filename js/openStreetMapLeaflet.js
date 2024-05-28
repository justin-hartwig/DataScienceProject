import L from 'leaflet';
import { getDisplayedCounties } from './countyDisplay';

let mainMap;
let countyLayerGroup;

export function drawMainMap() {
    mainMap = L.map('main-map', {
        zoomSnap: 0.5,
        zoomDelta: 0.5
    }).setView([50.9787, 11.0328], 5.5);

    L.Icon.Default.imagePath = "/dist/images/";

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
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
                    const isDisplayed = getDisplayedCounties().some(county => county._name === countyName);
                    return isDisplayed;
                },
                style: function (feature) {
                    const countyName = feature.properties.gen;
                    const county = getDisplayedCounties().find(county => county._name === countyName);

                    let fillColor = '#1B76FF'; // Default fill color
                    const defaultBorderColor = 'rgba(255, 255, 255, 0)';
                    let borderColor = defaultBorderColor;

                    if (county) {
                        fillColor = county.color;
                        if(county.color != 'rgba(255, 255, 255, 0)') {
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
