"use strict";

var sound = new Audio();
var state = 1;
sound.src = "test.mp3"

sound.loop = true;
sound.play();

window.onload = function()
{
    document.getElementById("pp").onclick = function() {
	if(state==1)
	    sound.pause(),state = 0;
	else
	    sound.play(),state = 1;
    }
}
