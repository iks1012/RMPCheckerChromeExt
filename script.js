




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

			updateInstructorCells();

			break;
		case 'attributes':
			break;
		}
	});
}

//gets the names that needs to be looked up on RMP (Rate my professor)
function updateInstructorCells(){
	var spanList = document.querySelector('#ptifrmtgtframe').contentDocument.querySelectorAll('[id^="MTG_INSTR"]');
	if(spanList != null){
		namesFound = true;
		var names = new Array(spanList.length);
		for (var i = names.length - 1; i >= 0; i--) {
			var name = spanList[i].innerHTML;
			if(!name.includes('Staff')){
				var url = generateURL(name);
				var jsonobject = JSON.parse(get(url));
				console.log(jsonobject);
				var rating = jsonobject.response.docs[0].averageratingscore_rf;
				spanList[i].innerHTML += (' \n Rating:' + rating);
			}
			else{
				spanList[i].innerHTML += (' -- Rating Not Found');
			}
		}
	}
}


function generateURL(name){
	var firstName = name.substring(0, name.indexOf(" "));
	var lastName = name.substring(name.indexOf(" ")+1);
	var url = 'https://search-a.akamaihd.net/typeahead/suggest/?q='+firstName+'%20'+lastName+'%20stony%20brook&defType=edismax&qf=teacherfirstname_t%5E2000%20teacherlastname_t%5E2000%20teacherfullname_t%5E2000%20autosuggest&siteName=rmp&rows=20&fl=pk_id%20teacherfirstname_t%20teacherlastname_t%20total_number_of_ratings_i%20averageratingscore_rf'
	return url	
}


function get(url){
	var xhr = new XMLHttpRequest();

	xhr.open("GET", url, false);
	xhr.send();

	return xhr.responseText;
}




