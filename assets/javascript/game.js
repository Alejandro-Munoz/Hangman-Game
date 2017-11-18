
function startGame(){
	game.getNewWord();
	game.setWins();
	game.generateDashedArray();
	game.setHiddenWord();
	game.setRemain();
	game.setDefaultImage();
}

function getNewWord(){
	// var arrCurrent;
	var i = Math.floor(Math.random()*(game.arrWords.length-1));
	console.log(i);
	game.currentWord = game.arrWords[i];
}

function generateDashedArray(){
	var dashArr=[];
	for(var j =0; j < game.currentWord.length; j++){
		dashArr.push("__");

	}
		game.dashWord=dashArr;
}

function setWins(){
	var wins = document.getElementById("numberOfWins");
	wins.innerHTML = "<h3>" + game.wins + "</h3>"; 
}

function setHiddenWord(){
	var str="";
	var curWord = document.getElementById("currentWord");
	console.log("curwoerd: "+curWord);
	curWord.innerHTML = game.dashWord.join(" ");
}

function setRemain(){
	var remain = document.getElementById("guessRemaining");
	remain.innerHTML = "<h3>" + game.guessRemaining + "</h3>";
}

function setDefaultImage(){
	var pic = document.getElementById("image");
	pic.setAttribute("src","assets/images/gameofCharacters.jpg");	
}

function updateState(){
	game.setWins();
	game.getNewWord();
	game.generateDashedArray();
	game.setHiddenWord();
	game.setRemain();
	game.displayGuessed();

}

function matchWord(){
	if (game.currentWord ===game.dashWord.join("")){
		game.wins++;
		game.setWins();
		var result = document.getElementById("result");
		result.innerHTML = game.currentWord;
		var image = document.getElementById("image");
		image.setAttribute("src","assets/images/"+game.currentWord+".jpeg");
		var win = document.getElementById("win");
		win.play();
		return true;
	}
	return false;
}

function updateDashWord(ltrGuessed){
	console.log("entra updateDashWord " + ltrGuessed);
	for (var i = 0; i < game.alreadyGuessed.length; i++) {
		for(var j = 0; j < game.currentWord.length; j++){
			if(game.alreadyGuessed[i]===game.currentWord[j]){
				game.dashWord[j] = game.alreadyGuessed[i];
			}
		}
	}
	var el = document.getElementById("currentWord");
	el.innerHTML = "<h3>"+game.dashWord;+"</h3>";
}

function displayGuessed(){
	var div = document.getElementById("alreadyGuessed");
	div.innerHTML = "<h3>"+game.alreadyGuessed+"</h3>";
}

function displayLose(){
	var fail = document.getElementById("fail");
		fail.play();
	var result = document.getElementById("result");
		result.innerHTML = "You Loose! Try again";
}

function checkLetter(letter){
	var match = false;
	if(!game.alreadyGuessed.includes(letter)){
		//Add to already guessed letters array
		game.alreadyGuessed.push(letter);
		// Look up if letter belongs to word, if so add to game.dashWord array
		for (var i = 0; i < game.currentWord.length; i++) {
			if(letter===game.currentWord[i]){
				var ltrGuessed = game.currentWord[i];
				updateDashWord(ltrGuessed);
				match=true;
					var guess = document.getElementById("guess");
					guess.play();
			}
		}
		displayGuessed();
		if(!match){
			if(game.guessRemaining===1){
				game.displayLose();
				game.resetGame();
				game.updateState();

			}
			else{
				game.guessRemaining--;
				setRemain();
			}
			
		}
	}
	else{
		var repeat = document.getElementById("repeat");
		repeat.play();
	}
	
}

function resetGame(){
	game.currentWord="";
	game.dashWord=[];
	game.guessRemaining=10;
	game.alreadyGuessed=[];
}
// Game Object
var game = {
		//properties
		arrWords:["CERSEI","JAIME","DAENERYS","DROGO","JOHNSNOW","MELISANDRE","SANSA","THEON"],
		currentWord:"",
		dashWord:[],
		guessRemaining:10,
		alreadyGuessed:[],
		wins:0,
		//methods
		startGame:startGame,
		resetGame:resetGame,
		checkLetter:checkLetter,
		matchWord:matchWord,
		displayGuessed:displayGuessed,
		getNewWord:getNewWord,
		generateDashedArray:generateDashedArray,
		setHiddenWord:setHiddenWord,
		setWins:setWins,
		setRemain:setRemain,
		setDefaultImage:setDefaultImage,
		updateDashWord:updateDashWord,
		updateState:updateState,
		displayLose:displayLose
}
// Initilize
game.startGame();

// Event Handler
document.onkeyup = function(event){
	if(event.key==="Meta"){
		// ignore other keys
	}
	else{
		console.log("user pressed key: " + event.key);
		// getNewWord();
		var ltr = event.key.toUpperCase();
		checkLetter(ltr);
		
		if(matchWord()){
			game.resetGame();
			game.updateState();
		}
	}
}

