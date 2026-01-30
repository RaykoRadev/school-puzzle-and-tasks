export default function useTracker() {
    const visitedSubject = async (subjectName) => {
        // todo hs to make a link for that request in the server to update the object with subjectName and number of visits in FeatureUsige in DB
    };

    return { visitedSubject };
}

function QuizComponent() {
    const { logFeature } = useTracker();

    const startQuiz = () => {
        logFeature("Math_Quiz_Start");
    };

    return <button onClick={startQuiz}>Start Quiz</button>;
}
