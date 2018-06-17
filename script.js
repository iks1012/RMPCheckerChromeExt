



var i = 0;
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

	var front_page = document.getElementById('front-page-content').childNodes[2].childNodes[3];
	console.log(front_page);
}


//The event handle for the change on the targetNode
function callback(mutationList, observer) {
	mutationList.forEach((mutation) => {
		
		switch(mutation.type) {
		case 'childList':
			//this is the type of change we care about...
			
			setTimeout(getTeacherName, 3000);
			break;
		case 'attributes':
			break;
		}
	});
}

function getTeacherName(){

	var correctNode = $("#ptifrmtgtframe").contents().find('MTG_INSTR$0');
	console.log(correctNode);
	if(correctNode != null){

	}
}



