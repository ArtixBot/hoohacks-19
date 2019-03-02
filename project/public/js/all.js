// Things which should occur on ALL pages. AKA, stuff like background shifting.
    // Should be above all other custom .js files.

    function determineBackground(){
        var light = document.cookie.split(";")[0];

        if (light){		// Check if cookie exists in the first place.
            let status = light.split("=")[1];
            console.log(document.styleSheets[3].cssRules[3].style["color"]);
            if (status=="dark"){
                document.styleSheets[3].cssRules[2].style["background-image"] = 'url("images/Dark-Theme.svg")'	// Don't ask how I got this...
                document.styleSheets[3].cssRules[3].style["color"] = "white";
                document.styleSheets[2].cssRules[581].style["color"] = "white";
                document.styleSheets[2].cssRules[579].style["color"] = "white";
            }
            else{
                document.styleSheets[3].cssRules[2].style["background-image"] = 'url("images/Light-Theme.svg")'
                document.styleSheets[3].cssRules[3].style["color"] = "black";
                document.styleSheets[2].cssRules[581].style["color"] = "rgb(0,0,0.5)";
                document.styleSheets[2].cssRules[579].style["color"] = "rgb(0,0,0.9)";
            }
        }
    }

determineBackground();

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBSRI2Het_yA6yHWEXcpnQBlE_kAvTqhs8",
  authDomain: "hivemind-233318.firebaseapp.com",
  databaseURL: "https://hivemind-233318.firebaseio.com",
  projectId: "hivemind-233318",
  storageBucket: "hivemind-233318.appspot.com",
  messagingSenderId: "183194599761"
};
firebase.initializeApp(config);