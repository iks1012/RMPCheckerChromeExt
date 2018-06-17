




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
			getRatingsforEachTeacher(teacherNames);
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
		//console.log(names);
	}

	return names;
}

function getRatingsforEachTeacher(names){
	if(namesFound){
		//get the urls to look up each prof from thier names
		var urls = generateProfQueryURLs(names);

		//send the get requests and get each of the urls of each of the profs
		urls = getProfPageURLs(urls);

		


	}
}

function generateProfQueryURLs(names){
	var urls = new Array(names.length);
	for(var i = 0; i < names.length; i++){
		if(names[i] != 'Staff'){
			index = i;
			var firstName = names[i].substring(0, names[i].indexOf(" "));
			var lastName = names[i].substring(names[i].indexOf(" ")+1);
			var url = 'https://www.ratemyprofessors.com/search.jsp?query='+firstName+'+'+lastName+'+Stony+Brook';
			urls[i] = url;
		}
		else{
			urls[i] = 'Staff';
		}

	}
	return urls;
}

function getProfPageURLs(urls){
	var searchResultResponses = new Array(urls.length);
	for(var i = 0; i < names.length; i ++){
		if(urls[i] != 'Staff'){
			searchResultResponses[i] = get(urls[i]);
			var tidIndex = searchResultResponses[i].indexOf("tid");
			var tidStart = searchResultResponses[i].indexOf("=", tidIndex)+1;
			var tidEnd = searchResultResponses[i].indexOf("\"", tidIndex);
			var tid = parseInt(searchResultResponses[i].substring(tidStart, tidEnd));

			//update the corresponding URLs
			urls[i] =  "http://www.ratemyprofessors.com/ShowRatings.jsp?tid="+tid;
		}
		else{
			searchResultResponses[i] = 'Staff';
		}
	}
	return urls;
}

function get(url){
	var xhr = new XMLHttpRequest();

	xhr.open("GET", url, false);
	xhr.send();

	return xhr.responseText;
}




