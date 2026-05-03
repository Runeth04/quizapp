import { useState } from "react";

function App() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");

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
    <div style={{ padding: "20px" }}>
      <h1>Quiz App</h1>

      <button onClick={loadQuiz}>Load Quiz</button>

      {quiz && (
        <div>
          <h2>{quiz.title}</h2>

          {quiz.questions.map((q) => (
            <div key={q.id}>
              <p>{q.questionText}</p>

              {q.options.map((opt, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    name={q.id}
                    value={i}
                    onChange={(e) =>
                      handleChange(q.id, e.target.value)
                    }
                  />
                  {opt}
                </div>
              ))}
            </div>
          ))}

          <br />
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br /><br />

          <button onClick={submitQuiz}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default App;