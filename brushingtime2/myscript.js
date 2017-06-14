"use strict";

var canvasContext = function(canvas){
    var ctx = canvas.getContext("2d");
    
    (ctx.init = function() {
	ctx.font = "30px ''";
    })();
    ctx.rgb=function(r,g,b){
	var s;
	s = "rgb(";
	s += Math.floor(r) +",";
	s += Math.floor(g) +",";
	s += Math.floor(b) +")";
	return s;
    }
    ctx.setStroke=function(s){
	ctx.strokeStyle = s;
    }
    ctx.setFill=function(s){
	ctx.fillStyle = s;
    }
    ctx.fillCircle=function(x,y,r){
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI*2,true);
	ctx.fill();
    }
    ctx.clearCanvas=function(s){
	var ts;
	ts = ctx.fillStyle;
	ctx.setFill(s);
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.setFill(ts);
    }
    return ctx;
};

window.onload = function()
{
    var g = canvasContext(document.getElementById('canvas'));
    var s_finish = new Audio();
    var i = 0;
    s_finish.src = "finish.mp3"
    
    var img = new Image();
    img.src = "brush.png";
    (function f() {
	console.log(canvasContext);
    })();

    
    var playBtn = document.getElementById('snd');
    var a =  function() {
	s_finish.load();
	if(i==90){
	    s_finish.play();
	}else{
	    playBtn.innerHTML = "通知ON";
	}
    };
    playBtn.addEventListener('click',a, false);
    
    function draw() {
	g.clearCanvas(g.rgb(255,255,255));
	g.setFill(g.rgb(0,0,0));
	g.drawImage(img,0,Math.floor(20+Math.sin(i++*3.141592*2/15)%2*20));

	if(i < 30*5*60){//about 5 minutes.
	    document.getElementById("msg").innerHTML = "Brush your teeth while a few minutes.";
	    setTimeout(draw,1000/30);
	}
	else{
	    a();
	    document.getElementById("msg").innerHTML = "OK.";
	}
    }
    img.onload = function(){
	draw();
    }
};
