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

window.onload = function()
{
    var canvas = document.getElementById('canvas');
    var g = canvasContext(canvas);
    var width = 10;
    var height = 10;
    
    var sheet = new Array();
    for(var i=0;i<width*height;i++){
	sheet[i] = -1;
    }

    document.body.addEventListener('touchmove', function(event) {
	event.preventDefault();
    }, false);

    var drawingColor = 0;
    var count = 0;
    inputEvent(canvas,function(x,y,c){
	if(c){
	    if(sheet[(x/40>>0)+(y/40>>0)*width] === -1){
		drawingColor = 0;
	    } else {
		drawingColor = -1;
	    }
	}
	if(drawingColor===0&&sheet[(x/40>>0)+(y/40>>0)*width]===-1);
	else if(drawingColor===-1&&sheet[(x/40>>0)+(y/40>>0)*width]!==-1);
	else return;
	sheet[(x/40>>0)+(y/40>>0)*width] = drawingColor;
	draw();
    });
    function randomsort() {
	var c=0;
	var tmp_array = new Array(width*height);
	var tmp,r;
	
	for(var i=0;i<width*height;i++){
	    if(sheet[i]!==-1){
		tmp_array[c++] = i;
	    }
	}
	for(var i=0;i<c;i++){
	    r = (Math.random()*c)>>0;
	    tmp = tmp_array[i];
	    tmp_array[i] = tmp_array[r];
	    tmp_array[r] = tmp;
	}
	for(var i=0;i<c;i++){
	    sheet[tmp_array[i]] = i;
	}
	document.getElementById("count").innerHTML=c+"人";	
    }
    function draw() {
	i=0;
	g.setStroke(g.rgb(0,0,0));
	randomsort();
	for(var y = 0;y < height;y++){
	    for(var x = 0;x < width;x++){
		if(sheet[x+y*width]===-1){
		    g.setFill(g.rgb(255,255,255));
		}else{
		    g.setFill(g.rgb(255,230,230));
		}
		g.drawBox(x*40,y*40,40,40);
		if(sheet[x+y*width]!==-1){
		    g.setFill(g.rgb(0,0,0));
		    g.fillText(sheet[x+y*width]+1,x*40+2,y*40+30);
		}
	    }
	}
    }
    draw();
    
    document.getElementById("cls").onclick = function() {
	count = 0;
	for(var i=0;i<width*height;i++){
	    sheet[i] = -1;
	}
	draw();
    };
};

function inputEvent(ctx,ein){
    var has_mousePressed;
    
    if('ontouchstart' in window){
	ctx.addEventListener("touchstart", function(e) {
	    var x = e.changedTouches[0].clientX - this.offsetLeft;
	    var y = e.changedTouches[0].clientY - this.offsetTop;
	    ein.call(this, x, y,true);
	}, false);
	ctx.addEventListener("touchmove", function(e) {
	    var x = e.changedTouches[0].clientX - this.offsetLeft;
	    var y = e.changedTouches[0].clientY - this.offsetTop;
	    ein.call(this,x, y,false);
	}, false);
    }else{
	ctx.addEventListener("mousedown", function(event){
	has_mousePressed = true;
	    ein.call(this,event.offsetX, event.offsetY,true);
	},false);
	ctx.addEventListener("mousemove", function(event) {
	    if (has_mousePressed)
		ein.call(this, event.offsetX, event.offsetY,false);
	}, false);
	ctx.addEventListener("mouseup", function(e) {
	    has_mousePressed = false;
	}, false);
    }
}


function onClick(e) {
    var rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    draw();
}
