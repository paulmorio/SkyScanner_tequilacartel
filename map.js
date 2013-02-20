function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
var geojson;
function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}




    var nyc_elevation;
    var info = L.control();
    var map;
function initialize(){
	//makeTable();
	//loadPrices();

      var position = new L.LatLng(47.723713744687274, 20.3);
      var zoom = 4; 

      // is our Leaflet map object
	map = new L.Map('map').setView(position, zoom)
        , mapboxUrl = 'http://{s}.tiles.mapbox.com/v3/cartodb.map-1nh578vv/{z}/{x}/{y}.png'
        //, mapboxUrl = 'http://tile.stamen.com/toner/{z}/{x}/{y}.jpg'
        , basemap = new L.TileLayer(mapboxUrl, {
          maxZoom: 20, 
          attribution: "CartoDB Tutorials"
          });
      map.addLayer(basemap,true);

      

geojson = L.geoJson(countries_data, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);





info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

//var info;
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = //'<h4>US Population Density</h4>' +  (props ?
        //'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>' :
    ('Hover over a country');
};

info.addTo(map);

 }




function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
info.update();
}
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());

}
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

