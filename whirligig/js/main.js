// JavaScript Document

var xradius=200,
	yradius=80;
	//旋转椭圆的长短半径
var	xcenter=$("#carousel").width()/2,
	ycenter=$("#carousel").height()/2;	
	//旋转的圆心

var	width=128,
	height=164;
	//图片最初的宽和高
	
var	imgLen=$("a").length,
	//图片张数
	angleSpacing=2*Math.PI/imgLen,
	angle=[],
	//图片间隔角度
	timeDelay=500,
	//动画时间
	scale=[1,0.9,0.8,0.7,0.6,0.6,0.7,0.8,0.9];
	//图片缩放的比例
var xLoc=[],
	yLoc=[],
	yLocRef=[],
	//图片当前所在位置
	zIndex=[],
	curWidth=[],
	curHeight=[];
	//当前的宽高
var imgs=$("a")	;
var step=0;
var dir="left";
var gap=2;	

$(document).ready(function(){
	//$("img").load(function(){
		init();
	//	});
	});
	
function init(){
	//图片的位置信息
	for(var i=0;i<imgLen;i++){ 
		 curWidth[i]=width*scale[i];
		 curHeight[i]=height*scale[i];
		 angle[i]=i*angleSpacing-Math.PI/2;
		  xLoc[i]=xcenter+xradius*Math.cos(angle[i])- curWidth[i]/2;
		 yLoc[i]=ycenter-yradius*Math.sin(angle[i])- curHeight[i]/2;
		zIndex[i]=Math.floor(yLoc[i]);
		//倒影
		yLocRef[i]=curHeight[i]+gap;
	}
	show();
}
function show(){
	for(var i=0;i<imgLen;i++){
		var curA=$("#0"+(i+1));
		var curImg=curA.find(".cloudcarousel");
		var curImgRef=curA.find(".Ref");
		curA.animate({
			"top":yLoc[(i+step)%imgLen],
			"left":xLoc[(i+step)%imgLen],
			"width":curWidth[(i+step)%imgLen],
			"height":curHeight[(i+step)%imgLen],
			"z-index":zIndex[(i+step)%imgLen],
			},{queue:false,duration:timeDelay,easing:"easeInOutQuad"})
		 curImg.animate({
			"width":curWidth[(i+step)%imgLen],
			"height":curHeight[(i+step)%imgLen],
			},{queue:false,duration:timeDelay,easing:"easeInOutQuad"})
		//curImgRef.animate({
//			"top":yLocRef[(i+step)%imgLen],
//			"left":0,
//			"width":curWidth[(i+step)%imgLen],
//			"height":curHeight[(i+step)%imgLen],
//			"z-index":zIndex[(i+step)%imgLen],
//			"opacity": 0.5,
//			},{queue:false,duration:timeDelay})
		//curImgRef.css("opacity",gradient( top,0.5,0))
}
	$("#title").html($("#0"+((imgLen-step)%imgLen+1)).find("img").attr("title"));
	$("#alt").html($("#0"+((imgLen-step)%imgLen+1)).find("img").attr("alt"));
}
function rotate(dir){
	switch(dir){
		case "left":
			step--;	
		break;
		case "right":
			step++;
		break;
	}	
	if(step<0){step=step+imgLen;}
	if(step>imgLen-1){step=step-imgLen;}
	show();
}
$("#btn1").click(function(){
	dir="left";
	rotate(dir);
	})
$("#btn2").click(function(){
	dir="right";
	rotate(dir);
	})
//$("a").click(function(e){
//	var bigImg=$("#carousel").append("<img></img>");
//	
//	bigImg.attr("src",$(this).attr("href")).css("z-index",999)
//
//	})
$("a").hover(function(){
	$("#title").html($(this).find("img").attr("title"));
	$("#alt").html($(this).find("img").attr("alt"));
	//$(this).css("border","10px solid #222")
	},
	function(){
		$("#title").html($("#0"+((imgLen-step)%imgLen+1)).find("img").attr("title"));
	$("#alt").html($("#0"+((imgLen-step)%imgLen+1)).find("img").attr("alt"));
		})
