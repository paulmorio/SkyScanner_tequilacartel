// JavaScript Document
// This file is for the queries to the SkyScanner API
var selected;
function nextDay(dat) {
	return dat.setDate(dat.getDate() + 1);
	}
	

function minPrice(){
	
	minStay = parseInt(document.getElementById("minD").value);
	maxStay = parseInt(document.getElementById("maxD").value);
	
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

function getRequest(json){

	if(json.Quotes == null){
		return;
	}
	var idToCountry = new Object();
	
	for(i =0;i<json.Places.length;i++){
		var p = json.Places[i];
		idToCountry[p.PlaceId] = p.Name;
		//console.log(idToCountry[p.PlaceId]);
	}
	
	for(i =0;i<json.Quotes.length;i++){
		q = json.Quotes[i];
		to = idToCountry[q.OutboundLeg.DestinationId];
		//alert("works");
		getCountry(to);
		if(countryPrices[to] == null){
			countryPrices[to] = q.MinPrice;
			
			}else if(countryPrices[to]>q.MinPrice){
				countryPrices[to] = q.MinPrice
			}
		//console.log(to);
		//console.log(countryPrices[to]);
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
				//console.log(xmlhttp.responseText);
			}
			
		}
		var my_JSON_object = {};
		var ori = "EDI";
		xmlhttp.open("GET","http://maps.google.com/maps/geo?q="+code+"&output=csv&sensor=false",true);		
		xmlhttp.send();
	
}

function getCountry(city){
var xmlhttp;
			
			if (window.XMLHttpRequest){//code for modern browsers
				xmlhttp=new XMLHttpRequest();
			}else{// code for oldies IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}		
			xmlhttp.requestID = requestID;
			xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				y_JSON_object = JSON.parse(xmlhttp.responseText);
				console.log(y_JSON_object);
			}
			
		}
		var my_JSON_object = {};
		var ori = "EDI";
		xmlhttp.open("GET","http://api.skyscanner.net/as.ashx?&t="+city+"&l=en&d=1&c=GBP&callback=skyscanner.loader.callbacks.requestid1",true);		
		xmlhttp.send();
	
}

http://api.skyscanner.net/as.ashx?&t=un&l=en&d=1&c=GBP&callback=skyscanner.loader.callbacks.requestid1

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
					getRequest(my_JSON_object)
					//console.log(my_JSON_object);
				}
			}
			
		}
		var my_JSON_object = {};
		var ori = "EDI";
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