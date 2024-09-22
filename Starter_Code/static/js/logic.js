// Initialize the map with a center and zoom level
let myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 5
  });
  
  // Adding the tile layer for the map background
  let grayscaleMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // (Optional) Adding a satellite map tile layer
  let satelliteMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a>'
  });
  
  // Add base layers for switching between Grayscale and Satellite maps
  let baseMaps = {
    "Grayscale": grayscaleMap,
    "Satellite": satelliteMap
  };
  
  // Adding layer control for switching between map styles
  L.control.layers(baseMaps).addTo(myMap);
  
  // API endpoint for earthquake data
  let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
  
  // Fetching earthquake data from the API
  d3.json(url).then(function(data) {
    let earthquakes = data.features;
  
    // Loop through each earthquake feature
    earthquakes.forEach(function(earthquake) {
      let coordinates = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]];
      let magnitude = earthquake.properties.mag;
      let depth = earthquake.geometry.coordinates[2];
      
      let markerSize = magnitude * 5; // Marker size based on magnitude
      let markerColor = getColor(depth); // Color based on depth
  
      // Create a circle marker for each earthquake
      L.circleMarker(coordinates, {
        fillOpacity: 0.75,
        color: "#000",
        weight: 1,
        fillColor: markerColor,
        radius: markerSize
      }).bindPopup(`<center> <h3>${earthquake.properties.place}</h3> </center>
                    <hr>
                    <p> <b>Magnitude:</b> ${magnitude} &nbsp; <b>Depth:</b> ${depth}</p>
                    <p> <b>Date:</b> ${formatDate(earthquake.properties.time)} </p> 
                    <hr>`)
        .addTo(myMap);
    });
  
    // Create a legend control object
    let legend = L.control({ position: 'bottomright' });
  
    legend.onAdd = function() {
      let div = L.DomUtil.create('div', 'info legend');
      let limits = [-10, 10, 30, 50, 70, 90];
      let colors = ['#1a9850', '#91cf60', '#d9ef8b', '#fee08b', '#fc8d59', '#d73027'];
      let labels = ['Shallow', '', '', '', '', 'Deep'];
  
      // Loop through intervals to create legend labels with colored squares
      for (let i = 0; i < limits.length; i++) {
        div.innerHTML +=
          '<i style="background-color:' + colors[i] + '"></i>' +
          limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + ' ' + labels[i] + '<br>' : '+');
      }
      return div;
    };
  
    legend.addTo(myMap);
  
    // Define the getColor function for determining the marker color based on depth
    function getColor(depth) {
      const limits = [-10, 10, 30, 50, 70, 90];
      const colors = ['#1a9850', '#91cf60', '#d9ef8b', '#fee08b', '#fc8d59', '#d73027'];
  
      for (let i = 0; i < limits.length; i++) {
        if (depth <= limits[i]) return colors[i];
      }
      return colors[colors.length - 1]; // Default to the deepest color
    }
  
    // Date formatting function for a more user-friendly display
    function formatDate(timestamp) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(timestamp).toLocaleDateString(undefined, options);
    }
  });