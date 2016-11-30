// JavaScript Document
var chess=document.getElementById("chess");
var context=chess.getContext('2d');
var role="black";
var chessBoard=[];
var wins=[];//赢法数组
var mywins=[];
var computerwins=[];
var winsCount=0;
var over=false;
/*初始化落子数组*/
for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;}
	}
/*赢法数组*/
(function(){
	for(var i=0;i<15;i++){
		wins[i]=[];
		for(var j=0;j<15;j++){
			wins[i][j]=[];
			
		}
	}
	for(var i=0;i<15;i++){
		for(var j=0;j<11;j++){
			for(var k=0;k<5;k++){
			wins[i][j+k][winsCount]=true;	
		}
		winsCount++;
		}
	}

	for(var i=0;i<15;i++){
		for(var j=0;j<11;j++){
			for(var k=0;k<5;k++){
			wins[j+k][i][winsCount]=true;	
		}
		winsCount++;
		}
	}
	for(var i=0;i<11;i++){
		for(var j=0;j<11;j++){
			for(var k=0;k<5;k++){
			wins[i+k][j+k][winsCount]=true;	
		}
		winsCount++;
		}
	}
	for(var i=0;i<11;i++){
		for(var j=14;j>3;j--){
			for(var k=0;k<5;k++){
			wins[i+k][j-k][winsCount]=true;	
		}
		winsCount++;
		}
	}
	
	})();
for(var i=0;i<winsCount;i++){
	mywins[i]=0;
	computerwins[i]=0;
	}

/*绘制*/
context.strokeStyle="#555";
var logo=new Image();
logo.src="bg.jpg";
logo.onload=function(){
	context.save();
	context.globalAlpha=0.5;
	context.drawImage(logo,0,0,450,450);//水印背景
	context.restore();
	drawChess();//棋盘格
	//棋子
	}
chess.onclick=function(e){
	if(over||role!="black"){
		return;
		}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if(chessBoard[i][j]===0){
		oneStep(i,j,role);
		chessBoard[i][j]=1;
		//if(role==="black"){
//			role="white";
		//role=(role==="black")?"white":"black";
			for(var k=0;k<winsCount;k++){
				if(wins[i][j][k]){
					mywins[k]++;
					computerwins[k]=6;
					if(mywins[k]==5){
						alert("恭喜你，你赢了！");
						over=true;
						//return;
					}
				}
				
			}
			if(!over){
				role="white";
				computerAI();
				}
			
			
		//}else{
//			role="black";
//			}
	}
	
}
	
	
function drawChess(){
	for(var i=0;i<15;i++){
	context.moveTo(15+30*i,15);
	context.lineTo(15+30*i,435);
	context.stroke();
	context.moveTo(15,15+30*i);
	context.lineTo(435,15+30*i);
	context.stroke();
	}
	}
function oneStep(i,j,role){
	context.beginPath();
	context.arc(15+30*i,15+30*j,13,0,2*Math.PI);
	context.closePath();
	var gradient=context.createRadialGradient(15+30*i+2,15+30*j-2,13,15+30*i+2,15+30*j-2,0);
	if(role==="black"){
		gradient.addColorStop(0,"#0a0a0a");
		gradient.addColorStop(1,"#636766");
	}else if(role==="white"){
		gradient.addColorStop(0,"#d1d1d1");
		gradient.addColorStop(1,"#f9f9f9");
		}
	
	context.fillStyle=gradient;
	context.fill();
	chessBoard[i][j]=1;
	
	}
function computerAI(){
	var myScore=[];
	var computerScore=[];
	var max=0;
	var u=0,v=0;
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(chessBoard[i][j]===0){
				for(var k=0;k<winsCount;k++){
					if(wins[i][j][k]){
						if(mywins[k]===1){
							myScore[i][j]+=200;
						}else if(mywins[k]===2){
							myScore[i][j]+=400;
						}else if(mywins[k]===3){
							myScore[i][j]+=2000;
						}else if(mywins[k]===4){
							myScore[i][j]+=10000;
						}
						if(computerwins[k]===1){
							computerScore[i][j]+=220;
						}else if(computerwins[k]===2){
							computerScore[i][j]+=420;
						}else if(computerwins[k]===3){
							computerScore[i][j]+=2100;
						}else if(computerwins[k]===4){
							computerScore[i][j]+=20000;
						}
					}
				}
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]===max){
					if(computerScore[i][j]>computerScore[u][v]){
						u=i;
						v=j;
					}
				}
				if(computerScore[i][j]>max){
					max=computerScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]===max){
					if(myScore[i][j]>myScore[u][v]){
						u=i;
						v=j;
					}
				}
			}
			
		}
	}
	oneStep(u,v,"white");
	chessBoard[u][v]=2;
	for(var k=0;k<winsCount;k++){
				if(wins[u][v][k]){
					computerwins[k]++;
					mywins[k]=6;
					if(computerwins[k]==5){
						alert("很遗憾，你输了!");
						over=true;
						//return;
					}
				}	
			}
			if(!over){
				role="black";
			}
}