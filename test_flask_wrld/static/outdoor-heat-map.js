var socket = io.connect('http://localhost:1891');
var berkeleyCoords = [37.871016, -122.250791];
// Average X: 37.870638838010784
// x + 0.001
// Average Y: -122.25150035532451
// y + 0.001
var map = L.Wrld.map("map", "90de4007cdd170854398f362eb1c834b", {
	center: berkeleyCoords,
	zoom: 16
});

var heat = L.heatLayer([]).addTo(map);

socket.on('update', function(data) {
  console.log("Inside update");
  var objectArray = data['locations'];
  objectArray.forEach(function(object) {
    // var marker = L.marker(object, { title: "idk" }).addTo(map);
    // console.log(object);
  })
  // var locArray = []
  // for (var i = 0; i < objectArray.length; i++) {
  //   locArray.push(L.latLng(objectArray[i]));
  // };
  // console.log(locArray);
  // heat = L.heatLayer(locArray, {radius: 5, minOpacity: 0.2}).addTo(map);
  heat.setLatLngs(objectArray);
}, map, heat);

// var marker = L.marker([37.87069872141118,-122.25155975210632], { title: "WE HERE"}).addTo(map);
//-0.0005, -0.001
var marker = L.marker([37.871016, -122.250791], { title: "idk"}).addTo(map);

// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// };
//
// var latMin = 37.87;
// var latMax = 37.88;
// var lonMin = -122.25
// var lonMax = -122.26


// var uscCoords = [34.0224, -118.2851];
// var gpCoords = [34.0563, -118.246];
// var universalCoords = [34.1381, -118.3534];




// map.themes.setWeather(L.Wrld.themes.weather.Rainy);

// Generating dummy data for the heat map
// function genCoordArray(n) {
// 	var heatMapArray = [];
// 	for (var i = 0; i < n; i++) {
// 		var lat = getRandomArbitrary(latMin, latMax);
// 		var lon = getRandomArbitrary(lonMin, lonMax);
// 		var intensity = getRandomArbitrary(0.1, 1.0);
// 		heatMapArray.push([lat, lon]);
// 	}
// 	return heatMapArray;
// };

// Draw the heat map
// var heatMapArray = genCoordArray(500);



// var heat = L.heatLayer(heatMapArray, {radius: 25, minOpacity: 0.2}).addTo(map);

// Functions for  navigating indoors
function exitIndoors() {
	map.indoors.exit();
	var heat = L.heatLayer(heatMapArray, {radius: 25, minOpacity: 0.2}).addTo(map);
};

function moveUp() {
	map.indoors.moveUp();
};

function moveDown() {
	map.indoors.moveDown();
};

function retrieve(id) {
	var element = document.getElementById(id);
	var value = element.value;
	return value;
};

$(function() {
	$('button').click(function() {
		$.ajax({
			url: '/modifyMap',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response) {
				// console.log(response);
				var x = retrieve("dummy");
				var newCoords = genCoordArray(x);
				console.log(newCoords);
				heat.setLatLngs(newCoords);
			},
			error: function(error) {
				console.log(error);
			}
		});
	});
});
