let name = document.getElementById("userID");
name.innerText = "User";

function requestJSON(url){
	return fetch(url).then(response => response.json());	// Combined arrow and anonymous function with then().
}

function submitMsg(){
	let entry = document.getElementById("chatMessage");
	console.log(entry.value);
	entry.value = "";
}

function getTimeDate(){
	var datetime = new Date();
	let time = document.getElementById("systemTime");
	let date = document.getElementById("systemDate");

	time.innerHTML = datetime.toLocaleTimeString();
	date.innerHTML = datetime.toLocaleDateString();
}

function main(){
	getTimeDate();
	setInterval(getTimeDate, 1000);		// Every second update time.
}

main();