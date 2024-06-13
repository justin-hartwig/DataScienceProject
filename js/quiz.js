import QuizQuestion from './classes/quizQuestion';
import { disposableIncomeMean } from './chartDisplay';

let question1;

export function initializeQuiz() {
    question1 = new QuizQuestion("quiz-question-1", "quizQuestion1Answer2", "Richtige Antwort! Das verfügbare Einkommen pro Kopf in Deutschland liegt bei 23.667€.", "disposable-income-mean", disposableIncomeMean);
    question1.initializeQuestion();
}