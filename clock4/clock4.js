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
    ctx.fillCircle=function(x,y,r){
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI*2,true);
	ctx.fill();
    }
    return ctx;
};

window.onload = function()
{
    var canvas = document.getElementById('canvas');
    var g = canvasContext(canvas);

    var hands_of_clock=4;
    var date = new Date();
    var hands_get = new Array(
	function(){var d=new Date;return d.getHours()+d.getMinutes()/60.;},
	function(){var d=new Date;return d.getMinutes()+d.getSeconds()/60.;},
	function(){var d=new Date;return d.getSeconds()+d.getMilliseconds()/1000.;},
	function(){var d=new Date;return d.getMilliseconds();},
    );
    var hands_to = new Array(12,60,60,1000);
    var hands_color = new Array(
	g.rgb(255,0,0),
	g.rgb(0,255,0),
	g.rgb(0,0,255),
	g.rgb(255,0,255),
    );
    var hands_width = new Array(2.5,2,1.5,1);
    
    inputEvent(canvas,function(){
	var hist = new Array("結構昔","少し昔","現代","近未来");
	hands_of_clock=(hands_of_clock)%4+1;
	document.getElementById("hist").innerHTML=hist[hands_of_clock-1];
    });

    (function draw() {
	g.setFill(g.rgb(255,235,225));
	g.fillCircle(200,200,200);
	g.setFill(g.rgb(0,0,0));
	for(var i=0;i<12;i++){
	    g.fillText(i,(190+Math.sin(i/12*Math.PI*2)*160),(210-Math.cos(i/12*Math.PI*2)*160));
	}
	for(var i=0;i<hands_of_clock;i++){
	    var hands_rad = hands_get[i]() / hands_to[i] * 2 * Math.PI;
	    g.setStroke(hands_color[i]);
	    g.lineWidth = hands_width[i];
	    g.line(200,200,200+Math.sin(hands_rad)*(200-hands_width[i]*40),200-Math.cos(hands_rad)*(200-hands_width[i]*40));
	}
	setTimeout(draw,20);
    })()
};

function inputEvent(ctx,ein){
    ctx.addEventListener("mousedown", function(event){
	ein.call(this);
    },false);
}
