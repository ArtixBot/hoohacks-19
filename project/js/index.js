let name = document.getElementById("userID");
name.innerText = "User";

function getTimeDate(){
	var datetime = new Date();
	let time = document.getElementById("systemTime");
	let date = document.getElementById("systemDate");

	time.innerHTML = datetime.toLocaleTimeString();
	date.innerHTML = datetime.toLocaleDateString();
}

function requestJSON(url){
	return fetch(url).then(response => response.json());	// Combined arrow and anonymous function with then().
}

function submitMsg(){
	let entry = document.getElementById("submitMessage");
	if (entry.value == ""){
		return false;
	}
	else{	// Submit to Firebase.
		renderMessage(entry.value);
	}
	entry.value = "";
}

function renderMessage(message){
	let chatPanel = document.getElementById("chatPanel");
	let module = document.createElement("div");
	module.setAttribute("class", "chatMessage");

	module.innerHTML = message;

	chatPanel.appendChild(module);
	chatPanel.scrollTop = chatPanel.scrollHeight;
}

// TODO: Implement. Pull NEW messages from Firebase, then render using renderMessage();
function retrieveMessages(){
}

function main(){
	getTimeDate();
	setInterval(getTimeDate, 1000);			// Every second update time.
	setInterval(retrieveMessages, 1000);
}

main();