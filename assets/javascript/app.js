// Create Variables to store questions and answers
var q1 = {
    question: "What year was Youtube created?",
    answer: "2005",
    imgSrc: "assets/images/youtubeRewind.gif",
    ansArr: ["2002", "2004", "2005", "2007"]
}
var q2 = {
    question: "What was the name of the first video uploaded to Youtube?",
    answer: "Me at the zoo",
    imgSrc: "assets/images/meAtTheZoo.gif",
    ansArr: ["Me at the zoo", "Chocolate Rain", "numa numa", "Charlie bit me"]
}
var q3 = {
    question: "What company bought Youtube in 2009?",
    answer: "Google",
    imgSrc: "assets/images/googleBuy.gif",
    ansArr: ["Alphbet", "Google", "Microsoft", "It was never bought..."]
}
var q4 = {
    question: "How many videos are watched per day on Youtube",
    answer: "5 Billion",
    imgSrc: "assets/images/youtubeViews.gif",
    ansArr: ["2.6 Billion", "5 Billion", "7 Billion", "9.2 Billion"]
}
var q5 = {
    question: "What is the name of the most viewed video on Youtube?",
    answer: "PSY - Gangnam Style",
    imgSrc: "assets/images/gangnamDance.gif",
    ansArr: ["Taylor Swift – Shake it Off", "Maroon 5 – Sugar", "Justin Bieber – Sorry", "PSY - Gangnam Style"]
}
var q6 = {
    question: "What is Business Insider's 2018 valuation of Youtube?",
    answer: "$160 Billion",
    imgSrc: "assets/images/youtubeMoney.gif",
    ansArr: ["$57 Billion", "$74 Billion", "$124 Billion", "$160 Billion"]
}

// The questions will be randomly added into this array.
var questionArr = [];
// var questionArr = [q1, q2, q3, q4, q5, q6];

// Possible configurations of questions
var config1 = [q1, q2, q3, q4, q5, q6];
var config2 = [q3, q5, q6, q1, q2, q4];
var config3 = [q2, q5, q6, q1, q3, q4];
var config4 = [q1, q6, q4, q3, q2, q5];
var configPoss = [config1, config2, config3, config4];

// Variables for TimerCounters
var timerRunning = false;
var counter = 30;
var intervalId;

// Variables for game functionailty
// var correctAns;     // Stores the correct value
var questObjFocus;      // Stores the question that is currently being looked at on screen
var userCorrect = false;
var answerChosen = false;
var questionNum = 0;
var startBtnPressed = false;

var wins = 0;
var gotCorrect = false;


// -------------------------
//      Functions
// -------------------------

// Function to randomize the order of questions
function scrambleQuestions() {
    var random = Math.floor((Math.random() * configPoss.length));
    // assign the main Question Array the array of questions to be displayed in order
    questionArr = configPoss[random];
}

// // Function to Begin game and fill out the JumboTron
// function jumboSetup(){
//     // Make directions for how to play the game/game rules
// }

// Function to create Question blocks

// TIMER FUNCTIONS
// Start timer function
function start() {
    //  Use setInterval to start the count here and set the clock to running.
    counter = 30;
    answerChosen = false;
    if (!timerRunning) {
        timerRunning = true;
        intervalId = setInterval(count, 1000);
        // intervalId = setInterval(
    }
}
function stop() {
    // Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    timerRunning = false;
}
function count() {
    // decrement counter variable
    counter--;

    if (counter === 0) {
        console.log("counter reached 0!");
        stop();

        if (answerChosen === false) {
            // Mark as incorrect

            // increment the questionNum
            questionNum++;

            // Check if game is over IF question Num has reached all questions
            if (questionNum === questionArr.length) {
                console.log("game over");
                displayResults();
            } else {
                // Game isnt over - starting up new question
                console.log("starting new question!");
                nextQuestion(questionArr[questionNum]);
            }
        }
    }
    // console.log(counter);
    // Use the variable you just created to show the converted time in the "display" div.
    $("#shot-clock").text(counter);
}
function reset() {
    // Resettting the WHOLE GAME
    console.log("User reset the game!");
    stop();
    // Variables for TimerCounters
    timerRunning = false;
    counter = 30;

    // Variables for game functionailty
    userCorrect = false;
    answerChosen = false;
    questionNum = 0;
    startBtnPressed = false;

    wins = 0;
    gotCorrect = false;

    startGame();
    startBtnPressed = true;
}

