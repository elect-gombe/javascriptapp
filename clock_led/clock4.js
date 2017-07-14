"use strict";

var canvasContext = function(canvas){
    var ctx = canvas.getContext("2d");
    
    (ctx.init = function() {
	ctx.font = "23px ''";
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
    ctx.line=function(x1,y1,x2,y2){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
    }
    ctx.drawBox=function(x,y,w,h){
	ctx.fillRect(x,y,w,h);
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.stroke();
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

var font = new Array(new Array(1,1,1),//0
		     new Array(1,0,1),
		     new Array(1,0,1),
		     new Array(1,0,1),
		     new Array(1,1,1),
		     new Array(0,1,0),//1
		     new Array(1,1,0),
		     new Array(0,1,0),
		     new Array(0,1,0),
		     new Array(1,1,1),
		     new Array(1,1,1),//2
		     new Array(0,0,1),
		     new Array(1,1,1),
		     new Array(1,0,0),
		     new Array(1,1,1),
		     new Array(1,1,1),//3
		     new Array(0,0,1),
		     new Array(1,1,1),
		     new Array(0,0,1),
		     new Array(1,1,1),
		     new Array(1,0,1),//4
		     new Array(1,0,1),
		     new Array(1,1,1),
		     new Array(0,0,1),
		     new Array(0,0,1),
		     new Array(1,1,1),//5
		     new Array(1,0,0),
		     new Array(1,1,1),
		     new Array(0,0,1),
		     new Array(1,1,1),
		     new Array(1,1,1),//6
		     new Array(1,0,0),
		     new Array(1,1,1),
		     new Array(1,0,1),
		     new Array(1,1,1),
		     new Array(1,1,1),//7
		     new Array(1,0,1),
		     new Array(1,0,1),
		     new Array(0,0,1),
		     new Array(0,0,1),
		     new Array(1,1,1),//8
		     new Array(1,0,1),
		     new Array(1,1,1),
		     new Array(1,0,1),
		     new Array(1,1,1),
		     new Array(1,1,1),//9
		     new Array(1,0,1),
		     new Array(1,1,1),
		     new Array(0,0,1),
		     new Array(1,1,1),
		     new Array(0,0,0),//:
		     new Array(0,1,0),
		     new Array(0,0,0),
		     new Array(0,1,0),
		     new Array(0,0,0),
		    );

var drawfont=function(px,py,c,g){
    for(var x=0;x<3;x++){
	for(var y=0;y<5;y++){
	    if(font[y+c*5][x]===1)
		g.fillCircle(5+px+x*10,5+py+y*10,4);
	}
    }
}

window.onload = function()
{
    var canvas = document.getElementById('canvas');
    var g = canvasContext(canvas);

    (function draw() {
	var date = new Date();
	g.clearCanvas(g.rgb(0,0,0));

	g.setFill(g.rgb(100,255,100));
	var s;
	s = date.getHours();
	drawfont(0,0,(s/10)>>0,g);
	drawfont(40,0,s%10,g);
	drawfont(70,0,10,g);
	s = date.getMinutes();
	drawfont(100,0,(s/10)>>0,g);
	drawfont(140,0,s%10,g);
	// drawfont(170,0,10,g);
	// s = date.getSeconds();
	// drawfont(200,0,(s/10)>>0,g);
	// drawfont(240,0,s%10,g);

	setTimeout(draw,50);
    })()
};
