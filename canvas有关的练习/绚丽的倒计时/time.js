// 实现倒计时效果
var WINDOW_WIDTH=1000;
var WINDOW_HEIGHT=800;
var RADIUS=6;
var MARGIN_LEFT=0;
var MARGIN_TOP=0;
var endTime=new Date(2016,10,7,0,0,0);

var curShowTimeSeconds=0;
var drawing=document.getElementById("canvas");
drawing.width= WINDOW_WIDTH;
drawing.height= WINDOW_HEIGHT;

if(drawing.getContext){
	var context=drawing.getContext("2d");
	curShowTimeSeconds=getcurShowTimeSeconds();
	setInterval(function(){
		render(context);
		update();
		},1000);
	
}
//获得当前的秒数
function getcurShowTimeSeconds(){
	var curTime=new Date();
	var diff=endTime.getTime()-curTime.getTime();
	diff=Math.round(diff/1000);
	return diff>=0?diff:0;
	}
function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes=parseInt((curShowTimeSeconds-3600*hours)/60);
	var seconds=curShowTimeSeconds%60;
	//小时
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	//冒号
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	//分钟
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	//冒号
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	//秒
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
}
function renderDigit(x,y,num,cxt){
	cxt.fillStyle="blue";
	
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
				cxt.stroke();}
			}
		}
	
	}
function update(){
	var nextShowTimeSeconds=getcurShowTimeSeconds();
	var nextHours=parseInt(nextShowTimeSeconds/3600);
	var nextMinutes=parseInt((nextShowTimeSeconds-3600*nextHours)/60);
	var nextSeconds=nextShowTimeSeconds%60;
	
	var curHours=parseInt(curShowTimeSeconds/3600);
	var curMinutes=parseInt((curShowTimeSeconds-3600*nextHours)/60);
	var curSeconds=curShowTimeSeconds%60;
	if(nextSeconds!=curSeconds){
		curShowTimeSeconds=nextShowTimeSeconds;
		}
	}