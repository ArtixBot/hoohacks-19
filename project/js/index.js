let name = document.getElementById("userID");
name.innerText = "User";

function getTimeDate(){
	var datetime = new Date();
	let time = document.getElementById("systemTime");
	let date = document.getElementById("systemDate");

	time.innerHTML = datetime.toLocaleTimeString();
	date.innerHTML = datetime.toLocaleDateString();
}


function submitMsg(){
	let entry = document.getElementById("submitMessage");
	if (entry.value.trim() == ""){
		return false;
	}
	else{		// Submit to Firebase.
		renderMessage(entry.value);
	}
	entry.value = "";
}

function analyzeSentiment(data){
	let url = "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
	let ocp_key = "b9de284b8ce1456fa4c178d4482ceb27";
	return fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers:{
			"Content-Type" : "application/json",
			"Ocp-Apim-Subscription-Key" : ocp_key,
		},
		body: JSON.stringify({
			"documents" : [
				{
					"language": "en",
					"id" : 1,
					"text" : data,
				}
			]
		})
	}).then(response => response.json()).then(
		response => {return response["documents"][0]["score"];}
	)
} 

function displayInWorkspace(content){
	let workspace = document.getElementById("workspace-content");
	let sentiment = analyzeSentiment(content).then((result) =>{
		let status = "neutral"
		if (result < 0.40){
			status = "negative"
		}
		else if (result > 0.60){
			status = "positive"
		}
		workspace.innerHTML = "<b>Selected Content</b><hr>" + content + "<hr><b>Analyzed Sentiment: </b>" + result.toFixed(2) +" <b>(" + status + ")</b>";
	});
}

function renderMessage(message){
	let chatPanel = document.getElementById("chatPanel");
	let module = document.createElement("div");
	module.setAttribute("class", "chatMessage");
	module.innerHTML = message;

	module.addEventListener("click", function(){displayInWorkspace(module.innerHTML)});

	chatPanel.appendChild(module);
	chatPanel.scrollTop = chatPanel.scrollHeight;
}

// TODO: Implement. Pull NEW messages from Firebase, then render using renderMessage();
// When a message is rendered into the chat pane and we click on it, run displayInWorkspace();
// Call this method every second, or when submitMsg() runs.
function retrieveMessages(){
}

function main(){
	getTimeDate();
	setInterval(getTimeDate, 1000);			// Every second update time.
	setInterval(retrieveMessages, 1000);
}

function logout(){
    firebase.auth().signOut().then(function() {
        window.alert("Good job");
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
  window.alert("Signing out error!");
});
}

main();