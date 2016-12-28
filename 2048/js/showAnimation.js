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
		top:getTop( fromX , fromY ),
		left:getLeft( fromX , fromY)
		},200);
	}
function showNumberAnimation( i , j , randNumber ){

    var numberCell = $('#number-cell-' + i + "-" + j );

    numberCell.css('background-color',getBackground( randNumber ) );
    numberCell.css('color',getColor( randNumber ) );
    numberCell.text( randNumber );

    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getTop( i , j ),
        left:getLeft( i , j )
    },50);
}
function updateScore( score ){
    $('#score').text( score );
}
function updateStep( step ){
    $('#step').text( step );
}