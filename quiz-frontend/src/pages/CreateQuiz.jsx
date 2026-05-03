import { useState } from "react";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: "",
      options: ["", "", "", ""],
      correctAnswerIndex: 0,
    },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        questionText: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0,
      },
    ]);
  };

  const submitQuiz = async () => {
    if (!title || !teacherName) {
      alert("Fill all fields");
      return;
    }

    const res = await fetch("http://localhost:8080/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        teacherName,
        questions,
      }),
    });

    const data = await res.json();
    alert("Quiz created successfully!");

    console.log(data);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Teacher Name"
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
      />

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-4 border p-3 rounded">
          <input
            className="border p-2 w-full mb-2"
            placeholder="Question"
            value={q.questionText}
            onChange={(e) =>
              handleQuestionChange(qIndex, "questionText", e.target.value)
            }
          />

          {q.options.map((opt, i) => (
            <input
              key={i}
              className="border p-2 w-full mb-1"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) =>
                handleOptionChange(qIndex, i, e.target.value)
              }
            />
          ))}

          <select
            className="border p-2 w-full"
            value={q.correctAnswerIndex}
            onChange={(e) =>
              handleQuestionChange(qIndex, "correctAnswerIndex", parseInt(e.target.value))
            }
          >
            <option value={0}>Correct: Option 1</option>
            <option value={1}>Correct: Option 2</option>
            <option value={2}>Correct: Option 3</option>
            <option value={3}>Correct: Option 4</option>
          </select>
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Add Question
      </button>

      <button
        onClick={submitQuiz}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Create Quiz
      </button>
    </div>
  );
}

export default CreateQuiz;