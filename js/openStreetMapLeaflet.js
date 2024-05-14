import L from 'leaflet';

export function drawMainMap() {
    L.Icon.Default.imagePath = "/dist/images/";

    document.addEventListener('DOMContentLoaded', function () {
        var mainMap = L.map('main-map', {
            zoomSnap: 0.5,
            zoomDelta: 0.5
        }).setView([50.9787, 11.0328], 5.5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(mainMap);

        // Adding GeoJSON
        fetch('/data/geodata/K-2023-AIG-24--AI2401--2024-05-09-EPSG-4326.geojson')
            .then(response => response.json())
            .then(data => {
                L.geoJSON(data, {
                    style: function (feature) {
                        return {
                            color: '#1B76FF',
                            weight: 2
                        };
                    },
                    onEachFeature: function (feature, layer) {
                        if (feature.properties && feature.properties.NAME) {
                            layer.bindPopup(feature.properties.NAME);
                        }
                    }
                }).addTo(mainMap);
            });
    });
}