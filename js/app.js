var secretNumber = Math.floor(100 * Math.random() + 1);
var numGuesses = 5;
var previousGuesses = [];
var $guess = $("#guess");
var $btnCheck = $("#check");
var $btnHint = $("#answer");
var $btnRestart = $("#restart");
var $overlay = $("#overlay");

$overlay.click(function(){
  $overlay.hide();
  beginGame();
});


function beginGame() {
	secretNumber = Math.floor(100 * Math.random() + 1);
	numGuesses = 5;
	previousGuesses = [];
	$guess.val('');
	document.getElementById("guessCount").innerHTML=numGuesses+" Guesses Remaining";
	document.getElementById("message").innerHTML=null;
	$("button").prop("disabled", false);
	$guess.prop("disabled", false);
}

function canSubmit() {
  return numGuesses > 0;
}

function updateGuesses() {
	numGuesses --;
	document.getElementById("guessCount").innerHTML=numGuesses+" Guesses Remaining";
}

function checkNumber(){

	previousGuesses.push(parseInt($guess.val()));
	
	if (1> $guess.val() || 100 < $guess.val()) {
		alert("Not a valid number!")
	}
	else {

	 	if(numGuesses <= 0){
			alert("Sorry, you lose!");
			$guess.prop("disabled",true);
			$btnCheck.prop("disabled",true);
			$btnHint.prop("disabled",true);
		}
		 else if ( $guess.val() - secretNumber > 15 ){
		 	alert ("You're as cold as ice!\n\nGuess a lot lower.");
		 	updateGuesses();
		 }
		 else if ( $guess.val() - secretNumber > 5 ){
		 	alert ("It's getting hot in here!\n\nGuess lower.");
		 	updateGuesses();
		 }
		 else if ( $guess.val() > secretNumber ){
		 	alert ("It burns, burns, burns. The ring of fire!\n\nGuess a little lower.");
		 	updateGuesses();
		 }
		 else if ( secretNumber - $guess.val() > 15 ){
		 	alert ("You're as cold as ice!\n\nGuess a lot higher.");
		 	updateGuesses();
		 }
		 else if ( secretNumber - $guess.val() > 5 ){
		 	alert ("It's getting hot in here!\n\nGuess higher.");
		 	updateGuesses();
		 }
		 else if ( $guess.val() < secretNumber ){
		 	alert ("It burns, burns, burns. The ring of fire!\n\nGuess a little higher.");
		 	updateGuesses();
		 }
		 else if ($guess.val() == secretNumber){
			alert("Next stop is victory; it's rushing like a train!!!\n\nYahoo! It's your celebration!");
			$overlay.show();
		 };

	};
}

function lastNumber() {
	if ( previousGuesses.length < 1){
		document.getElementById("message").innerHTML="Your last guess was: " + $guess.val();
	}
	
	else if ( previousGuesses.indexOf(parseInt($guess.val())) !== -1 ) {
		document.getElementById("message").innerHTML="Your last guesses were: " + previousGuesses.join(', ') + ", and " + $guess.val() + "<br>Don't repeat yourself!";
	}
	else if ( Math.abs($guess.val()-secretNumber) < Math.abs(previousGuesses[previousGuesses.length-1]-secretNumber) ){
		document.getElementById("message").innerHTML="Your last guesses were: " + previousGuesses.join(', ') + ", and " + $guess.val() + "<br>You are getting warmer!";
	}
	else {
		document.getElementById("message").innerHTML="Your last guesses were: " + previousGuesses.join(', ') + ", and " + $guess.val() + "<br>You are getting colder"};
}

$guess.keypress(function(e) {
    if(e.which === 13) {
    	event.preventDefault();
        lastNumber();
        checkNumber();
        $guess.val('');
    }
});

$btnCheck.click(function() {
	lastNumber();
	checkNumber();	
	$guess.val('');
});

$btnRestart.click(function(){
	alert("Your game has been restarted!");
	beginGame();
})

$btnHint.click(function(){
	document.getElementById("message").innerHTML="The number is " + secretNumber;
})


beginGame();








