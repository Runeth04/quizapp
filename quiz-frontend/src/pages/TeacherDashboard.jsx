import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    const res = await fetch("http://localhost:8080/quiz");
    const data = await res.json();
    setQuizzes(data);
  };

  const handleDelete = async (id) => {
    const ok = confirm("Delete this quiz?");
    if (!ok) return;

    await fetch(`http://localhost:8080/quiz/${id}`, {
      method: "DELETE",
    });

    loadQuizzes();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>

          <button
            onClick={() => navigate("/create")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Create Quiz
          </button>
        </div>

        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white p-5 mb-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{quiz.title}</h2>

            <p className="text-sm text-gray-500 mb-3">
              Created by {quiz.teacherName}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/results/${quiz.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Results
              </button>

              <button
                onClick={() => navigate(`/edit/${quiz.id}`)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(quiz.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherDashboard;