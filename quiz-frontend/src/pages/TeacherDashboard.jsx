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

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

      {quizzes.map((quiz) => (
        <div key={quiz.id} className="border p-3 mb-3 rounded">
          <h2 className="font-semibold">{quiz.title}</h2>
          <p className="text-sm text-gray-500">
            Teacher: {quiz.teacherName}
          </p>

          <button
            onClick={() => navigate(`/results/${quiz.id}`)}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
            View Results
          </button>
        </div>
      ))}
    </div>
  );
}

export default TeacherDashboard;