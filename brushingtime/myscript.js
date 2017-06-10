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
    var i = 0;
    
    var img = new Image();
    img.src = "brush.png";
    (function f() {
	console.log(canvasContext);
    })();
    function draw() {
	g.clearCanvas(g.rgb(255,255,255));
	g.setFill(g.rgb(0,0,0));
	g.drawImage(img,0,Math.floor(20+Math.sin(i++*3.141592*2/15)%2*20));

	if(i < 30*60*5){//about 5 minutes.
	    g.fillText("Brush your teeth while a few minutes.",20,30);
	    setTimeout(draw,1000/30);
	}
	else{
	    g.fillText("OK.",20,20);
	}
    }
    img.onload = function(){
	draw();
    }
};
