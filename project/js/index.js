let name = document.getElementById("userID");
name.innerText = "User";

function requestJSON(url){
	return fetch(url).then(response => response.json());	// Combined arrow and anonymous function with then().
}

function securityCheck(){
	let entry = document.getElementById("securityCheck").value;
	let result = document.getElementById("securityCheckResult");
	requestJSON("https://haveibeenpwned.com/api/v2/breachedaccount/" + entry).then((response) => console.log(response));
}

function submitMsg(which, keycode){
	if (keycode == 13 || which == 13){
		let entry = document.getElementById("chatMessage");
		console.log(entry.value);
		entry.value = "";
	}
}

function getHeadlines(){
	let result = document.getElementById("newsResult");
	if (result.children[0]){		// Remove old information when refreshing.
		result.removeChild(result.children[0]);
	}
	
	let url = 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'category=science&' + 'apiKey=ac65a3658e874c519a6b4752b2d03ba8';
	requestJSON(url).then((response) => {
		let headlines = response.articles.slice(0,5);	// Get top 5 headlines!
		console.log(headlines);
		for (let i = 0; i < 5; i++){
			let headline = headlines[i].title;
			let container = document.createElement("p");
			let link = document.createElement("a");
			link.innerHTML = headline;
			link.href = headlines[i].url;
			container.appendChild(link);
			container.setAttribute("class", "success");
			result.appendChild(container);
		}
	}).catch((error) => {
		let container = document.createElement("p");
		container.setAttribute("class", "failed");
		container.innerHTML = "Request failed due to rate limitation."
		
		result.appendChild(container);
	});
}

function getTimeDate(){
	var datetime = new Date();
	let time = document.getElementById("systemTime");
	let date = document.getElementById("systemDate");

	time.innerHTML = datetime.toLocaleTimeString();
	date.innerHTML = datetime.toLocaleDateString();
}

function main(){
	getHeadlines();
	getTimeDate();
	setInterval(getHeadlines, 600000);	// Every 10 minutes get headlines again.
	setInterval(getTimeDate, 1000);		// Every second update time.
}

main();