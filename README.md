Mapinator
=========
An interface for SkyScanner querying with additional functionalities.

Aim: 

1. To create a travel tool which allows users to view a possible list of countries given a price using a map representation.
2. To merge simple user interface with an informative display, that is presented with minimal effort from the user, 
   there should be as little scrolling, and clicking as possible. It should be smart.

Features:

1. The user will be presented a big view of the map while keeping the user interactive elements close at hand and in view at all times. 
   Made to fit most screens in distribution today, and with some limited resizing. 
2. The user will be able to move around on the world map as he/she would in a normal map application, and select countries and zoom in.
3. The table application will allow any user to select a day and it will send a request to the map script which will then send requests
   to the API and asynchronously change the colour of the map according to its price as they arrive in REAL TIME. 
4. The table and map functionality does not end there. Through simple and familiar controls, the user would be able to select several days
   or entire weeks, and similarly de-select any particular day or set of days, the map will naturally update itself accordingly.
5. Once the request has been completed or even when its running the updates the user will be able to hover above any individual country and
   see the price of the cheapest flight to this country.... (This functionality could be exploited to have a list of the different airports 
   prices could be allocated to.)
6. In the form seen above we have a form where the traveller can set the minimum and maximum duration of his or her flight, and the map will
   automatically set the price with the return flight included.
7. With pinpoints and a home icon it will be easy to distinguish the departing airport and potential destinations.
8. I have mentioned that if you hover your mouse over any country you will get the cheapest prices to this location. When a click is performed
   on the country in question the map will zoom in and display the location of the airports via pinpoints, a hover over the pinpoints will then 
   display the cheapest price to this airport.

This ends our presentation and we'd be happy to answer any questions you have.

