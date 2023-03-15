var timeisLeft = 100; //need this outside so it can be called everywhere.
var quizFinish = false;

function startQuiz() {
    // Selecting sections, changing Classes for visibility purposes

    var changeMain = document.querySelector('main');
    var quiz = document.getElementById('quiz-Portion');

    changeMain.classList.remove('visible');
    changeMain.classList.add('hidden');

    quiz.classList.remove('hidden');
    quiz.classList.add('visible');

    runQuiz();
}

function runQuiz() {
    
    let timeEl = document.getElementById("time");
    //added timer feature later with a direct call to end of quiz
    timeisLeft = 100; //need to reset incase user is calling the function again
    quizFinish = false; // need to reset this as it restarts function


    let timah = setInterval(function() {
        timeisLeft--; 
        if (timeisLeft > 1){
            timeEl.innerHTML = "Time: " + timeisLeft + " seconds";
        }
        else if (timeisLeft === 1){
            timeEl.innerHTML = "Time: " + timeisLeft + " second";
        }
        else if (timeisLeft === 0) { //i want to be precise here. no else statements
            clearInterval(timah);
            displayFinish(); //skips straight to end
        }

         if (quizFinish){
            clearInterval(timah);
        }
       
    }, 1000);
    
    
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


    // this will choose what is correct and incorrect in button
    // var correctMessage = document.querySelector(".correct");
    // var incorrectMessage = document.querySelector(".incorrect");

    var questionIdx = 0;
    displayQuestion();

    // function primary purpose is to take the indexed current question to display that question on the quiz portion of the page.

    function displayQuestion() {

        if (questionIdx < 6){
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
            var isCorrect = selectedAnswer === correctButton;


            //checks if correct and presents correct or incorrect
            if (isCorrect) {
                selectedAnswer.classList.add("correct");
                document.getElementById("right").classList.remove("hidden");
                document.getElementById("wrong").classList.add("hidden");
            } else {
                selectedAnswer.classList.add("incorrect");
                correctButton.classList.add("correct");
                document.getElementById("wrong").classList.remove("hidden");
                document.getElementById("right").classList.add("hidden");
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
            }, 1000);

            //this resets the answers and avoids the user from clicking on multiple answers within a single question
            answer1.removeEventListener("click", checkAnswer);
            answer2.removeEventListener("click", checkAnswer);
            answer3.removeEventListener("click", checkAnswer);
            answer4.removeEventListener("click", checkAnswer);

            // Here we call the next function outside of runQuiz() when we are done presenting questions.

            setTimeout(displayQuestion, 1000); // wait for 1.5 seconds before displaying the next question 

            
            }

        }

    }

function displayFinish() {
    var takeScore = document.getElementById('take-score');
    var quiz = document.getElementById('quiz-Portion');

    quiz.classList.remove('visible');
    quiz.classList.add('hidden');

    takeScore.classList.remove('hidden');
    takeScore.classList.add('visible');
}


const startButton = document.getElementById("start");
startButton.addEventListener("click", startQuiz);




// WHAT I NEED:
// 1) Timed score needs to display on the final display as a score.
// 2) We need to figure out how to clear the table and add scores.
// 3) We need to figure out how to sort the scores, and keep them in the local storage