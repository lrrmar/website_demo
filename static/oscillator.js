
function addData() {


var frequency_var = document.getElementById("frequency");
var damping_var = document.getElementById("damping");

 
if (window.data_to_json === undefined) {

	window.data_to_json = {} ;
	window.data_to_json[frequency_var.name] = [];
	window.data_to_json[damping_var.name] = [];
	$("ul").append(`<li>Frequency, Damping</li>`);
}

if (frequency_var.value != "") {
	if (damping_var.value != ""){
		window.data_to_json[frequency_var.name].push(frequency_var.value);
		window.data_to_json[damping_var.name].push(damping_var.value);
		$("ul").append(`<li>${frequency_var.value}, ${damping_var.value}</li>`);
}}

Data = JSON.stringify(window.data_to_json);

document.getElementById("frequency").value = "";
document.getElementById("damping").value = "";
}


function removeData() {

var frequency_var = document.getElementById("frequency");
var damping_var = document.getElementById("damping");

document.getElementById("data_list").removeChild(document.getElementById("data_list").lastElementChild);

window.data_to_json[damping_var.name].pop();
window.data_to_json[frequency_var.name].pop();

Data = JSON.stringify(window.data_to_json);
}

function postData() {

$.ajax({
method: "POST",
url: "/oscillator/input",
dataType: "json",
contentType: "application/json",
data: Data,
success: function (returnedData, successStr, jqXHR) {

window.location.href = "/oscillator/display"; 

window.returnedData = returnedData;
}


});


}


function loadPlotNames()  {

document.getElementById('var_here_2').innerHTML = plots;

}

function prevPlot() {


if (id === 0) {var prev_id = num_plots - 1; }
else { var prev_id = ((id - 1) % num_plots); };

var url = `/xsec/display/${prev_id}`;


window.location.href = url
}

function nextPlot() {


var next_id = ((id + 1) % num_plots);

var url = `/xsec/display/${next_id}`;


window.location.href = url
}




/*function get_plots(returnedData, successStr, jqXHR) {

window.location.href = "/oscillator/input";

console.log(returnedData);

var frequency = returnedData.frequency;


document.getElementById('var_here_1').innerHTML = returnedData;

}*/
