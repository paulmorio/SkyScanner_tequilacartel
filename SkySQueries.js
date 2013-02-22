// JavaScript Document
// This file is for the queries to the SkyScanner API
var selected;
function nextDay(dat) {
	return dat.setDate(dat.getDate() + 1);
	}
	

function minPrice(){
	
	minStay = parseInt(document.getElementById("minD").value);
	maxStay = parseInt(document.getElementById("maxD").value);

	if (maxStay < minStay) {
	temp = minStay;
	minStay = maxStay;
	maxStay = temp;

	document.getElementById("minD").value = minStay;
	document.getElementById("maxD").value = maxStay;
	}
	
	for(i =0;i<selected.length;i++){
		
		s = selected[i];
		var nDay = new Date(s);
		for(var j = 0; j<minStay;j++){
			
			nextDay(nDay);
		}

		for(var k =minStay;k<=maxStay;k++){
			loadPrices(s,nDay,requestID);
			nextDay(nDay);
		}
	}
}


//answer from anywhere request
function getRequest(json,rID){
	//console.log(json);
	if(json.Quotes == null){
		return;
	}
	var idToCity = new Object();
	
	for(i =0;i<json.Places.length;i++){
		var p = json.Places[i];
		idToCity[p.PlaceId] = p.Name;
		//console.log(idToCountry[p.PlaceId]);
	}
	
	for(i =0;i<json.Quotes.length;i++){
		q = json.Quotes[i];
		var city = idToCity[q.OutboundLeg.DestinationId];
		var start = idToCity[q.OutboundLeg.OriginId];
		city = city.split('/')[0];
		//cityPriceId = Math.ceil(q.MinPrice / 10);

		//if(citiesByPrices[city] == null)
			

		
		
		
		
		if(cityCoordinates[city] == null){
			coords(city,rID);
			
		}
		//console.log(cityPriceId, citiesByPrices[cityPriceId]);
		if(minCity[city] == null){
			minCity[city] = q.MinPrice;
			citiesByPrices[city] = new Object()
				
				citiesByPrices[city].destination = city;
				citiesByPrices[city].origin = start;
				citiesByPrices[city].minPrice = q.MinPrice;
				citiesByPrices[city].departure = q.OutboundLeg.DepartureDate;
				citiesByPrices[city].arrival = q.InboundLeg.DepartureDate;
				//console.log(citiesByPrices[city].destination);
			
			}else if(minCity[city]>q.MinPrice){
				minCity[city] = q.MinPrice;
		
				citiesByPrices[city].destination = city;
				citiesByPrices[city].origin = start;
				citiesByPrices[city].minPrice = q.MinPrice;
				citiesByPrices[city].departure = q.OutboundLeg.DepartureDate;
				citiesByPrices[city].arrival = q.InboundLeg.DepartureDate;
				//console.log(citiesByPrices[city].destination);
			}
			
			
			
		if(cCodes[city]== null){
			getCities(city);
			}else{
			addCountry(city,cCodes[city]);
			//console.log("reuse");
			}
		//console.log(city);
		//console.log(minCity[city]);
		
	}
	chSlide();
}
var minCountry;

var cCodes;
function addCountry(city,cCode)
{

cCodes[city] = cCode;

	if(minCountry[cCode] == null){
			minCountry[cCode] = minCity[city];
			
			}else if(minCountry[cCode]>minCity[city]){
				minCountry[cCode] = minCity[city];
			}
	updat(cCode);
	
}




//////requests functions
function getCities(to){

var xmlhttp;
			
		
			if (window.XMLHttpRequest){//code for modern browsers
				xmlhttp=new XMLHttpRequest();
			}else{// code for oldies IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}		
			//alert("evaluation");
			xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){//xmlhttp.readyState==4 &&
				
				var x = eval(xmlhttp.responseText);
				
				
				if(x.length > 0){
					addCountry(to,x[0].ci);
				}
				else{
					console.log(to);//dont remove
				}
				//my_JSON_object = JSON.parse(xmlhttp.responseText);
				
			}
			
		}
		var my_JSON_object = {};
		xmlhttp.open("GET","http://api.skyscanner.net/as.ashx?&t="+to+"&l=en&d=1&c=GBP",true);		
		xmlhttp.send();
	
}

