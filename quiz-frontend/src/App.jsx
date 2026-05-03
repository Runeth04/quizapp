import { Routes, Route } from "react-router-dom";
import QuizResults from "./pages/QuizResults";
import CreateQuiz from "./pages/CreateQuiz";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentPage from "./pages/StudentPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TeacherDashboard />} />
      <Route path="/create" element={<CreateQuiz />} />
      <Route path="/results/:quizId" element={<QuizResults />} />
      <Route path="/student" element={<StudentPage />} />
    </Routes>
  );
}

export default App;