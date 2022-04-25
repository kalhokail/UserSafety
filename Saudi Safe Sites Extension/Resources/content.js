
browser.runtime.sendMessage({url: document.location.href, html: document.body}).then((response) => {
		console.log(response);
});
