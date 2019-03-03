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
		firebase.database().ref('user_messages/usr_msgs').set({
			email: firebase.auth().currentUser["email"],
			message: document.getElementById("submitMessage").value
		}
	);
		//added email as parameter
		renderMessage(entry.value, firebase.auth().currentUser["email"]);
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

function validURL(str) {
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
	  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
	  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	return !!pattern.test(str);
}

function isImage(url) {
    return(url.match(/\.(jpeg|jpg|gif|png|gif)$/) != null);
}

function imageAnalysis(url){
	let workspace = document.getElementById("workspace-content");

	let ocp_key = "f7b8d2d1056540f585beb1568c7fedf1";
	let fetchUrl = "https://eastus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories,Description&language=en";

	
	return fetch(fetchUrl, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type" : "application/json",
			"Ocp-Apim-Subscription-Key" : ocp_key,
		},
		body: '{"url": "' + url + '"}',
	}).then(response =>response.json()).then(result =>{
		let categories = result["categories"][0]["name"];
		let category_confidence = result["categories"][0]["score"];
		let desc = result["description"];
		workspace.innerHTML = workspace.innerHTML + "<hr><b>Primary Category: </b>" + categories + " (confidence " + category_confidence.toFixed(2)*100 + "%)";
		if (desc["captions"].length > 0){
			let caption = desc["captions"][0]["text"]
			let cap_conf = desc["captions"][0]["confidence"]
			workspace.innerHTML = workspace.innerHTML + "<hr><b>Description: </b>" + caption + " (confidence " + cap_conf.toFixed(2)*100 + "%)";
		}
		if (desc["tags"].length > 0){
			workspace.innerHTML = workspace.innerHTML + "<hr><b>Applicable Tags: </b>"
			for(let i = 0; i < desc["tags"].length; i++){
				workspace.innerHTML = workspace.innerHTML + desc["tags"][i] + " ";
			}
		}
	})
}

function youtube_parser(url){
	var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
	var match = url.match(regExp);
	return (match&&match[1].length==11)? match[1] : false;
}

function displayInWorkspace(content){
	let workspace = document.getElementById("workspace-content");
	
	// Reset current workspace.
	workspace.innerHTML = "";
	unrenderYT();
	
	// Check if youtube video.
	let youRegex = new RegExp("^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+");
	// modify content to keep content parsable
	let no_username = content.replace(/.*: /, "");
	if (youRegex.test(no_username)){
		let id = youtube_parser(no_username);
		render(id);
	}
	else if (validURL(no_username)){
		if (isImage(no_username)){
			workspace.innerHTML = "<img src='" + no_username + "' style='width: 100%' alt='Was unable to retrieve image.'/>"
			imageAnalysis(no_username);
		}else{
			workspace.innerHTML = "<b>URL detected: </b><a href=" + no_username + '>' + no_username + "</a>";
		}
	}
	else{
		analyzeSentiment(no_username).then((result) =>{
				let status = "neutral"
				if (result < 0.40){
				status = "negative"
				}
				else if (result > 0.60){
				status = "positive"
				}
				workspace.innerHTML = "<b>Selected Content: </b>" + no_username + "<hr><b>Analyzed Sentiment: </b>" + result.toFixed(2) +" <b>(" + status + ")</b>";
				});
		wiki(no_username).then((result) =>{
				if (result){
				workspace.innerHTML = workspace.innerHTML + "<hr><b>Wikipedia Abstract</b><hr>" + result;
				}
				})
	}
}

//added email as parameter
function renderMessage(message, email){
	let chatPanel = document.getElementById("chatPanel");
	let module = document.createElement("div");
	//regex remove email for username
	var address = email;
	var username = address.replace(/@.*/, "");

	module.setAttribute("class", "chatMessage");
	module.innerHTML = username + ": " + message;

	module.addEventListener("click", function(){displayInWorkspace(module.innerHTML)});

	chatPanel.appendChild(module);
	chatPanel.scrollTop = chatPanel.scrollHeight;
}
var tmp = null;
// TODO: Implement. Pull NEW messages from Firebase, then render using renderMessage();
// When a message is rendered into the chat pane and we click on it, run displayInWorkspace();
// Call this method every second, or when submitMsg() runs.
function retrieveMessages(){
	var db = firebase.database(); // Get a database reference to our posts
	var ref = db.ref("user_messages/usr_msgs/");
	var current = firebase.auth().currentUser["email"];
	//var ref2 = db.ref("user_messages/usr_msgs/email");

	// Attach an asynchronous callback to read the data at our reference
	ref.once("value")
		.then(function(snapshot) {
			var email = snapshot.child("email").val();
			var message = snapshot.child("message").val();
			if (current != email){
				if (message != tmp){
					tmp = message;
					renderMessage(message);
				}
			}
		});
}

function main(){
	getTimeDate();
	setInterval(getTimeDate, 1000);			// Every second update time.
	setInterval(retrieveMessages, 1000);
}

logout_button.addEventListener('click', e => {
		firebase.auth().signOut();
		});

var user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(firebaseUser => {
		if (firebaseUser) {
		// User is signed in.
		console.log('Logged in');
		} else {
		// No user is signed in.
		console.log('Not logged in');
		window.location.href = "login.html";
		}
		});

main();