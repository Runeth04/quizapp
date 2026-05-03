import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function QuizResults() {
  const { quizId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    const res = await fetch(`http://localhost:8080/results/${quizId}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>

      {results.length === 0 && <p>No results yet</p>}

      {results.map((r, index) => (
        <div key={index} className="border p-3 mb-2 rounded">
          <p className="font-semibold">{r.studentName}</p>
          <p>{r.score}/{r.total}</p>
        </div>
      ))}
    </div>
  );
}

export default QuizResults;