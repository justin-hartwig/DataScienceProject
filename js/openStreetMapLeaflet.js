import L from 'leaflet';

export function drawMap() {
    L.Icon.Default.imagePath = "/dist/images/";

    document.addEventListener('DOMContentLoaded', function() {
        // Coordinates for the geographical center of Germany
        var map = L.map('map').setView([50.9787, 11.0328], 6); // Erfurt coordinates, slightly adjusted for centering

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    });
}
