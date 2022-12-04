mapboxgl.accessToken = 'pk.eyJ1IjoiZm9yY2V0ZWFtIiwiYSI6ImNsYTJkMzFkdDBlM3Yzb3BlbzV0MDAzaHoifQ.FIb3SfFn_ACoWJ1EuRajJw';
    const coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/forceteam/cla2pkpoa00re14o26x2o2b3c',
	projection: 'mercator',
        center: [-3, 54],
        zoom: 4,
		dragPan: false,
		fitBounds: [[-23, 50],[7, 58]]
    });


    const canvas = map.getCanvasContainer();

    // Variable to index different 'point' sources and their respective geojson data
    var point_count = 0;

    // Allocating lists for point source and geojson 

    var points = [];
    var point_geojsons = [];
    var lines = [];
    var line_geojsons = [];	

    function generate_geojson(e) {

	const coords = e.lngLat;


	const geojson = {
		'type': 'FeatureCollection',
		'features': [
		{
			'type': 'Feature',
			'geometry': {
			'type': 'Point',
			'coordinates': [coords.lng, coords.lat]
			}
		}
		]
	};

	return geojson;
    }

    function closestPointIndex (coords) {

	var mindex = 0;
	var mindist = 10000000;

	for (i=0; i++; i<point_count) {
		var geojson_coords = point_geojsons[i].features[0].geometry.coordinates;
		var distance = Math.sqrt( (coords.lng - geojson_coords.lng)**2 + (coords.lat - geojson_coords.lat)**2 );

			if (distance < mindist) {

			mindex = i;
			mindist = distance

			}
		}

	return mindex;

	}





    function onMove(e) {
        const coords = e.lngLat;

        // Set a UI indicator for dragging.
        canvas.style.cursor = 'grabbing';

        // Update the Point feature in `geojson` coordinates
        // and call setData to the source layer `point` on it.
        geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
        map.getSource('point').setData(geojson);
    }

    function onUp(e) {
        const coords = e.lngLat;

        // Print the coordinates of where the point had
        // finished being dragged to on the map.
        coordinates.style.display = 'block';
        coordinates.innerHTML = `Longitude: ${coords.lng}<br />Latitude: ${coords.lat}`;
        canvas.style.cursor = '';

        // Unbind mouse/touch events
        map.off('mousemove', onMove);
        map.off('touchmove', onMove);
    }

    map.on('click', (e) => {

	const coords = e.lngLat;
	//geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
	points.push(`point_${point_count}`);

	point_geojsons.push(generate_geojson(e));

        // Add a single point to the map.
	map.addSource(points[point_count], {
            'type': 'geojson',
            'data': point_geojsons[point_count]
        });

	if (point_count == 0) {

		point_colour = '#22CED9';}

	else {

		point_colour = '#F84C4C'; };

        map.addLayer({
	'id': points[point_count],
    	'type': 'circle',
        'source': points[point_count], 
            'paint': {
                'circle-radius': 4,
                'circle-color': point_colour // red color
		    }});
	if (point_count >= 1) { 

		lines.push(`line_${point_count - 1}`);

		var first_coords = point_geojsons[point_count - 1].features[0].geometry.coordinates;
		var last_coords = point_geojsons[point_count].features[0].geometry.coordinates;

		line_geojsons.push({
			'type': 'geojson',
				'data': {
					'type': 'Feature',
					'geometry': {
						'type': 'LineString',
						'coordinates': [ first_coords, last_coords ]
						}
					}
				});
		map.addSource(lines[point_count - 1], line_geojsons[point_count - 1]
				);
		//console.log(getSource('line_1')
		map.addLayer({
		'id': lines[point_count - 1],
		'type': 'line',
		'source': `line_${point_count - 1}`,
		'layout': {
			'line-join': 'round',
			'line-cap': 'round'
			},
		'paint': {
			'line-color': '#F84C4C',
			'line-width': 3
			}
		});
		};


	point_count ++ ;	

	});



        // When the cursor enters a feature in
        // the point layer, prepare for dragging.

	map.on('mouseenter', points, () => {

		canvas.style.cursor = 'move';
	
	});

	map.on('mouseleave', points, () => {

		canvas.style.cursor = '';

	});
	


	map.on('mousedown', points, (e) => {
	// Prevent the default map drag behavior.
		e.preventDefault();

		const coordinates = e.lngLat;

		const index = closestPointIndex(coordinates);

		console.log(index); 

		canvas.style.cursor = 'move';
	
		map.on('mousemove', onMove);
		map.once('mouseup', onUp);
	});

	map.on('touchstart', 'point[i]', (e) => {
		if (e.point[i].length !== 1) return;
		// Prevent the default map drag behavior.
		e.preventDefault();

		map.on('touchmove', onMove);
		map.once('touchend', onUp);
	});

