function darkTheme(){
	let checkbox = document.getElementById("darkThemeActive");
	if (checkbox.checked){
		document.cookie = "bg=dark; expires=Fri, 31 Dec 9999 23:59:59 GMT";
	}
	else{
		document.cookie = "bg=light; expires=Fri, 31 Dec 9999 23:59:59 GMT";
	}
	determineBackground();
}

function checkStatus(){
	let checkbox = document.getElementById("darkThemeActive");
	var light = document.cookie.split(";")[0];

	if (light){		// Check if cookie exists in the first place.
		let status = light.split("=")[1];
		if (status=="dark"){
			checkbox.checked= true;
		}
	}
}

checkStatus();