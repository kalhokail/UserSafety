
browser.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "POST", "https://api.al-hokail.com/security/isdomainsafe", false); // false for synchronous request
		xmlHttp.setRequestHeader('Content-type', 'application/json');
		xmlHttp.send(JSON.stringify({"url": request.url, "html": request.html}));
		
		response = JSON.parse(xmlHttp.responseText)
		
		is_safe = response.status
		
		const params = new Proxy(new URLSearchParams(window.location.search), {
		  get: (searchParams, prop) => searchParams.get(prop),
		});

		let value = params.url; // "some_value"
		
		xmlHttp.open( "GET", "https://api.al-hokail.com/security/isdomainsafe/" + value, false); // false for synchronous request
		xmlHttp.send();
		
		response = JSON.parse(xmlHttp.responseText)
	
		d = document.getElementById("domain");
		d.innerHTML = response.domain;
		
		s = document.getElementById("status_en");
		s.innerHTML = response.short_description.en;
		
		s = document.getElementById("status_ar");
		s.innerHTML = response.short_description.ar;
		
		if(response.status === 'safe')
		{
			i = document.getElementById("icon");
			i.src = "img/safe.png";
		}
		else
		{
			i = document.getElementById("icon");
			i.src = "img/not_safe.png";
		}
		
		desc = document.getElementById("desc_en");
		desc.innerHTML = response.description.en;
		
		desc = document.getElementById("desc_ar");
		desc.innerHTML = response.description.ar;
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
