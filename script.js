


//when the page loads, set up the change detection on the correct Node (targetNode).
window.onload = function () {

	var front_page = document.getElementById('front-page-content').childNodes[2].childNodes[2].childNodes[3].childNodes[0].childNodes[1].childNodes[3];
	console.log(front_page);
	console.log(front_page.rows.item(2).innerHTML);
}