///drop change
function dropOrigin(city){
	var circle = L.circle([51.508, -0.11], 500, {
					    color: 'red',
					    fillColor: '#f03',
					    fillOpacity: 0.5
					}).addTo(map);
}



function chOri(){
		var xmlhttp;
		
		
			if (window.XMLHttpRequest){//code for modern browsers
				xmlhttp=new XMLHttpRequest();
			}else{// code for oldies IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}		
			xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){//xmlhttp.readyState==4 &&
			
				var x = eval(xmlhttp.responseText);
				//console.log(x);
				if(x!=null){
					ori = x[0].i;
					coords(x[0].en,-9999);
					
					change();
				}
				
			}
			
		}
		var my_JSON_object = {};
		city = document.getElementById("origin").value;
		//console.log("http://api.skyscanner.net/as.ashx?&t="+city+"&l=en&d=1&c=GBP");
		xmlhttp.open("GET","http://api.skyscanner.net/as.ashx?&t="+city+"&l=en&d=1&c=GBP",true);		
		xmlhttp.send();
		
		
	
}

http://api.skyscanner.net/as.ashx?&t=un&l=en&d=1&c=GBP&callback=skyscanner.loader.callbacks.requestid1
var ori = "EDI";
function loadPrices(outb,inb,rID){
			var xmlhttp;
			//console.log("sendR");
			if (window.XMLHttpRequest){//code for modern browsers
				xmlhttp=new XMLHttpRequest();
			}else{
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}		
			xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				my_JSON_object = JSON.parse(xmlhttp.responseText);
				if(requestID == rID){
					getRequest(my_JSON_object,rID)
					//console.log(my_JSON_object);
				}
			}
			
		}
		var my_JSON_object = {};

		xmlhttp.open("GET","http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/GBP/en-GB/"+ori+"/anywhere/"+dateFormat(outb)+"/"+dateFormat(inb)+"?apiKey=edilw015697856897893749376456547",true);		
		xmlhttp.send();
}






function dateFormat(x) {

	if (x.getMonth()%10 == x.getMonth()) {
		var month = "0" + (x.getMonth() + 1);
	} else {
		var month = x.getMonth() + 1;
	}

	if (x.getDate()%10 == x.getDate()) {
		var date = "0" + x.getDate();
	} else {
		var date = x.getDate();
	}

	return x.getFullYear() + "-" + month + "-" + date;


	}
	
	
	
	
function coords(name,rID){
		var xmlhttp;
			
			if (window.XMLHttpRequest){//code for modern browsers
				xmlhttp=new XMLHttpRequest();
			}else{// code for oldies IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}		
			xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
			
			//my_JSON_object = JSON.parse(xmlhttp.responseText);
			//console.log(xmlhttp.responseText);
			coo = eval('['+xmlhttp.responseText+']');
			if(coo[0] == 620){
				//coords(name,rID);
				//console.log('rereq');
				return;
			}
			coo = coo.slice(2,4)
				cityCoordinates[name] = coo;
				//console.log(name, coo, xmlhttp.responseText)
				if(requestID == rID){
					chSlide();
					
					//update pin
					
				}else if(rID = -9999){

					if(ori){
						changeOrigin(coo.slice(0));
					}
				}
				
			}
			
		}
		var my_JSON_object = {};
		xmlhttp.open("GET","http://maps.google.com/maps/geo?q="+name+"&output=csv&sensor=false",true);		
		//xmlhttp.open("GET","http://maps.googleapis.com/maps/api/geocode/json?address="+name+"&sensor=true");
		xmlhttp.send();
	
}