




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
	console.log("Iframe Changed!");
	
}

