



var i = 0;
var observerOptions = {
  childList: true,
  attributes: true,
  subtree: true, //Omit or set to false to observe only changes to the parent node.
  characterData: true 
}

var observer = new MutationObserver(callback);




window.onload = function () {
	var targetNode = document.getElementById('ptifrmtgtframe').contentDocument.childNodes[1];
	observer.observe(targetNode, observerOptions);
	console.log(targetNode);
}



function callback(mutationList, observer) {
	mutationList.forEach((mutation) => {
		switch(mutation.type) {
		case 'childList':
			//this is the type of change we care about...

			break;
		case 'attributes':
			break;
		}
	});
}

function getTeacherName(){
	
}



