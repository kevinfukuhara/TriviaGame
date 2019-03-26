// Create Variables to store questions and answers
var q1 = {
    question: "What year was Youtube created?",
    answer: "2005",
    ansArr: ["2002", "2004", "2005", "2007"]
}
var q2 = {
    question: "What was the name of the first video uploaded to Youtube?",
    answer: "Me at the zoo",
    ansArr: ["Me at the zoo", "Chocolate Rain", "numa numa", "Charlie bit me"]
}
var q3 = {
    question: "What company bought Youtube in 2009?",
    answer: "Google",
    ansArr: ["Alphbet", "Google", "Microsoft", "It was never bought..."]
}
var q4 = {
    question: "What was the name of the first video uploaded to Youtube?",
    answer: "Me at the zoo",
    ansArr: ["Me at the zoo", "Chocolate Rain", "numa numa", "Charlie bit me"]
}
var q5 = {
    question: "What is the name of the most viewed video on Youtube?",
    answer: "PSY - Gangnam Style",
    ansArr: ["Taylor Swift – Shake it Off", "Maroon 5 – Sugar", "Justin Bieber – Sorry", "PSY - Gangnam Style"]
}
var q6 = {
    question: "What is Business Insider's 2018 valuation of Youtube?",
    answer: "$160 Billion",
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
    
    if(counter === 0) {
        console.log("counter reached 0!");
        stop();
    }
    console.log(counter);
    // Use the variable you just created to show the converted time in the "display" div.
    $("#shot-clock").text(counter);
}
function reset() {
    // Resettting the WHOLE GAME
    console.log("User reset the game!");
}

// Function to create Question and Answers:
// parameter: QA = Question/Answers
function nextQuestion(QA) {
    // Clear contents of the Question and Answers divs.
    $("#question-container").empty();
    $("#answer-container").empty();

    // Fill in the Question 
    console.log("Creating a new Question to be displayed on the screen");

    $("#question-container").html("<div id='question'><h2>" + QA.question + "</h2></div>");

    for(i=0; i < QA.ansArr.length; i++) {
        var ansDiv = $("<div>");
        ansDiv.addClass("answer-div");
        ansDiv.attr("data", QA.ansArr[i]);

        ansDiv.html("<h4>" + QA.ansArr[i] + "</h4>");

        $("answer-container").append(ansDiv);
    }

    // Start the 30 sec timer
    start;
}

// Function to handle checking User selected answer
function checkSelect(){
    console.log("Checking answer...");
}



// ------------------------------
//      Game Set Up:
// -------------------------------

$(document).on("click", ".answer-div", checkSelect);

window.onload = function () {
    // Function to scramble the questions
    scrambleQuestions();

    // Start and Stop event handlers
    $("#stop").on("click", stop);
    $("#reset").on("click", reset);
    $("#start").on("click", start);
};
