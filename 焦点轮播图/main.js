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
	index++;
	render();
	showBtn();
	}
prev.onclick=function(){
	index--;
	render();
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
function render(){
	
	var count=0;
	//根据目标位置和当前位置的差值，求得速度（带正负号）
	var speed=(-width*index-list.offsetLeft)/step;
	timer=setInterval(function(){
		list.style.left=list.offsetLeft+speed+"px";
		count++;
		if(count==step){//当步数达到后，清除时钟
		clearInterval(timer);
		}
	},delay)
	//当移动到副图之后，回到主图
	setTimeout(function(){
		if(list.offsetLeft==-3600){list.style.left=-600+"px";index=1;showBtn();}
		if(list.offsetLeft==0){list.style.left=-3000+"px";index=5;showBtn();}
	},step*delay+1);
}
//渲染底部的索引
function showBtn(){
	for(var i=0;i<buttons.length;i++){
		buttons[i].className="";
		}
		buttons[index-1].className="selected";
	}