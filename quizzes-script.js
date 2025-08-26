const allQuizzes = {
    "java": {
        title: "Java Quiz",
        questions: [
            { question: "What is a correct syntax to output 'Hello World' in Java?", options: ["System.out.println('Hello World');", "Console.log('Hello World');", "print('Hello World');", "cout << 'Hello World';"], correctAnswer: "System.out.println('Hello World');" },
            { question: "How do you insert comments in Java code?", options: ["# This is a comment", "// This is a comment", "", "/* This is a comment"], correctAnswer: "// This is a comment" },
            { question: "Which data type is used to create a variable that should store text?", options: ["String", "txt", "string", "Char"], correctAnswer: "String" }
        ]
    },
    "python": {
        title: "Python Quiz",
        questions: [
            { question: "What is the correct file extension for Python files?", options: [".pyt", ".py", ".pt", ".python"], correctAnswer: ".py" },
            { question: "How do you create a variable with the value 5?", options: ["x = 5", "x == 5", "x = '5'", "x = (5)"], correctAnswer: "x = 5" },
            { question: "What is the correct syntax for a function named 'my_function'?", options: ["function my_function()", "def my_function()", "my_function()"], correctAnswer: "def my_function()" }
        ]
    },
    "cpp": {
        title: "C++ Quiz",
        questions: [
            { question: "Which header file is used for standard input/output operations?", options: ["<iostream>", "<string>", "<vector>", "<algorithm>"], correctAnswer: "<iostream>" },
            { question: "What is the correct syntax for an if statement?", options: ["if (x > 5)", "if x > 5", "if x > 5 then", "if (x > 5) then"], correctAnswer: "if (x > 5)" },
            { question: "How do you declare a variable 'x' of type integer?", options: ["var x int;", "int x;", "x as int;", "declare int x;"], correctAnswer: "int x;" }
        ]
    },
    "html_css": {
        title: "HTML & CSS Quiz",
        questions: [
            { question: "Which HTML tag is used to define an internal style sheet?", options: ["<style>", "<script>", "<css>", "<link>"], correctAnswer: "<style>" },
            { question: "Which CSS property is used to change the background color?", options: ["color", "bgcolor", "background-color", "background"], correctAnswer: "background-color" },
            { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], correctAnswer: "Hyper Text Markup Language" }
        ]
    },
    "javascript": {
        title: "JavaScript Quiz",
        questions: [
            { question: "How do you write 'Hello World' in an alert box?", options: ["alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');", "display.alert('Hello World');"], correctAnswer: "alert('Hello World');" },
            { question: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction()", "call.myFunction()", "invoke myFunction()"], correctAnswer: "myFunction()" },
            { question: "What is the correct way to write a JavaScript array?", options: ["var colors = ['red', 'green', 'blue']", "var colors = {'red', 'green', 'blue'}", "var colors = ('red', 'green', 'blue')"], correctAnswer: "var colors = ['red', 'green', 'blue']" }
        ]
    },
    "web_tech": {
        title: "Web Technologies Quiz",
        questions: [
            { question: "What is the full form of API?", options: ["Application Programming Interface", "Application Protocol Interface", "Apple Programming Interface", "Advanced Protocol Interface"], correctAnswer: "Application Programming Interface" },
            { question: "What is the purpose of AJAX?", options: ["To make websites faster", "To asynchronously update web pages", "To create animations", "To manage databases"], correctAnswer: "To asynchronously update web pages" },
            { question: "What is a server?", options: ["A computer that provides data to other computers", "A program used to browse the internet", "A type of database", "A website builder"], correctAnswer: "A computer that provides data to other computers" }
        ]
    },
    "os": {
        title: "Operating Systems Quiz",
        questions: [
            { question: "What is the main purpose of an Operating System?", options: ["To run applications", "To manage computer hardware and software resources", "To connect to the internet", "To edit documents"], correctAnswer: "To manage computer hardware and software resources" },
            { question: "What is a process in an operating system?", options: ["A file", "A running program", "A hardware component", "A user account"], correctAnswer: "A running program" },
            { question: "Which of the following is an example of an OS?", options: ["Microsoft Word", "Google Chrome", "Linux", "Adobe Photoshop"], correctAnswer: "Linux" }
        ]
    },
    "ds": {
        title: "Data Structures Quiz",
        questions: [
            { question: "What is a stack?", options: ["First-In, First-Out (FIFO) data structure", "Last-In, First-Out (LIFO) data structure", "A type of sorting algorithm", "A hardware component"], correctAnswer: "Last-In, First-Out (LIFO) data structure" },
            { question: "Which data structure uses pointers to connect nodes?", options: ["Array", "Stack", "Queue", "Linked List"], correctAnswer: "Linked List" },
            { question: "What is the time complexity for inserting an element at the end of an array?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correctAnswer: "O(n)" }
        ]
    },
    "dbms": {
        title: "Database Management System Quiz",
        questions: [
            { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Structured Question Language", "System Query Language"], correctAnswer: "Structured Query Language" },
            { question: "Which command is used to retrieve data from a database?", options: ["GET", "SELECT", "RETRIEVE", "FIND"], correctAnswer: "SELECT" },
            { question: "What is a primary key?", options: ["A key that uniquely identifies a record in a table", "A key that links to another table", "A key that sorts the data", "A key that encrypts the data"], correctAnswer: "A key that uniquely identifies a record in a table" }
        ]
    }
};

let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

const quizListSection = document.getElementById('quiz-list-section');
const quizContainer = document.getElementById('quiz-container');
const quizTitle = document.getElementById('quiz-title');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
const resultHeading = document.getElementById('result-heading');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');
const backToListBtn = document.getElementById('back-to-list-btn');

document.querySelectorAll('.list a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const quizKey = e.target.dataset.quiz;
        loadQuiz(quizKey);
    });
});

function loadQuiz(quizKey) {
    const quizData = allQuizzes[quizKey];
    if (!quizData) return;

    currentQuizQuestions = quizData.questions;
    quizTitle.textContent = quizData.title;
    currentQuestionIndex = 0;
    score = 0;
    
    quizListSection.style.display = 'none';
    quizContainer.style.display = 'block';
    
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    selectedOption = null;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => {
            selectOption(button, option);
        });
        optionsContainer.appendChild(button);
    });

    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';

    if (currentQuestionIndex === currentQuizQuestions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    }
}

function selectOption(button, option) {
    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }
    selectedOption = button;
    selectedOption.classList.add('selected');

    if (option === currentQuizQuestions[currentQuestionIndex].correctAnswer) {
        score++;
    }
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    resultContainer.style.display = 'block';
    
    resultHeading.textContent = "Quiz Completed!";
    scoreText.textContent = `Your final score is: ${score} out of ${currentQuizQuestions.length}`;
}

function nextQuestion() {
    if (selectedOption === null) {
        alert("Please select an option!");
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz').style.display = 'block';
    resultContainer.style.display = 'none';
    loadQuestion();
}

function showQuizList() {
    quizContainer.style.display = 'none';
    quizListSection.style.display = 'flex';
}

nextBtn.addEventListener('click', nextQuestion);
submitBtn.addEventListener('click', showResult);
restartBtn.addEventListener('click', restartQuiz);
backToListBtn.addEventListener('click', showQuizList);