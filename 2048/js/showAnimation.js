// JavaScript Document
//function showMoveAnimation(fromX,fromY,toX,toY){
//	var numberCell = $('#number-cell-' + fromX + '-' + fromY);
//	numberCell.animate({
//		top:getTop(toX,toY),
//		left:getLeft(toX,toY)
//		},200);
//	}
function showMoveAnimation(fromX,fromY,toX,toY){
	var numberCell = $('#number-cell-' + fromX + '-' + fromY);
	numberCell.animate({
		top:getTop( toX , toY )+"px",
		left:getLeft( toX , toY)+"px"
		},200);
	}
function showNumberAnimation( i , j , randNumber ){

    var numberCell = $('#number-cell-' + i + "-" + j );

    numberCell.css('background-color',getBackground( randNumber ) );
    numberCell.css('color',getColor( randNumber ) );
    numberCell.text( randNumber );

    numberCell.animate({
        width:cellSideLength+"px",
        height:cellSideLength+"px",
        top:getTop( i , j )+"px",
        left:getLeft( i , j )+"px"
    },50);
}
function updateScore( score ){
    $('#score').text( score );
}
function updateStep( step ){
    $('#step').text( step );
}