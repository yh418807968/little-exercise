// JavaScript Document
//剪影为圆形
var canvasWidth=1024;
var canvasHeight=576;
 var canvas=document.getElementById("canvas");
 var context=canvas.getContext("2d");
 canvas.width=canvasWidth;
 canvas.height=canvasHeight;
 
 var image=new Image();
 var radius=50;
 var timer=null;
 var clipping={x:-1,y:-1,r:radius}
 image.src="img.jpg";
 image.onload=function(){

	 initCanvas();
	 }
function initCanvas(){
	clipping={x:Math.random()*(canvas.width-2*radius)+radius,y:Math.random()*(canvas.height-2*radius)+radius,r:radius};
	draw(image,clipping);
	
	}
function draw(image,clipping){
	context.clearRect(0,0,canvas.width,canvas.height)
	//context.drawImage(image,0,0);
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
function show(){

	timer=setInterval(function(){
		clipping.r+=20;
		if(clipping.r>Math.max(canvas.width,canvas.height)+50){clearInterval(timer);}
		draw(image,clipping);
		},30)
	}
function reset(){
	initCanvas();
	}