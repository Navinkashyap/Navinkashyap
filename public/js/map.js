


    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [77.209, 28.6139], // Dynamic coordinates
      zoom: 9,
    });
    map.on('load', function () {
      document.getElementById('map-loader').style.display = 'none';
    });
  
