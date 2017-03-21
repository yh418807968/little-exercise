// JavaScript Document
var prev=document.getElementById("prev");
var next=document.getElementById("next");
var list=document.getElementById("list");
var imgSum=5;
var buttons=document.getElementsByTagName("span");
var index=1;//0~6，初始位置为1
var width=600;
var height=400;
var timer=null;
var step=30;
var delay=10;
var animated=false;

next.onclick=function(){
	if (index == 5) {
	    index = 1;
	}
	else {
	    index += 1;
	}
	
	render(-1*width);
	showBtn();
	}
prev.onclick=function(){
	if (index == 1) {
	    index = 5;
	}
	else {
	    index -= 1;
	}
	render(width);
	showBtn();
	}

for(var i=0;i<buttons.length;i++){
		buttons[i].onclick=function(){
			index=this.getAttribute("index");
			render();
			showBtn();
		}
}
//移动函数
function render(distance){
	
	var count=0;
	//根据目标位置和当前位置的差值，求得速度（带正负号）
	var speed=distance/step;
	timer=setInterval(function(){
		list.style.left=list.offsetLeft+speed+"px";
		count++;
		if(count==step){//当步数达到后，清除时钟
		clearInterval(timer);
		if(list.offsetLeft==-3600){list.style.left=-600+"px";}
		if(list.offsetLeft==0){list.style.left=-3000+"px";}
		}
	},delay);
}
//渲染底部的索引
function showBtn(){
	for(var i=0;i<buttons.length;i++){
		buttons[i].className="";
		}
		buttons[index-1].className="selected";
}