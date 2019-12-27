var player1= prompt("Player One: Enter Your Name: And You Will be Blue");
var player1color='rgb(86, 151, 255)';

var player2=prompt("Player Two: Enter Your Name: And You Will be Red")
var player2color='rgb(237, 45, 73)';

var game_on=true;
var table=$('table tr');

function reportWin(rowNum,colNum){
	console.log('You won at');
	console.log(rowNum);
	console.log(colNum);
}

function checkColor(rowIndex,colIndex){
	return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


 function changeColor(rowIndex,colIndex,color){
 	return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function checkBottom(colIndex){
	var currentColor = checkColor(6,colIndex)
	for (var i = table.length - 1; i >= 0; i--) {
		currentColor = checkColor(i,colIndex);
		if (currentColor === 'rgb(128, 128, 128)'){
			return i
		}
	}
}

function match(one,two,three,four){
	return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

function matchHorizontal(){
	for (var row=0;row < 6;row++){
		for (var col=0; col < 4; col++){
			if (match(checkColor(row,col),checkColor(row,col+1),checkColor(row,col+2),checkColor(row,col+3))){
				console.log('horizontal win');
				reportWin(row,col);
				return true;
			}
			else{
				continue;
			}
		}

	}
}

function matchVerical(){
	for (var col=0; col<7; col++){
		for (var row=0; row<3; row++){
			if (match(checkColor(row,col),checkColor(row+1,col),checkColor(row+2,col),checkColor(row+3,col))){
				console.log('vertical win');
				reportWin(row,col);
				return true;
			}
			else{
				continue;
			}
		}
	}
}

function matchDiagonal(){
	for(var col=0; col<7; col++){
		for (var row=0; row<6; row++){
			if(match(checkColor(row,col),checkColor(row+1,col+1),checkColor(row+2,col+2),checkColor(row+3,col+3))){
				console.log('diagonal win');
				reportWin(row,col);
				return true;
			}
			else if(match(checkColor(row,col),checkColor(row+1,col-1),checkColor(row+2,col-2),checkColor(row-3,col-3))){
				console.log('oppo diagonal win');
				reportWin(row,col);
				return true;
			}
			else{
				continue;
			}
		}
	}
}


var currentPlayer=1
var currentName=player1
var currentColor=player1color

$('h2').text(player1+" its your turn, pick a column to drop")

$('.board button').on('click',function(){

	var col=$(this).closest('td').index();
	var bottomAvail=checkBottom(col);
	changeColor(bottomAvail,col,currentColor);


	if (matchHorizontal() || matchVerical() || matchDiagonal()){
		$('h1').text(currentName+" You Won!");
		$('h2').fadeOut('fast');
		$('h4').fadeOut('fast');
	}

	currentPlayer = currentPlayer *-1;
	if (currentPlayer === 1){
		currentName=player1;
		$('h2').text(currentName+" its Your turn");
		currentColor=player1color;

	}
	else{
		currentName=player2;
		$('h2').text(currentName+" its Your turn");
		currentColor=player2color;
	}
})