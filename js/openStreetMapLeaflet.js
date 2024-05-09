import L from 'leaflet';

export function drawMap() {
    L.Icon.Default.imagePath = "/dist/images/";

    document.addEventListener('DOMContentLoaded', function() {
        var map = L.map('map').setView([50.9787, 11.0328], 6); // Centered on Erfurt

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Assuming the GeoJSON data is stored locally in the `data/` directory
        fetch('/data/geodata/K-2023-AIG-24--AI2401--2024-05-09-EPSG-4326.geojson')
            .then(response => response.json())
            .then(data => {
                L.geoJSON(data, {
                    style: function (feature) {
                        return {color: '#ff0000'}; // Style each county with red lines
                    },
                    onEachFeature: function (feature, layer) {
                        if (feature.properties && feature.properties.NAME) {
                            layer.bindPopup(feature.properties.NAME);
                        }
                    }
                }).addTo(map);
            });
    });
}