// 定位信息
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getTop( i , j ){
    return cellSpace + i*(cellSpace+cellSideLength) ;
}

function getLeft( i , j ){
    return cellSpace + j*(cellSpace+cellSideLength) ;
}
//颜色数字信息
function getBackground(num){
	switch(num){
		case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
	}
	return "black";
}
function getColor(num){
	if( num <= 4 )
        return "#776e65";
    return "white";
}
//产生一个数字
function getNumber(){
	if(nospace(board)){
		return false;
	}
	var num = Math.random()>0.5?2:4;
	var locX = Math.floor(Math.random()*4);
	var locY = Math.floor(Math.random()*4);
	while(true){
		if(board[locX][locY]===0){
			break;
		}else{
			locX = Math.floor(Math.random()*4);
			locY = Math.floor(Math.random()*4);
		}
	}
	board[locX][locY] = num;
	//updateData();
	showNumberAnimation( locX , locY , num );
	}
function nospace( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if( board[i][j] === 0 )
                return false;
    return true;
}

function canMoveLeft( ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i][j-1] === 0 || board[i][j-1] === board[i][j] )
                    return true;

    return false;
}

function canMoveRight( ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2; j >= 0 ; j -- )
            if( board[i][j] != 0 )
                if( board[i][j+1] === 0 || board[i][j+1] === board[i][j] )
                    return true;

    return false;
}

function canMoveUp(  ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] === 0 || board[i-1][j] === board[i][j] )
                    return true;

    return false;
}

function canMoveDown(  ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- )
            if( board[i][j] != 0 )
                if( board[i+1][j] === 0 || board[i+1][j] === board[i][j] )
                    return true;

    return false;
}
function noBlock(i,j,k,dir){
	switch(dir){
		case 0:
			for(var m = k+1;m < j;m++){
				if(board[i][m]!=0){
					return false;
				}
			}
			return true;
			break;
		case 1:
			for(var m = k+1;m < i;m++){
				if(board[m][j]!=0){
					return false;
				}
			}
			return true;
			break;
		case 2:
			for(var m = k-1;m > j;m--){
				if(board[i][m]!=0){
					return false;
				}
			}
			return true;
			break;
		case 3:
			for(var m = i+1;m < k;m++){
				if(board[m][j]!=0){
					return false;
				}
			}
			return true;
			break;
	}
}