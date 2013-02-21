// JavaScript Document
// This file is for the queries to the SkyScanner API
var selected;
function nextDay(dat) {
	return dat.setDate(dat.getDate() + 1);
	}
function minPrice(layer){
	minStay = document.getElementById("minD").value;
	maxStay = document.getElementById("maxD").value;
	//loadPrices(dest,inDates[0],nextDayinDates[0]
	//alert(selected);
	layer.quotes = new Array();
	var dest = layer.feature.id;
	for(i =0;i<selected.length;i++){
		
		s = selected[i];
		var nDay = new Date(s);
		nextDay(nDay);
		nextDay(nDay); 
		loadPrices(dest,s,nDay,requestID,layer);
	}
}

function getRequest(json,layer){

	for(i =0;i<json.Quotes.length;i++){
	q = json.Quotes[i];
		if(layer.feature.minPrice == null){
			layer.feature.minPrice = q.MinPrice;
			geojson.resetStyle(layer);
		}else if(layer.feature.minPrice>q.MinPrice){
			layer.feature.minPrice = q.MinPrice; //treba apsolutni minimum
			//console.log(json.Quotes[0].MinPrice);
			//console.log(layer.feature.MinPrice);
			geojson.resetStyle(layer);
		}
	}
}

function airPortLocation(code){
var xmlhttp;
			
			if (window.XMLHttpRequest){//code for modern browsers
				xmlhttp=new XMLHttpRequest();
			}else{// code for oldies IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}		
			xmlhttp.requestID = requestID;
			xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				console.log(xmlhttp.responseText);
			}
			
		}
		var my_JSON_object = {};
		var ori = "EDI";
		xmlhttp.open("GET","http://maps.google.com/maps/geo?q="+code+"&output=csv&sensor=false",true);		
		xmlhttp.send();
	
}

function loadPrices(dest,outb,inb,rID,layer){
			//outb = 
			//alert (outb);
			//alert (inb);
			var xmlhttp;
			
			if (window.XMLHttpRequest){//code for modern browsers
				xmlhttp=new XMLHttpRequest();
			}else{// code for oldies IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}		
			//xmlhttp.requestID = requestID;
			xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				my_JSON_object = JSON.parse(xmlhttp.responseText);
				//document.getElementById("myDiv").innerHTML=my_JSON_object.Quotes[0].MinPrice;
				//alert("yee");//console.log(my_JSON_object);
				//	console.
				
				//if(my_JSON_object.Quotes.length != 0)
				//console.log(my_JSON_object);
				//console.log(rID);
				if(requestID == rID){
					getRequest(my_JSON_object,layer)
					console.log(my_JSON_object);
				}
			}
			
		}
		var my_JSON_object = {};
		var ori = "EDI";
		xmlhttp.open("GET","http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/GBP/en-GB/"+ori+"/"+dest+"/"+dateFormat(outb)+"/"+dateFormat(inb)+"?apiKey=edilw015697856897893749376456547",true);		
		xmlhttp.send();
		//return
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
/* URL for "Browse Cache ROUTES Service API"
http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}?apiKey={apiKey}
The query types are:
•	Country to Anywhere (which other countries can be reached from the supplied country)
•	City to Anywhere (which countries can be reached from the supplied city)
•	Airport to Anywhere (which countries can be reached from the supplied airport)
•	Country to Country (which destination airports are available from the origin country)
•	City to Country (which destinations within the country are available from the given city)
•	Airport to Country (which destinations within the country are available from the given airport)
•	Country to City (the reverse)
•	Country to Airport (the reverse)
*/

/* URL for "Browse Cache QUOTES Service API"
http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}?apiKey={apiKey}
The query types are:
•	Country to Anywhere (which other countries can be reached from the supplied country)
•	City to Anywhere (which countries can be reached from the supplied city)
•	Airport to Anywhere (which countries can be reached from the supplied airport)
•	Country to Country (which destination airports are available from the origin country)
•	City to Country (which destinations within the country are available from the given city)
•	Airport to Country (which destinations within the country are available from the given airport)
•	Country to City (the reverse)
•	Country to Airport (the reverse)
•	City to City Anytime (which months have prices in the next year)
•	City to City Month (which days have prices in the specified months)
•	City to City Day (prices for specified days)
•	Airport to Airport Anytime (which months have prices in the next year)
•	Airport to Airport Month (which days have prices in the specified months)
•	Airport to Airport Day (prices for specified days)
*/

/* URL for "Browse GRID Service API"
http://partners.api.skyscanner.net/apiservices/browsegrid/v1.0/{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}?apiKey={apiKey}
The query types are:
Examples of questions that can be answered are:
•	Find me the cheapest prices from Edinburgh to London for all days in January. This gives the cheapest price for each day in January.
•	Find me the cheapest prices from Edinburgh to London departing in January and returning in February. This gives the cheapest prices for combination of all days in January with all days in February.
*/	

/* URL for "Browse Cache DATES Service API"
http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}?apiKey={apiKey}
The query types are:
•	Get the cheapest price from one place to another for each day of a given month
•	Get the cheapest price from one place to another for each month within the next year.
*/