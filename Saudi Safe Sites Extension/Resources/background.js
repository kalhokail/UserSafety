alert("Background.js");

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Received request: ", request);
	print(request)

	if (request.greeting === "hello")
        sendResponse({ farewell: "goodbye" });
});
