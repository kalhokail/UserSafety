document.addEventListener("DOMContentLoaded", function(event) {
	console.log("Hello from code");
	document.body.textContent = "";

	let header = document.createElement('h1');
	header.textContent = "This page has been eaten";
	document.body.appendChild(header);
}
