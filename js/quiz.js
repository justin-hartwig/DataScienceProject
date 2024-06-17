import QuizQuestion from './classes/quizQuestion';
import { disposableIncomeMean, rentalPricesStatesMedian, correlationAgeAveragePopulationDesity } from './chartDisplay';

let question1;
let question2;
let question3;

export function initializeQuiz() {
    question1 = new QuizQuestion("quiz-question-1", "quizQuestion1Answer2", "Richtige Antwort! Das durchschnittliche verfügbare Einkommen pro Kopf in Deutschland im Jahr 2021 beträgt 23.667€.", "disposable-income-mean", disposableIncomeMean);
    question2 = new QuizQuestion("quiz-question-2", "quizQuestion2Answer2", "Richtige Antwort! Text fehlt noch!", "rental-prices-states-median", rentalPricesStatesMedian);
    question3 = new QuizQuestion("quiz-question-3", "quizQuestion3Answer1", `Richtige Antwort! Es besteht ein Zusammenhang zwischen dem Altersdurchschnitt und der Bevölkerungsdichte. In der unten stehenden Scatterplot ist deutlich eine negative Korrelation mit dem Wert -0,68 zwischen den Variablen zu erkennen.
Dies bedeutet, dass mit zunehmendem Durchschnittsalter die Bevölkerungsdichte tendenziell abnimmt.
`, "rental-prices-states-median", correlationAgeAveragePopulationDesity);
    question1.initializeQuestion();
    question2.initializeQuestion();
    question3.initializeQuestion();
}