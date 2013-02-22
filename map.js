function getColor(d) {
	if (d == null)
		return 'white';
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
        fillColor: getColor(minCountry[feature.id]),//feature.properties.minPrice),//minPrice(feature.id)),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
var requestID = 0;
function change(){
requestID++;
minCity = new Object();
	minCountry = new Object();
	citiesByPrices = new Object();
			geojson.eachLayer(function (layer) {
			layer.feature.properties.minPrice = null;
			geojson.resetStyle(layer);
	});


	
	minPrice();
		
}
var oriCirc;


function changeOrigin(coors){

	if(oriCirc != null){
	//console.log(coors);
		oriCirc.setLatLng(coors);
	}else{
		var greenIcon = L.icon({
		    iconUrl: 'homeIconSmall.png',
		    //shadowUrl: 'leaf-shadow.png',

		    iconSize:     [40, 51], // size of the icon
		    //shadowSize:   [50, 64], // size of the shadow
		    iconAnchor:   [20, 50], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [4, 62],  // the same for the shadow
		    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});
		oriCirc = L.marker(coors, {icon: greenIcon});
		
		//console.log(oriCirc);
		oriCirc.addTo(map);
	}
}
var popup = L.popup();
function onMarkClick(e){



var city =e.target.city;
e.target.bindPopup("<b>"+ city +"</b><br>"+ citiesByPrices[city].minPrice.toFixed(2) + " GBP" + "<br>Dep: " + citiesByPrices[city].departure.split("T")[0]+ "<br>Arr: " + citiesByPrices[city].arrival.split("T")[0]).openPopup();

}

var group;
function chSlide(){
	//console.log();
	var budget = document.getElementById("budget").value;
	 group.clearLayers();
	group = L.layerGroup();
	
	for(x in citiesByPrices){
		//console.log(x,cityCoordinates[x]);
		if(cityCoordinates[x] != null && citiesByPrices[x].minPrice<=budget){
			ll =L.marker(cityCoordinates[x],{icon: arrow});
			ll.city = x;
			group.addLayer(ll);
			ll.on('click', onMarkClick);
		}
	}
	group.addTo(map);
	/*
	for(i =0; i<maxH;i++){
	
		var cities = citiesByPrices[i];
		
		//console.log(citiesByPrices,i);
		if(cities == null || cities.length == 0){
			continue;
		}
			
		//for(i = 0;i<cities.length;i++){
			if(cityCoordinates[cities[0].destination] != null){
				L.marker(cityCoordinates[cities[0].destination],{icon: arrow}).addTo(map);
			}
		//}
		//console.log(cities[0].destination, cityCoordinates[cities[0].destination]);
		//L.marker(cityCoordinates[cities[0].destination],{icon: arrow}).addTo(map);
	}*/
}

function updat(cCode){
	layer = layerHash[cCode];
if(layer == null){
	console.log("null",cCode);
	return;
}

			layer.feature.properties.minPrice = null;
				layer.feature.properties.minPrice = minCountry[layer.feature.id];
			geojson.resetStyle(layer);

}





    var nyc_elevation;
    var info = L.control();
    var map;
    
    var minCity;
    var layerHash;
    var citiesByPrices;
    var cityCoordinates;
    var arrow;
function initialize(){
	//makeTable();
	//loadPrices();
	group = L.layerGroup();
	
	arrow = L.icon({
		    iconUrl: 'arrow.png',
		    //shadowUrl: 'leaf-shadow.png',

		    iconSize:     [40, 32], // size of the icon
		    //shadowSize:   [50, 64], // size of the shadow
		    iconAnchor:   [20, 31], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [4, 62],  // the same for the shadow
		    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
		});
		
	minCity = new Object();
	minCountry = new Object();
	cCodes = new Object();
	layerHash = new Object();
	citiesByPrices = new Object();
	cityCoordinates = new Object();
selected = new Array();
      var position = new L.LatLng(47.723713744687274, 20.3);
      var zoom = 3; 

      // is our Leaflet map object
	map = new L.Map('map').setView(position, zoom)
        , mapboxUrl = 'http://{s}.tiles.mapbox.com/v3/cartodb.map-1nh578vv/{z}/{x}/{y}.png'
        //, mapboxUrl = 'http://tile.stamen.com/toner/{z}/{x}/{y}.jpg'
        , basemap = new L.TileLayer(mapboxUrl, {
          maxZoom: 20, 
          attribution: "TequilaCartel"
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
        : 'Hover over a country') + (props ==null || props.minPrice == null ? "" : '<br />From: '+props.minPrice.toFixed(0)+' GBP');
        
        
};

info.addTo(map);


geojson.eachLayer(function (layer) {
			layerHash[layer.feature.id] = layer;
    	
	});


	

 
 	chOri();
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
	div.innerHTML+="Price (GBP):<br>";
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};



