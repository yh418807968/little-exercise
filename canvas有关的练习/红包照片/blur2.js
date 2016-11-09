// JavaScript Document
//剪影为五角星
var canvasWidth=1024;
var canvasHeight=576;
 var canvas=document.getElementById("canvas");
 var context=canvas.getContext("2d");
 canvas.width=canvasWidth;
 canvas.height=canvasHeight;
 
 var image=new Image();
 var R=50,r=R/2,rot=30;
 var timer=null;
 var clipping={x:-1,y:-1,R:R,r:r,rot:rot}
 image.src="img.jpg";
 image.onload=function(){

	 initCanvas();
	 }
function initCanvas(){
	clipping={x:Math.random()*(canvas.width-2*R)+R,y:Math.random()*(canvas.height-2*R)+R,R:R,r:r,rot:Math.random()*360};
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
	//context.arc(clipping.x,clipping.y,clipping.r,0.2*Math.PI,false);
	//context.stroke();
	drawStar(context,clipping.R,clipping.r,clipping.x,clipping.y,clipping.rot);
	context.clip();}
function show(){

	timer=setInterval(function(){
		clipping.R+=50;
		clipping.r=clipping.R/2;
		clipping.rot+=20;
		if(clipping.r>Math.max(canvas.width,canvas.height)+50){clearInterval(timer);}
		draw(image,clipping);
		},50)
	}
function reset(){
	initCanvas();
	}
	
function drawStar(cxt,R,r,x,y,rot){
	cxt.beginPath();
	for(var i=0;i<5;i++){
		cxt.lineTo(Math.cos((18+i*72-rot)/180*Math.PI)*R+x,-Math.sin((18+i*72-rot)/180*Math.PI)*R+y);
		cxt.lineTo(Math.cos((54+i*72-rot)/180*Math.PI)*r+x,-Math.sin((54+i*72-rot)/180*Math.PI)*r+y);
		}
	cxt.closePath();
	cxt.fillStyle="#fb3";
	cxt.stokeStyle="#fd5";
	cxt.lineWidth=3;
	cxt.lineJoin="round";
	//cxt.fill();
	cxt.stroke();
	}