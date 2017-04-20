// JavaScript Document
var board = new Array();
var score = 0;
var step = 0;
var dir = 0;
var hasConflicted = new Array();
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
	prepareForMobile();
	newgame();
});
function prepareForMobile(){

    if( documentWidth > 500 ){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
	//初始化界面
	init();
	//添加两个随机数字块
	getNumber();
	getNumber();
}
function init(){
	 for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){

            var gridCell = $('#grid-cell-'+i+"-"+j);
            gridCell.css('top', getTop( i , j ) );
            gridCell.css('left', getLeft( i , j ) );
        }
	for(var i=0;i<4;i++){
		board[i]=new Array(4);
		hasConflicted [i]=new Array(4);
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasConflicted [i][j]=false;
		}
	}
	
	updateData();
}
function updateData(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var theNumberCell=$("#number-cell-"+i+"-"+j);
			
			 if(board[i][j]==0){	
				 theNumberCell.css( "width","0px");
				 theNumberCell.css( "height","0px");
				theNumberCell.css("top",getTop(i,j)+cellSideLength/2);
				theNumberCell.css("left",getLeft(i,j)+cellSideLength/2);		 
			}else{
				theNumberCell.css( "width",cellSideLength);
				 theNumberCell.css( "height",cellSideLength);
				theNumberCell.css("top",getTop(i,j));
				theNumberCell.css("left",getLeft(i,j));	
				theNumberCell.css("background",getBackground(board[i][j]));	
				theNumberCell.css("color",getColor(board[i][j]));
				theNumberCell.html(board[i][j]);
			}
			 hasConflicted[i][j] = false;
		}
	}
	 $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}
$(document).keydown(function(e){
	 e.preventDefault();
	switch(e.keyCode){
		case 37:
			dir=0;
			if(moveLeft()){
				 setTimeout("getNumber()",210);
				}
			break;
		case 38:
			dir=1;
			if(moveUp()){
				setTimeout("getNumber()",210);
				}
			break;
		case 39:
			dir=2;
			if(	moveRight()){
				setTimeout("getNumber()",210);
				}	
			break;
		case 40:
			dir=3;
			if(	moveDown()){
				setTimeout("getNumber()",210);
				}
			break;
		}
	});
document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
	 event.preventDefault();
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;
	//保证是滑动不是点击
    if( Math.abs( deltax ) < 0.2*documentWidth && Math.abs( deltay ) < 0.2*documentWidth )
        return;

    if( Math.abs( deltax ) >= Math.abs( deltay ) ){

        if( deltax > 0 ){
            //move right
			dir=2;
            if( moveRight() ){
                setTimeout("getNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //move left
			dir=0;
            if( moveLeft() ){
                setTimeout("getNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
    else{
        if( deltay > 0 ){
            //move down
			dir=3;
            if( moveDown() ){
                setTimeout("getNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //move up
			dir=1;
            if( moveUp() ){
                setTimeout("getNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
});

function moveLeft(){
	if(!canMoveLeft()){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlock(i,j,k,dir)){
						//移动
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						
						break;
						//updateData();
					}else if(board[i][k]==board[i][j]&&noBlock(i,j,k,dir)&&!hasConflicted[i][j]){
						//相加
						showMoveAnimation(i,j,i,k);
						board[i][k]=2*board[i][j];
						board[i][j]=0;
						score += board[i][k];
                        updateScore( score );
						hasConflicted[i][j] =true;
						break;
						//updateData();
						}
				}
			}
		}
	}
	step += 1;
    updateStep( step);
	setTimeout(updateData,200);
	return true;
}
function moveRight(){
	if(!canMoveRight()){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlock(i,j,k,dir)){
						//移动
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;

						break;
						//updateData();
					}else if(board[i][k]==board[i][j]&&noBlock(i,j,k,dir)&&!hasConflicted[i][j]){
						//相加
						showMoveAnimation(i,j,i,k);
						board[i][k]=2*board[i][j];
						board[i][j]=0;
						score += board[i][k];
                        updateScore( score );
						hasConflicted[i][j] =true;
						break;
						//updateData();
						}
				}
			}
		}
	}
	step += 1;
    updateStep( step);
	setTimeout("updateData()",200);
	return true;
}
function moveUp(){
	if(!canMoveUp()){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlock(i,j,k,dir)){
						//移动
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;

						break;
						//updateData();
					}else if(board[k][j]==board[i][j]&&noBlock(i,j,k,dir)&&!hasConflicted[i][j]){
						//相加
						showMoveAnimation(i,j,k,j);
						board[k][j]=2*board[i][j];
						board[i][j]=0;
						score += board[i][k];
                        updateScore( score );
						hasConflicted[i][j] =true;
						break;
						//updateData();
						}
				}
			}
		}
	}
	step += 1;
   updateStep( step);
	setTimeout("updateData()",200);
	return true;
}
function moveDown(){
	if(!canMoveDown()){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlock(i,j,k,dir)){
						//移动
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						break;
						//updateData();
					}else if(board[k][j]==board[i][j]&&noBlock(i,j,k,dir)&&!hasConflicted[i][j]){
						//相加
						showMoveAnimation(i,j,k,j);
						board[k][j]=2*board[i][j];
						board[i][j]=0;
						score += board[i][k];
                        updateScore( score );
						hasConflicted[i][j] =true;
						break;
						//updateData();
						}
				}
			}
		}
	}
	step += 1;
    updateStep( step);
	setTimeout("updateData()",200);
	return true;
}