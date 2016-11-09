// JavaScript Document
//剪影为圆形
var canvasWidth=1024;
var canvasHeight=576;
 var canvas=document.getElementById("canvas");
 var blurDiv=document.getElementById("blur-div")
 var context=canvas.getContext("2d");
 canvas.width=canvasWidth;
 canvas.height=canvasHeight;
 
 var image=new Image();
 var isMouseDown=false;
 var radius=25;
 var timer=null;
 var clipping={x:-1,y:-1,r:radius}
 image.src="img.jpg";

function WindowToDiv(x,y){
	var bbox=blurDiv.getBoundingClientRect();
	return {x:x-bbox.left,y:y-bbox.top}
}
blurDiv.onmousedown=function(e){
	e.preventDefault();
	var point=WindowToDiv(e.clientX,e.clientY);
	isMouseDown=true;
	initCanvas(point);
}
blurDiv.onmousemove=function(e){
	e.preventDefault();
	if(isMouseDown==true){
		var point=WindowToDiv(e.clientX,e.clientY);
		//console.log(point.x,point.y)
		initCanvas(point);
		}
}
blurDiv.onmouseup=function(e){
	e.preventDefault();
	isMouseDown=false;
}
blurDiv.onmouseout=function(e){
	e.preventDefault();
	isMouseDown=false;
}
function initCanvas(
point){
	clipping={x:point.x,y:point.y,r:radius};
	draw(image,clipping);
	}
function draw(image,clipping){
	context.save();
	setClipping(clipping);
	context.drawImage(image,0,0);
	context.restore();
	}
function setClipping(clipping){
	context.beginPath();
	context.arc(clipping.x,clipping.y,clipping.r,0.2*Math.PI,false);
	//context.stroke();
	context.clip();}
