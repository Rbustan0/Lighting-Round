function startQuiz(){
    // Selecting sections, changing Classes for visibility purposes
    
    var changeMain = document.querySelector('main');
    var quiz = document.getElementById('quiz-Portion');

    changeMain.classList.remove('visible');
    changeMain.classList.add('hidden');

    quiz.classList.remove('hidden');
    quiz.classList.add('visible');
}

function runQuiz(){
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

    // creating elements for 

}

