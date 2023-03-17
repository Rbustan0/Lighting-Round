var timeisLeft = 91; //need this outside so it can be called everywhere.
var timeEl = document.getElementById("time");
var quizFinish = false;
var questionIdx = 0;

var tbody = document.getElementById('populate'); //table to be populated


// Making an array of objects for the buttons and prompts:


var questions = [{
    question: "What does HTML stand for?",
    answers: ["HyperText Markup Language", "Hyper Text Marking Language", "Attention-deficit/hyperactivity disorder", "Cannabidiol"],
    correctAnswer: 0
},
{
    question: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "prompts", "numbers"],
    correctAnswer: 2
},
{
    question: "What data type does not exist in JavaScript",
    answers: ["boolean", "dictionaries", "numbers", "arrays"],
    correctAnswer: 1
},
{
    question: "What does isNaN() return",
    answers: ["boolean", "string", "number", "array"],
    correctAnswer: 0
},
{
    question: "Which company developed JavaScript?",
    answers: ["Sun Microsystems Inc", "Charles Schwab", "Mojang Studios", "Netscape"],
    correctAnswer: 3
},
{
    question: "Which keyword declares a block scope local variable?",
    answers: ["var", "let", "const", "function"],
    correctAnswer: 1
}
];



function startQuiz() {
    // Selecting sections, changing Classes for visibility purposes

    var changeMain = document.querySelector('main');
    var quiz = document.getElementById('quiz-Portion');

    changeMain.classList.remove('visible');
    changeMain.classList.add('hidden');

    quiz.classList.remove('hidden');
    quiz.classList.add('visible');

    timeisLeft = 91; //need to reset incase user is calling the function again
    quizFinish = false; // need to reset this as it restarts function
    questionIdx = 0;
    displayQuestion();

    var timah = setInterval(function () {
        timeisLeft--;
        if (timeisLeft > 1) {
            timeEl.innerHTML = "Time: " + timeisLeft + " seconds";
        }
        else if (timeisLeft === 1) {
            timeEl.innerHTML = "Time: " + timeisLeft + " second";
        }
        else if (timeisLeft === 0) { //i want to be precise here. no else statements
            clearInterval(timah);
            displayFinish(); //skips straight to end
        }

        if (quizFinish) {
            clearInterval(timah);
        }

    }, 1000);

}

// function primary purpose is to take the indexed current question to display that question on the quiz portion of the page.

function displayQuestion() {

    if (questionIdx < 6) {
        //sets current index for current question
        var currentQuestion = questions[questionIdx];

        // creating elements for change
        var questionTitle = document.getElementById("question-Title");
        questionTitle.innerText = currentQuestion.question;

        //set answers to current question
        var answer1 = document.getElementById("answer1");
        answer1.innerText = currentQuestion.answers[0];

        var answer2 = document.getElementById("answer2");
        answer2.innerText = currentQuestion.answers[1];

        var answer3 = document.getElementById("answer3");
        answer3.innerText = currentQuestion.answers[2];

        var answer4 = document.getElementById("answer4");
        answer4.innerText = currentQuestion.answers[3];

        //Assign the correct answer to the button with class
        // Note using switch is a lot cleaner here than a loop

        var correctButton;
        switch (currentQuestion.correctAnswer) {
            case 0:
                correctButton = answer1;
                break;
            case 1:
                correctButton = answer2;
                break;
            case 2:
                correctButton = answer3;
                break;
            case 3:
                correctButton = answer4;
                break;

            //checking my own entries and breaking
            default:
                console.error("Invalid correct answer index");
                break;
        }
        correctButton.classList.remove("incorrect");
        correctButton.classList.add("correct");

        answer1.addEventListener("click", checkAnswer);
        answer2.addEventListener("click", checkAnswer);
        answer3.addEventListener("click", checkAnswer);
        answer4.addEventListener("click", checkAnswer);
    }

    // Will move on if done
    else {
        quizFinish = true; //recall earlier condition in our time interval.
        displayFinish();
    }
    function checkAnswer(event) {
        var selectedAnswer = event.target;
        var isCorrect = (selectedAnswer === correctButton); //evals true or false


        //checks if correct and presents correct or incorrect
        if (isCorrect) {
            selectedAnswer.classList.add("correct");
            document.getElementById("right").classList.remove("hidden");
            document.getElementById("wrong").classList.add("hidden"); //incase person was wrong before might be redundant
        } else {
            selectedAnswer.classList.add("incorrect");
            correctButton.classList.add("correct");
            document.getElementById("wrong").classList.remove("hidden");
            document.getElementById("right").classList.add("hidden");

            timeisLeft -= 10;
        }
        // Disable all answer buttons
        answer1.disabled = true;
        answer2.disabled = true;
        answer3.disabled = true;
        answer4.disabled = true;

        // Hide the feedback messages after 1.5 seconds
        setTimeout(function () {
            document.getElementById("wrong").classList.remove("visible");
            document.getElementById("wrong").classList.add("hidden");
            document.getElementById("right").classList.remove("visible");
            document.getElementById("right").classList.add("hidden");
            answer1.disabled = false;
            answer2.disabled = false;
            answer3.disabled = false;
            answer4.disabled = false;
            questionIdx++;
        }, 500);

        //this resets the answers and avoids the user from clicking on multiple answers within a single question
        answer1.removeEventListener("click", checkAnswer);
        answer2.removeEventListener("click", checkAnswer);
        answer3.removeEventListener("click", checkAnswer);
        answer4.removeEventListener("click", checkAnswer);

        // Here we call the next function outside of runQuiz() when we are done presenting questions.

        setTimeout(displayQuestion, 500); // wait for .5 seconds before displaying the next question 


    }

}



