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
var tst = 10000;
function style(feature) {
    return {
        fillColor: getColor(tst),//minPrice(feature.id)),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function change(){
	//for(x in selected){
		tst = 100;
		geojson.eachLayer(function (layer) {
			
    	
});
//onEachFeature: function (feature, layer) {
  //      resetHighlight(feature);
    //}
		//resetHighlight();
	//}
}
function minPrice(dest){
//for(x in geojson.layers())
	//console.log(geojson.style);
	//console.log(countries_data);
	return 100;

}

function answer(layer){
	geojson.resetStyle(layer);
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
	legend.addTo(map);
      

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
    this._div.innerHTML = '<h4>Go to:</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' 
        : 'Hover over a country');
        
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


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};



