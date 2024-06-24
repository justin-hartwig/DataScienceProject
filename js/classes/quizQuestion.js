import { revealChart } from './chart';
import { updateQuizResult, questionAnsweredCorrectly } from '../quiz';

export default class QuizQuestion {
    constructor(questionId, correctAnswer, answerText, chartId, chartObject) {
        this._questionId = questionId;
        this._correctAnswer = correctAnswer;
        this._answerText = answerText;
        this._chartId = chartId;
        this._chartObject = chartObject;
        this._questionElement;
        this._radioButtons;
        this._chartElement;
        this._answerElement;
        this._wrongAnswerText = "Falsche Antwort! Versuch es noch einmal.";
        this._asweredCorrectly = false;
    }

    get questionId() {
        return this._questionId;
    }

    get correctAnswer() {
        return this._correctAnswer;
    }

    get answerText() {
        return this._answerText;
    }

    get chartId() {
        return this._answerText;
    }

    get chartObject() {
        return this._chartObject;
    }

    initializeQuestion() {
        this._questionElement = document.getElementById(this._questionId);
        this._radioButtons = this._questionElement.querySelectorAll(".form-check-input");
        this._chartElement = document.getElementById(this._chartId);
        this._answerElement = this._questionElement.querySelector(".quiz-question-result");

        this._radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                this.evaluateAnswer(radio);
            });
        });
    }

    evaluateAnswer(selectedRadio) {
        if (!this._asweredCorrectly) {
            // Clear any existing answer text
            this._answerElement.innerHTML = '';

            const spanElement = document.createElement('span');

            const selectedAnswerId = selectedRadio.id;
            if (selectedAnswerId === this._correctAnswer) {
                spanElement.className = 'quiz-right-answer';
                spanElement.textContent = this._answerText;
                this._chartObject.revealChart();
                this._asweredCorrectly = true;
                questionAnsweredCorrectly();
            } else {
                spanElement.className = 'quiz-wrong-answer';
                spanElement.textContent = this._wrongAnswerText;
            }

            this._answerElement.appendChild(spanElement);
            updateQuizResult();
        }
    }
}