function displayFinish() {
    // Grab the necessary elements
    var takeScore = document.getElementById('take-score');
    var quiz = document.getElementById('quiz-Portion');
    var timestop = document.getElementById('score');
    var initialInputs = document.getElementById('initial');
    var submission = document.getElementById('submit');

    // Display the completion screen
    timestop.innerHTML = 'Your score is ' + timeisLeft;

    // Hide the quiz portion and show the input for name and score
    quiz.classList.remove('visible');
    quiz.classList.add('hidden');
    takeScore.classList.remove('hidden');
    takeScore.classList.add('visible');




    // Add event listener to the submit button
    submission.addEventListener('click', function () {

        var initial = initialInputs.value.trim();

        if (initial !== '' && initial !== null) {

        localStorage.setItem('initials', initial);
        

        // Save the score to local storage
        var scores = localStorage.setItem('score', timeisLeft);

        // Get the scores array from local storage
        
           var scoresArray = JSON.parse(localStorage.getItem(scores)) || [];
            scoresArray.push({ name: initial, score: timeisLeft });
            localStorage.setItem('scores', JSON.stringify(scoresArray));
          
        }

        // Display the high scores table
        displayHighscore();


    });
}

function displayHighscore() {
    //this changes view when user goes straight to highscore:
    var scoresArray = JSON.parse(localStorage.getItem('scores'));
    var headdis = document.querySelector('header');
    var maindis = document.querySelector('main');


    headdis.classList.remove('visible');
    headdis.classList.add('hidden');

    maindis.classList.remove('visible');
    maindis.classList.add('hidden');

    //this changes view when user is going from quiz to score
    var takeScore = document.getElementById('take-score');
    var table = document.getElementById('score-data');

    takeScore.classList.remove('visible');
    takeScore.classList.add('hidden');

    table.classList.remove('hidden');
    table.classList.add('visible');


    // Clear the table body and repopulate it with the updated scores
    tbody.innerHTML = '';
    for (var i = 0; i < scoresArray.length; i++) {
        var tr = document.createElement('tr');
        var tdName = document.createElement('td');
        var tdScore = document.createElement('td');
        tdName.innerText = scoresArray[i].name;
        tdScore.innerText = scoresArray[i].score;
        tr.appendChild(tdName);
        tr.appendChild(tdScore);
        tbody.appendChild(tr);
    }

}


//content i need outside in order to make other calls.

const startButton = document.getElementById("start");
startButton.addEventListener("click", startQuiz);




const scoreTable = document.getElementById('score-table');





const reset = document.getElementById('reset-score');
reset.addEventListener("click", function () {
    var storage = localStorage.getItem('scores');
    storage = [];
    localStorage.setItem('scores', storage);
    displayHighscore();
})






// restarts and calls other functions again.
const restart = document.getElementById('retake-quiz');
restart.addEventListener("click", function () {

    location.reload();

});







// WHAT I NEED RIGHT NOW:

// 3) show and save that info.
// 4) in html/css: create a button to restart the quiz
//      (a) call back and rerun program.
// 4) in html/css: Add a link that calls highscores.
//      (a) calls end immediately. (WILL need ot modify the call function for call highscore)
//  5) restart button.