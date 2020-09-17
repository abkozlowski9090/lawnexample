import mapboxgl from 'mapbox-gl'


export default class Map {
  constructor(el) {
    let latVal = el.getAttribute("data-lat")
    let lngVal = el.getAttribute("data-lng")
    let mapTitle = el.getAttribute("data-map-title")
    let mapDesc = el.getAttribute("data-map-desc")
    let mapLink = el.getAttribute("data-map-link")

    let geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lngVal, latVal]
        },
        properties: {
          title: mapTitle,
          description: mapDesc
        }
      }]
    };

    mapboxgl.accessToken = 'pk.eyJ1IjoicGVyc29uYXN0dWRpbyIsImEiOiJjamkzOTJqazMwM3FpM3FxcDdkN2t1b2d0In0.gkUuyPifLBlfL7S5tRjtTg';
    const map = new mapboxgl.Map({
     container: el,
     style: 'mapbox://styles/personastudio/cjpwjjv1g05md2rrsjp0jt0dv',
     center: [lngVal, latVal],
     zoom: 14.75
    });

    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl());

    geojson.features.forEach(function(marker) {

      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';

      el.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = mapLink;
      });

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });



  }
}
