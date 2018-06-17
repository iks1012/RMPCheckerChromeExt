




var namesFound = false;

var observerOptions = {
  childList: true,
  attributes: true,
  subtree: true, //Omit or set to false to observe only changes to the parent node.
  characterData: true 
}

var observer = new MutationObserver(callback);
var targetNode = null;


//when the page loads, set up the change detection on the correct Node (targetNode).
window.onload = function () {
	var targetNode = document.querySelector('#ptifrmtgtframe').contentDocument.body;
	observer.observe(targetNode, observerOptions);
}


//The event handle for the change on the targetNode
function callback(mutationList, observer) {
	namesFound = false;
	httpGetResponse = null;
	mutationList.forEach((mutation) => {
		switch(mutation.type) {
		case 'childList':
			//this is the type of change we care about...

			var teacherNames = getTeacherName();
			var ratings = getRatingsforEachTeacher(teacherNames);
			if(namesFound){ //then the rating must exist by now
				//update the html
			}

			break;
		case 'attributes':
			break;
		}
	});
}

//gets the names that needs to be looked up on RMP (Rate my professor)
function getTeacherName(){
	var spanList = document.querySelector('#ptifrmtgtframe').contentDocument.querySelectorAll('[id^="MTG_INSTR"]');

	if(spanList != null){
		namesFound = true;
		var names = new Array(spanList.length);
		for (var i = names.length - 1; i >= 0; i--) {
			names[i] = spanList[i].innerHTML;

		}
	}

	return names;
}

function getRatingsforEachTeacher(names){
	if(namesFound){
		//get the urls to look up each prof from thier names
		var urls = generateProfQueryURLs(names);

		//send the get requests and parse JSON objects
		var jsonObjects = parseToJSONObjects(urls);

		var ratings = getRatingsFromJSONObjects(jsonObjects);


	}
	else{
		return array
	}
}

function generateProfQueryURLs(names){
	var urls = new Array(names.length);
	for(var i = 0; i < names.length; i++){
		if(names[i] != 'Staff'){
			var firstName = names[i].substring(0, names[i].indexOf(" "));
			var lastName = names[i].substring(names[i].indexOf(" ")+1);
			var url = 'https://search-a.akamaihd.net/typeahead/suggest/?q='+firstName+'%20'+lastName+'%20stony%20brook&defType=edismax&qf=teacherfirstname_t%5E2000%20teacherlastname_t%5E2000%20teacherfullname_t%5E2000%20autosuggest&siteName=rmp&rows=20&fl=pk_id%20teacherfirstname_t%20teacherlastname_t%20total_number_of_ratings_i%20averageratingscore_rf'
			urls[i] = url;
		}
		else{
			urls[i] = 'Staff';
		}

	}
	return urls;
}

function parseToJSONObjects(urls){
	var jsonObjects = new Array(urls.length);
	for(var i = 0; i < urls.length; i ++){
		if(urls[i] != 'Staff'){
			jsonObjects[i] = JSON.parse(get(urls[i]));
		}
		else{
			jsonObjects[i] = 'Staff';
		}
	}
	return jsonObjects;
}

function getRatingsFromJSONObjects(jsons){
	var ratings = new Array(jsons.length);
	var response = "";
	for(var i = 0; i < jsons.length; i++){

		if(jsons[i] != 'Staff'){
			//Process the JSON to get rating
			console.log(jsons[i].response.docs[0].averageratingscore_rf);
		}
		else{
			ratings[i] = "N/A";
		}

	}

	console.log(ratings);
	return ratings;
}

function get(url){
	var xhr = new XMLHttpRequest();

	xhr.open("GET", url, false);
	xhr.send();

	return xhr.responseText;
}




