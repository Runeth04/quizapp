import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    const res = await fetch(`http://localhost:8080/quiz`);
    const data = await res.json();

    const found = data.find((q) => q.id === id);
    setQuiz(found);
  };

  const handleChange = (field, value) => {
    setQuiz({ ...quiz, [field]: value });
  };

  const saveQuiz = async () => {
    try {
      const res = await fetch(`http://localhost:8080/quiz/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      });

      if (!res.ok) {
        console.error("Update failed", res.status);
        alert("Update failed. Check backend.");
        return;
      }

      const updated = await res.json();
      console.log("Updated quiz:", updated);

      alert("Quiz updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating quiz:", err);
      alert("Something went wrong");
    }
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>

      {/* Title */}
      <input
        className="border p-2 w-full mb-3"
        value={quiz.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      {/* Teacher */}
      <input
        className="border p-2 w-full mb-3"
        value={quiz.teacherName}
        onChange={(e) => handleChange("teacherName", e.target.value)}
      />

      {/* Questions */}
      {quiz.questions.map((q, index) => (
        <div key={q.id} className="border p-3 mb-3 rounded">
          <input
            className="border p-2 w-full mb-2"
            value={q.questionText}
            onChange={(e) => {
              const updated = [...quiz.questions];
              updated[index].questionText = e.target.value;
              setQuiz({ ...quiz, questions: updated });
            }}
          />

          {q.options.map((opt, i) => (
            <input
              key={i}
              className="border p-2 w-full mb-1"
              value={opt}
              onChange={(e) => {
                const updated = [...quiz.questions];
                updated[index].options[i] = e.target.value;
                setQuiz({ ...quiz, questions: updated });
              }}
            />
          ))}
        </div>
      ))}

      {/* Save */}
      <button
        onClick={saveQuiz}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}

export default EditQuiz;