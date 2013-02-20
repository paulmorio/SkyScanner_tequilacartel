// JavaScript Document
// This file is for the queries to the SkyScanner API
var selected;
function nextDay(dat) {
	dat.setDate(dat.getDate() + 1);
	}
function minPrice(layer, dest){
	//minStay = documet.getElementById("minD").text;
	//maxStay = documet.getElementById("maxD").text;
	//loadPrices(dest,inDates[0],nextDayinDates[0]
	//alert(selected);
	loadPrices(dest,selected[0],nextDay(selected[0]));
}


function loadPrices(dest,outb,inb){
			//outb = 
			var xmlhttp;
			if (window.XMLHttpRequest){//code for modern browsers
				xmlhttp=new XMLHttpRequest();
			}else{// code for oldies IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}		
			xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				my_JSON_object = JSON.parse(xmlhttp.responseText);
				//document.getElementById("myDiv").innerHTML=my_JSON_object.Quotes[0].MinPrice;
				//console.log(my_JSON_object);
				//console.
			}
			
		}
		var my_JSON_object = {};
		var ori = "EDI";
		console.log(ori,dest,outb,inb);
		xmlhttp.open("GET","http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/GBP/en-GB/"+ori+"/"+dest+"/"+outb+"/"+inb+"?apiKey=edilw015697856897893749376456547",true);		
		xmlhttp.send();
		return
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