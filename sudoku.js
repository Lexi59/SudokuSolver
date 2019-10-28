let size = 9;
let width = 50;
let tbl = new Array();
let inputString;
let n = 0;
function setup(){
	createCanvas(600,600);
	background(255);
	initializeTable();
	drawTable();
}

function draw(){
	if(allFilled() == true){noLoop();}
	for(var i = 0; i < size; i++){
		for(var j = 0; j < size; j++){
			tbl[i][j].refreshPossible();
		}
	}
	drawTable();
}

function initializeTable(){
	inputString = prompt("Enter initial:");
	if(inputString.length < size*size){
		console.log("Improper input");
	}
	for(var i = 0; i < size; i++){
		var row = new Array();
		for(var j = 0; j < size; j++){
				row.push(new Cell(i,j));
		}
		tbl.push(row);
	}
}

function drawTable(){
	stroke(0);
	strokeWeight(2);
	textSize(width/3);
	textAlign(CENTER, CENTER);
	for(var i = 0; i < size; i++){
		for(var j = 0; j < size; j++){
			rect(width*j+100, width*i+100, width, width);
			if(tbl[i][j].value != 0){text(tbl[i][j].value, width*j+100+width/2, width*i+100 + width/2);}
		}
	}
}
function allFilled(){
	for(var i = 0; i < size; i++){
		for(var j = 0; j < size; j++){
			if(tbl[i][j].value == 0){
				return false;
			}
		}
	}
	return true;
}

class Cell{
	constructor(row, col){
		this.value = inputString[n];
		n++;
		this.possibleValues = new Array();
		this.row = row;
		this.column = col;
		this.square = this.findSquare();
	}
	findSquare(){
		var square = new Array(2);
		var rowSet = false;
		var colSet = false;
		for(var i = 0; i <= Math.sqrt(size); i++){
			if(this.row < i*Math.sqrt(size) && rowSet == false){
				square[0] = i-1;
				rowSet = true;
			}
			if(this.column < i*Math.sqrt(size) && colSet == false){
				square[1] = i-1;
				colSet = true;
			}
		}
		return square;
	}
	refreshPossible(){
		if(this.value == 0){
			this.possibleValues = new Array();

			for(var i = 0; i < size; i++){
				var found = 0;
				for(var k = 0; k < size; k++){
					if(tbl[this.row][k].value == i+1 || tbl[k][this.column].value == i+1){
						found = 1;
					}
				}
				for(var j = 0; j < Math.sqrt(size); j++){
					for(var n = 0; n < Math.sqrt(size); n++){
						if(tbl[this.square[0]*Math.sqrt(size)+j][this.square[1]*Math.sqrt(size)+n].value == i + 1){
							found = 1;
						}
					}
				}
				if(found == 0){
					this.possibleValues.push(i+1);
				}
			}

			if(this.possibleValues.length == 1){
				this.value = this.possibleValues[0];
				console.log(this.row + " " + this.column + " = " + this.value);
			}
		}
	}



}
