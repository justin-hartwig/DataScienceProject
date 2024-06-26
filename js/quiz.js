import QuizQuestion from './classes/quizQuestion';
import { disposableIncomeMean, rentalPricesStatesMedian, correlationAgeAveragePopulationDesity, bavariaIncomePrognoses } from './chartDisplay';

let question1;
let question2;
let question3;
let question4;
const questionNumber = 4;
let correctlyAnsweredQuestions = 0;
let quizResultAnswersElement;
let quizResultAnswersTotalElement;
let quizResultAnswerTextElement;
let quizResultElement;
let confettiElement;

export function initializeQuiz() {
    question1 = new QuizQuestion("quiz-question-1", "quizQuestion1Answer2", "Richtige Antwort! Das durchschnittliche verfügbare Einkommen pro Kopf in Deutschland im Jahr 2021 beträgt 23.667€.", "disposable-income-mean", disposableIncomeMean);
    question2 = new QuizQuestion("quiz-question-2", "quizQuestion2Answer2", "Richtige Antwort! Text fehlt noch!", "rental-prices-states-median", rentalPricesStatesMedian);
    question3 = new QuizQuestion("quiz-question-3", "quizQuestion3Answer1", `Richtige Antwort! Es besteht ein Zusammenhang zwischen dem Altersdurchschnitt und der Bevölkerungsdichte. In dem Scatterplot ist deutlich eine negative Korrelation mit dem Wert -0,68 zwischen den Variablen zu erkennen.
Dies bedeutet, dass mit zunehmendem Durchschnittsalter die Bevölkerungsdichte tendenziell abnimmt.
`, "rental-prices-states-median", correlationAgeAveragePopulationDesity);
    question4 = new QuizQuestion("quiz-question-4", "quizQuestion4Answer3", "Richtige Antwort! Für 2024 kann in Bayern ein verfügbares Einkommen pro Kopf von 28.779€ prognostiziert werden.", "bavaria-income-prognoses", bavariaIncomePrognoses);
    question1.initializeQuestion();
    question2.initializeQuestion();
    question3.initializeQuestion();
    question4.initializeQuestion();

    quizResultAnswersElement = document.getElementById("quiz-result-answers");
    quizResultAnswersTotalElement = document.getElementById("quiz-result-answers-total");
    quizResultAnswerTextElement = document.getElementById("quiz-result-answer-text");
    quizResultElement = document.querySelector(".quiz-result");
    confettiElement = document.getElementById("confetti");

    updateQuizResult();
}

export function updateQuizResult() {
    if (correctlyAnsweredQuestions == 0) {
        quizResultAnswerTextElement.textContent = "Klicke auf die eine der Antwortmöglichkeiten um das Quiz zu starten."
        quizResultAnswerTextElement.className = "quiz-answerd-default";
    } else if (correctlyAnsweredQuestions == questionNumber) {
        quizResultAnswerTextElement.textContent = "Super! Du hast alle Fragen richtig beantwortet."
        quizResultAnswerTextElement.className = "quiz-answerd-correct";
        quizResultElement.classList.add("quiz-result-correct");
    } else {
        quizResultAnswerTextElement.textContent = "Weiter so! Du hast es fast geschafft."
        quizResultAnswerTextElement.className = "quiz-answerd-go-on";
    }

    quizResultAnswersElement.textContent = correctlyAnsweredQuestions;
    quizResultAnswersTotalElement.textContent = questionNumber;
}

export function questionAnsweredCorrectly() {
    correctlyAnsweredQuestions++;
}