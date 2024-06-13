import QuizQuestion from './classes/quizQuestion';
import { disposableIncomeMean, rentalPricesStatesMedian } from './chartDisplay';

let question1;
let question2;

export function initializeQuiz() {
    question1 = new QuizQuestion("quiz-question-1", "quizQuestion1Answer2", "Richtige Antwort! Das verfügbare Einkommen pro Kopf in Deutschland liegt bei 23.667€.", "disposable-income-mean", disposableIncomeMean);
    question2 = new QuizQuestion("quiz-question-2", "quizQuestion2Answer2", "Richtige Antwort! Text fehlt noch!", "rental-prices-states-median", rentalPricesStatesMedian);
    question1.initializeQuestion();
    question2.initializeQuestion();
}