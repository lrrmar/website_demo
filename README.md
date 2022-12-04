Includes:
	
	- A mapbox user interface to provide flight path
	- A plot viewer for cross section plots of wet bulb


To run:

	- You may need to change the variables `plotting_dir` in routes/templates.py in the function ... and `plotting_script`, `input_dir` and `output_dir` in routes/xsec.py in the function ...

	- Create a conda env using the environments.yml file
	- Run the site server locally using uvicorn (defaults to port 8000) from ../cross_section_site directory:

		`uvicorn run main:app --reload`

	- Run the image server locally on a different port from the ../cross_section_site/plots directory:

		`python3 -m http.server 7800`


To use:

	- Use the mapbox instance to draw a flight path
	- Make sure to draw the flight path within or VERY CLOSE to the UK
	- Press confirm once path has been selected
	- Wait for images to generated
	- Scroll through images based on time

Note:

	earajr's plotting script is utilities/wetbulb_xsec.py
