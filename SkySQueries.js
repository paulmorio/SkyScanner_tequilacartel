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
		//getCountry(to);
		if(countryPrices[to] == null){
			countryPrices[to] = q.MinPrice;
			
			}else if(countryPrices[to]>q.MinPrice){
				countryPrices[to] = q.MinPrice;
			}
		getCountry(to);
		console.log(to);
		console.log(countryPrices[to]);
	}
}
var minCountry;

function addCountry(city,cCode)
{
	if(minCountry[cCode] == null){
			minCountry[cCode] = countryPrices[city];
			
			}else if(minCountry[cCode]>countryPrices[city]){
				minCountry[cCode] = countryPrices[city];
			}
	updat();
	
}

function getCountry(to){
var xmlhttp;
			
		//console.log("getting");
			if (window.XMLHttpRequest){//code for modern browsers
				xmlhttp=new XMLHttpRequest();
			}else{// code for oldies IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}		
			xmlhttp.requestID = requestID;
			xmlhttp.onreadystatechange=function(){
			//console.log(xmlhttp.readyState);
			if(xmlhttp.readyState==4 && xmlhttp.status==200){//xmlhttp.readyState==4 &&
				
				var x = eval(xmlhttp.responseText);
				addCountry(to,x[0].ci);
				//my_JSON_object = JSON.parse(xmlhttp.responseText);
				
			}
			
		}
		var my_JSON_object = {};
		xmlhttp.open("GET","http://api.skyscanner.net/as.ashx?&t="+to+"&l=en&d=1&c=GBP",true);		
		xmlhttp.send();
	
}

function chOri(){
		var xmlhttp;
			
		//console.log("getOri");
		
			if (window.XMLHttpRequest){//code for modern browsers
				xmlhttp=new XMLHttpRequest();
			}else{// code for oldies IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}		
			xmlhttp.requestID = requestID;
			xmlhttp.onreadystatechange=function(){
			//console.log(xmlhttp.readyState);
			if(xmlhttp.readyState==4 && xmlhttp.status==200){//xmlhttp.readyState==4 &&
				
				var x = eval(xmlhttp.responseText);
				
				//my_JSON_object = JSON.parse(xmlhttp.responseText);
				ori = x[0].i;
				//console.log("origin");
				console.log(x);
				change();
			}
			
		}
		var my_JSON_object = {};
		city = document.getElementById("origin").value;
		console.log("http://api.skyscanner.net/as.ashx?&t="+city+"&l=en&d=1&c=GBP");
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
					getRequest(my_JSON_object)
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
	
	
	
	
function airportLocation(code){
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
		xmlhttp.open("GET","http://maps.google.com/maps/geo?q="+code+"&output=csv&sensor=false",true);		
		xmlhttp.send();
	
}