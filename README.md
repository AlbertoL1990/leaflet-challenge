# leaflet-challenge
Leaflet Earthquake Visualization
This project is part of the Module 15 Challenge to visualize real-time earthquake data using Leaflet.js. The data is provided by the United States Geological Survey (USGS), and this project displays the data interactively on a map, making it easier to understand earthquake patterns based on magnitude and depth.
Features
Interactive Map: Displays earthquake data with markers based on the earthquake's magnitude and depth.
Color-Coded Depth: Earthquake markers are color-coded to represent the depth of the earthquake, from shallow to deep.
Magnitude-Based Marker Size: Marker sizes are proportional to the magnitude of the earthquake.
Popups with Earthquake Information: Clicking on a marker shows a popup with detailed information about the earthquake:
Location
Magnitude
Depth
Date and Time
Legend: A legend is included on the map to indicate the depth color scale.
Layer Control: Users can switch between different map views (Grayscale and Satellite).
Technologies Used
HTML5: Structure of the web page.
CSS3: Custom styles to enhance the appearance and responsiveness of the map.
JavaScript: Core logic for rendering the map and fetching data.
Leaflet.js: For creating the interactive map and markers.
D3.js: For fetching and processing GeoJSON data from the USGS API.
