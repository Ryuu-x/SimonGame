var buttonColors = ["red", "blue", "yellow", "green"]; // array holding the button colors

var gamePattern = []; // To store game sequence 

var userClickedPattern = []; // To store user clicks

var level = 0; // Track game level

var started = false; // flag 

// Detect key press to start the game
$(document).keydown(function()
{
    if(!started)
    {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

// Generate the next sequence in the game pattern
function nextSequence()
{
    userClickedPattern = []; // reset user pattern for next level
    level++;
    $("#level-title").text("Level " + level); // update the level text in h1
    
    var randomNumber = Math.floor(Math.random() * 4); // generate a random no between 0-3

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor); // add it to the game pattern

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor); // to play the chosen color sound
    
}

// play sound based on the chosen color
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Detect button click by the user
$(".btn").click(function()
{
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function()
    {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
    // Check if the user's last clicked button matches the game's pattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        // If the user has completed the current pattern
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            }, 1000);
        }
    }

    // if the user chooses the wrong answer 
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function()
        {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }    
}


function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}


