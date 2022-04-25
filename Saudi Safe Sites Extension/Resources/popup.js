
browser.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "POST", "https://api.al-hokail.com/security/isdomainsafe", false); // false for synchronous request
		xmlHttp.setRequestHeader('Content-type', 'application/json');
		xmlHttp.send(JSON.stringify({"url": request.url, "html": request.html}));
		
		response = JSON.parse(xmlHttp.responseText)
		
		is_safe = response.status

		var frame = document.getElementById("frame")
		frame.src = response.status
	}
);

browser.tabs.executeScript({file:"content.js"});


/*function runOnStart() {
	browser.tabs.executeScript({file:"background.js"})
	var newElement = document.createElement("h1");
	newElement.innerText = "Yes";
	document.body.insertBefore(newElement, document.body.firstChild);
	console.log(safari.extension.globalPage.contentWindow.currentUrl());
	hostname = safari.application.activeBrowserWindow.activeTab.url;

	if(hostname == "apple.com")
	{
		var newElement = document.createElement("h1");
		newElement.innerText = hostname + "Safe";
		document.body.insertBefore(newElement, document.body.firstChild);
	}
	else
	{
		var newElement = document.createElement("h1");
		newElement.innerText = hostname + "Not Safe";
		document.body.insertBefore(newElement, document.body.firstChild);
	}
}

if(document.readyState !== 'loading') {
	runOnStart();
}
else {
	
}
*/