// Function to create Question and Answers:
// parameter: QA = Question/Answers
function nextQuestion(QA) {
    // Clear contents of the Question and Answers divs.
    $("#question-container").empty();
    $("#answer-container").empty();

    // store the question and related properties in the  
    questObjFocus = QA;

    // Start the 30 sec timer
    start();

    // Fill in the Question 
    console.log("Creating a new Question to be displayed on the screen");

    $("#question-container").html("<div id='question'><h2>" + QA.question + "</h2></div>");

    for (i = 0; i < QA.ansArr.length; i++) {
        console.log("making new div for Answers");
        var ansDiv = $("<div>");
        ansDiv.addClass("answer-div");
        ansDiv.attr("data", QA.ansArr[i]);

        ansDiv.html("<img src='assets/images/youtubeLogo.png' alt='youtube logo' id='little-logo' style='height:36.5px; float:left'> <h4 style='display:table-cell;vertical-align:middle; margin-left: 10px; float: left'>&nbsp;" + QA.ansArr[i] + "</h4>");

        // correctAns = QA.answer;

        $("#answer-container").append(ansDiv);
    }

}

// Function to handle checking User selected answer
function checkSelect() {
    // Stop the clock
    stop();

    console.log("Checking answer...");

    var userChoice = $(this).attr("data");
    console.log("User chose :" + $(this).attr("data"));

    if (userChoice === questObjFocus.answer) {
        console.log("User is correct!");
        // Update the correct selection variable
        gotCorrect = true;
        wins++;
    } else {
        console.log("User is wrong...");
        console.log("the correct answer is: " + questObjFocus.answer);
    }

    // Run the display answer function
    displayAnswer();


    setTimeout(function () {
        // Iterate to next quesiton
        questionNum++;

        // Check if game is over IF question Num has reached all questions
        if (questionNum === questionArr.length) {
            console.log("game over");
            displayResults();
        } else {
            // Game isnt over - starting up new question
            console.log("starting new question!");
            nextQuestion(questionArr[questionNum]);
        }
    }, 5000);
    // // Iterate to next quesiton
    // questionNum++;

    // // Check if game is over IF question Num has reached all questions
    // if (questionNum === questionArr.length) {
    //     console.log("game over");
    // } else {
    //     // Game isnt over - starting up new question
    //     console.log("starting new question!");
    //     nextQuestion(questionArr[questionNum]);
    // }
}

function startGame() {
    // Function to scramble the questions
    scrambleQuestions();

    // Create for loop that will run through each question
    nextQuestion(questionArr[questionNum]);
}

// function to display the correct answer or whether or not the user got it correct
// Parameter: boolean variable that says whether or not the user chose correct answer
function displayAnswer() {
    // First empty the Question/Answer containers
    $("#question-container").empty();
    $("#answer-container").empty();

    var correctDiv = $("<div>");
    var correctImage = $("<img>");

    // If user gets answer correct, display that in the title and show a gif in the answer box
    if (gotCorrect) {
        correctDiv.html("<h2>Correct! The correct answer is: " + questObjFocus.answer + "<h2>");

    } else {
        //if answer is incorrect, report so, give real answer 
        correctDiv.html("<h2>Incorrect... The correct answer is: " + questObjFocus.answer + "<h2>");
    }
    // display Gif in Answer container 
    correctImage.attr("src", questObjFocus.imgSrc);

    // Append these to the DOM (Q for Text and A for image)
    $("#question-container").append(correctDiv);
    $("#answer-container").append(correctImage);

    // set gotCorrect Boolean back to false
    gotCorrect = false;
}

// endGame function - display the results based on how many correct answers the user got out of the total amount of questions. 
function displayResults() {
    // First empty the Question/Answer containers
    $("#question-container").empty();
    $("#answer-container").empty();

    var resultAnnounce = $("<div>");
    var finalResults = $("<div>");

    resultAnnounce.html("<h2>Final Score: <h2>");
    finalResults.html("<p><h4>Number of Correct Guesses: " + wins + " </h4></p><p><h4>Number of Losses: " + (questionArr.length - wins) + "</h4></p><p><h4>Final Score: </h4><h1>" + Math.floor((wins / questionArr.length) * 100) + "%</h2></p>");

    // Append these to the DOM (Q for Text and A for image)
    $("#question-container").append(resultAnnounce);
    $("#answer-container").append(finalResults);
}


// ------------------------------
//      Game Set Up:
// -------------------------------

$(document).on("click", ".answer-div", checkSelect);

window.onload = function () {
    // Start and Stop event handlers
    // $("#stop").on("click", stop);
    $("#reset").on("click", reset);
    // $("#start").on("click", startGame);
    $("#start").on("click", function () {
        if (startBtnPressed === false) {
            // indicate that the game has started and start button cannot be pressed until game over. 
            startBtnPressed = true;

            // Start up a new game
            startGame();
        } else {
            console.log("Game has already been started!");
        }
    });
};
