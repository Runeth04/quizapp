import { Routes, Route } from "react-router-dom";
import QuizResults from "./pages/QuizResults";
import CreateQuiz from "./pages/CreateQuiz";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentPage from "./pages/StudentPage";
import Navbar from "./components/Navbar";
import EditQuiz from "./pages/EditQuiz";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/results/:quizId" element={<QuizResults />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/edit/:id" element={<EditQuiz />} />
      </Routes>
    </div>
  );
}

export default App;