function wiki(topic){
	let url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=" + topic
	return fetch(url).then(response => response.json()).then(response =>{
		let lookup = Object.keys(response["query"]["pages"]);
		return response["query"]["pages"][lookup]["extract"].slice(0, 500) +"...";
	})
}