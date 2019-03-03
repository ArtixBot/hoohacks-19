var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '50%',
		width: '100%',
		videoId: 0,
	});
}

function render(id){
	let x = document.getElementById("ytplayer-holder");
	x.style.opacity = 1;
	player.loadVideoById(id);
}

function unrenderYT(){
	let x = document.getElementById("ytplayer-holder");
	x.style.opacity = 0;
	player.loadVideoById(0);
}