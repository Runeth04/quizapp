package com.quizapp.quizapp.controller;

import com.quizapp.quizapp.model.Quiz;
import com.quizapp.quizapp.model.Result;
import com.quizapp.quizapp.model.LeaderboardEntry;
import com.quizapp.quizapp.model.Question;
import com.quizapp.quizapp.model.StudentAnswer;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class QuizController {

    private List<Quiz> quizList = new ArrayList<>();
    private Long nextId = 1L;

    private List<Result> results = new ArrayList<>();
    
    // GET all quizzes
    @GetMapping("/quiz")
    public List<Quiz> getAllQuizzes() {
        return quizList;
    }

    // POST create quiz
    @PostMapping("/quiz")
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        quiz.setId(nextId++);
        quizList.add(quiz);
        return quiz;
    }

    // 👉 ADD IT HERE (inside class, below other methods)
    @PostMapping("/quiz/submit")
    public Map<String, Integer> submitQuiz(@RequestBody StudentAnswer studentAnswer) {

        Quiz quiz = quizList.stream()
                .filter(q -> q.getId().equals(studentAnswer.getQuizId()))
                .findFirst()
                .orElse(null);

        if (quiz == null) {
            return Map.of(
                "error", 1,
                "score", 0,
                "total", 0
            );
        }

        int score = 0;

        for (Question question : quiz.getQuestions()) {
            Integer selected = studentAnswer.getAnswers().get(question.getId());

            if (selected != null && selected == question.getCorrectAnswerIndex()) {
                score++;
            }
        }

        int total = quiz.getQuestions().size();
        
        Result result = new Result(
            studentAnswer.getStudentName(),
            quiz.getId(),
            score,
            total
        );

        results.add(result);

        return Map.of(
            "score", score,
            "total", total
        );
    }

    @GetMapping("/quiz/results")
    public List<LeaderboardEntry> getResults() {
        
        results.sort((a, b) -> b.getScore() - a.getScore());

        List<LeaderboardEntry> leaderboard = new ArrayList<>();

        int rank = 1;

        for (Result r : results) {
            leaderboard.add(new LeaderboardEntry(
                rank++,
                r.getStudentName(),
                r.getScore(),
                r.getTotal()
            ));
        }

        return leaderboard;
    }
}