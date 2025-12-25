import useRequest from "./useRequester";

export default function useTracker() {
    const {} = useRequest();
    const visitedSubject = async (subjectName) => {
        // todo hs to make a link for that request in the server to update the object with subjectName and number of visits in FeatureUsige in DB
        // example
        // await fetch("/api/students/track-feature", {
        //     method: "POST",
        //     body: JSON.stringify({ featureName }),
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ...`,
        //     },
        // });
    };

    return { visitedSubject };
}

/// implementation is:: to be colled in ..... or when is clicked a button .....
/// example:

function QuizComponent() {
    const { logFeature } = useTracker();

    const startQuiz = () => {
        logFeature("Math_Quiz_Start"); // Tracks usage
        // ... rest of your logic
    };

    return <button onClick={startQuiz}>Start Quiz</button>;
}
