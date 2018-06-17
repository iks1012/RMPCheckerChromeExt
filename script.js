




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
		console.log(names);
	}

	return names;
}



function getRatingsforEachTeacher(names){
	if(namesFound){

		for(var i = 0; i < names.length; i++){
			if(names[i] != 'Staff'){
				var firstName = names[i].substring(0, names[i].indexOf(" "));
				var lastName = names[i].substring(names[i].indexOf(" ")+1);
				var url = 'https://www.ratemyprofessors.com/search.jsp?query='+firstName+'+'+lastName+'+Stony+Brook';
				var response = httpGet(url);

				console.log(response);
			}

		}


	}
}


function httpGet(theUrl){
	httpGetHelper(theUrl);
	var temp = httpGetResponse
	httpGetResponse = null;
	return httpGetResponse;
}

function httpGetHelper(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            httpGetResponse = xmlHttp.responseText;
        else
        	console.log(xmlHttp.statusText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}






