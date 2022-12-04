function confirmClick() {


	var lats = [];
	var lngs = [];


	for (let i=0;i < point_count; i++) {

		var coords = point_geojsons[i].features[0].geometry.coordinates;
		lats.push(coords[1]); 
		lngs.push(coords[0]); 

		};

	var json_coordinates = {lats, lngs};

	var Data =JSON.stringify(json_coordinates);


	console.log(Data);


	$.ajax({
	method: "POST",
	url: "/xsec/input",
	dataType: "json",
	contentType: "application/json",
	data: Data,
	success: function (returnedData, successStr, jqXHR) {
	
	window.location.href = "/xsec/display";
	
		}
			});

	};

