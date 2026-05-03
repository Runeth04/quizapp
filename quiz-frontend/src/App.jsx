import { useState } from "react";

function App() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");

  const [leaderboard, setLeaderboard] = useState([]);

  const loadQuiz = async () => {
    const res = await fetch("http://localhost:8080/quiz");
    const data = await res.json();
    setQuiz(data[0]); // take first quiz
  };

  const handleChange = (qId, value) => {
    setAnswers({
      ...answers,
      [qId]: parseInt(value),
    });
  };

  const submitQuiz = async () => {
    // ✅ Validate name
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    // ✅ Validate all questions answered
    if (!quiz || Object.keys(answers).length !== quiz.questions.length) {
      alert("Please answer all questions");
      return;
    }

    const res = await fetch("http://localhost:8080/quiz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentName: name,
        quizId: quiz.id,
        answers: answers,
      }),
    });

    const data = await res.json();
    alert(`Score: ${data.score}/${data.total}`);

    loadLeaderboard();
  };

  const loadLeaderboard = async () => {
    const res = await fetch("http://localhost:8080/quiz/results");
    const data = await res.json();
    setLeaderboard(data);
  };

  return (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
    <h1 className="text-3xl font-bold mb-6">Quiz App</h1>

    <button
      onClick={loadQuiz}
      className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
    >
      Load Quiz
    </button>

    {quiz && (
      <div className="bg-white p-6 rounded shadow w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">{quiz.title}</h2>

        {quiz.questions.map((q) => (
          <div key={q.id} className="mb-4">
            <p className="font-medium">{q.questionText}</p>

            {q.options.map((opt, i) => (
              <label key={i} className="block cursor-pointer">
                <input
                  type="radio"
                  name={q.id}
                  value={i}
                  onChange={(e) =>
                    handleChange(q.id, e.target.value)
                  }
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        ))}

        <input
          className="border p-2 w-full mb-4 rounded"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={submitQuiz}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>

          <button
            onClick={loadLeaderboard}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Leaderboard
          </button>
        </div>
      </div>
    )}

    {leaderboard.length > 0 && (
      <div className="mt-6 bg-white p-6 rounded shadow w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>

        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className="flex justify-between border-b py-2"
          >
            <span>{entry.rank}. {entry.studentName}</span>
            <span>{entry.score}/{entry.total}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default App;