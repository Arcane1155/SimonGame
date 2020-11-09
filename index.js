 
 var buttonColors = ["green", "red", "yellow", "blue"];
 var gamePattern = [];
 var userPattern = [];
 var level = 1;
 var started = false;

 $(document).on("keydown", function () {

 	if(!started) {
 		$("h1").text("Level " + level);
 		started = true;
 		nextSequence();
 	}
 });

$(".myButton").on("click", function () {

	var userClickedColor = $(this).attr("id");
	userPattern.push(userClickedColor);

	play(userClickedColor);
	animateButton(userClickedColor);

	verifyAnswer(userPattern.length-1);
});


function nextSequence() {

	userPattern = [];
	$("h1").text("Level " + level);
	level ++;
	
	var randomNumber = Math.floor(Math.random() * 4) ;
	var randomColor = buttonColors[randomNumber];
	gamePattern.push(randomColor);

	play(randomColor);
	$("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
	
}

function verifyAnswer(currentLevel) {

	if(gamePattern[currentLevel]===userPattern[currentLevel]) {
		if(gamePattern.length===userPattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		play("wrong");
		$("body").addClass("game-over");
		$("h1").text("Game Over, Press Any Key to Restart");

		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}
}

function animateButton(anyChosenColor) {

	$("#" + anyChosenColor).addClass("pressed");
	setTimeout(function () {
		$("#" + anyChosenColor).removeClass("pressed");
	}, 100);
}

function play(anyChosenColor) {

	var audio = new Audio("sounds/" + anyChosenColor + ".mp3");
	audio.play();
}

function startOver() {
	gamePattern	= [];
	level = 1;
	started = false;
}

