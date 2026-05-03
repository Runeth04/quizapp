import { useState } from "react";
import { Link } from "react-router-dom";

function StudentPage() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");

  const loadQuiz = async () => {
    const res = await fetch("http://localhost:8080/quiz");
    const data = await res.json();
    setQuiz(data[0]);
  };

  const handleChange = (qId, value) => {
    setAnswers({
      ...answers,
      [qId]: parseInt(value),
    });
  };

  const submitQuiz = async () => {
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
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <nav className="w-full max-w-xl mb-6 flex justify-between bg-white p-3 rounded shadow">
        <Link to="/" className="text-blue-600 font-semibold">Dashboard</Link>
        <Link to="/create" className="text-blue-600 font-semibold">Create Quiz</Link>
        <Link to="/student" className="text-blue-600 font-semibold">Student</Link>
      </nav>
      <h1 className="text-3xl font-bold mb-6">Student Quiz</h1>

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

          <button
            onClick={submitQuiz}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentPage;