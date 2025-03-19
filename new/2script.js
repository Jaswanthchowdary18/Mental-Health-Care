const questions = [
    {
        question: "How do you usually cope with stress?",
        type: "textarea"
    },
    {
        question: "Do you feel sad, down, or hopeless more often than usual?",
        type: "yesno"
    },
    {
        question: "Which of the following best describes your mood?",
        type: "mcq",
        options: ["Stable", "Frequent mood swings", "Consistently low", "Consistently high"]
    },
    {
        question: "Have you experienced panic attacks? If yes, what symptoms do you notice?",
        type: "textarea"
    },
    {
        question: "I feel ______ when discussing traumatic experiences.",
        type: "blank"
    },
    {
        question: "Do you avoid certain places or situations because they make you anxious?",
        type: "yesno"
    },
    {
        question: "Select all that apply:",
        type: "mcq",
        options: ["Trouble concentrating", "Difficulty making decisions", "Sleep disturbances", "Appetite changes"],
        multiple: true
    },
    {
        question: "Do you use alcohol, drugs, or other substances to cope with your emotions?",
        type: "yesno"
    },
    {
        question: "How do you express your anger or frustration?",
        type: "textarea"
    },
    {
        question: "Have you lost interest in activities that used to bring you joy?",
        type: "yesno"
    },
    {
        question: "Do you feel worthless or guilty about things you cannot control?",
        type: "yesno"
    },
    {
        question: "Have you had thoughts of harming yourself or ending your life?",
        type: "yesno"
    }
];

let currentQuestion = 0;
const questionElement = document.getElementById('question');
const inputContainer = document.getElementById('inputContainer');
const nextButton = document.getElementById('nextBtn');
const questionNumberElement = document.getElementById('questionNumber');

function displayQuestion() {
    const questionData = questions[currentQuestion];
    questionElement.textContent = questionData.question;
    questionNumberElement.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    inputContainer.innerHTML = '';

    if (questionData.type === "textarea") {
        inputContainer.innerHTML = `<textarea id="answer" rows="4"></textarea>`;
        document.getElementById('answer').focus();
    } else if (questionData.type === "yesno") {
        inputContainer.innerHTML = `
            <div class="options">
                <button onclick="nextQuestion('yes')">YES</button>
                <button onclick="nextQuestion('no')">NO</button>
            </div>
        `;
    } else if (questionData.type === "mcq") {
        let optionsHtml = '<div class="options">';
        questionData.options.forEach(option => {
            optionsHtml += `<button onclick="nextQuestion('${option}')">${option}</button>`;
        });
        optionsHtml += '</div>';
        inputContainer.innerHTML = optionsHtml;
    } else if (questionData.type === "blank") {
        inputContainer.innerHTML = `<input type="text" id="answer">`;
        document.getElementById('answer').focus();
    }
}

function nextQuestion(answer) {
    console.log(`Question ${currentQuestion + 1} Answer:`, answer);

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        alert("Assessment Completed!");
        console.log("Assessment completed");

        // Redirect to 3index.html inside the BOT folder
        window.location.href = "BOT/3index.html";  
    }
}

nextButton.addEventListener('click', () => {
    if (questions[currentQuestion].type === "textarea" || questions[currentQuestion].type === "blank") {
        nextQuestion(document.getElementById('answer').value);
    } else {
        nextQuestion(""); // Proceed if it's a button-based question
    }
});

// Add event listener for Enter key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (questions[currentQuestion].type === "textarea" || questions[currentQuestion].type === "blank") {
            nextQuestion(document.getElementById('answer').value);
        }
    }
});

displayQuestion();

function nextQuestion(answer) {
    console.log(`Question ${currentQuestion + 1} Answer:`, answer);

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        alert("Assessment Completed!");
        console.log("Assessment completed");

        // Corrected path to go up one directory from "new/" to access "BOT/3index.html"
        window.location.href = "../BOT/3index.html";  
    }
}

