package com.quizapp.quizapp.controller;

import com.quizapp.quizapp.model.Quiz;
import com.quizapp.quizapp.model.Result;
import com.quizapp.quizapp.model.LeaderboardEntry;
import com.quizapp.quizapp.model.Question;
import com.quizapp.quizapp.model.StudentAnswer;

import com.quizapp.quizapp.repository.QuizRepository;
import com.quizapp.quizapp.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ResultRepository resultRepository;

    // GET all quizzes
    @GetMapping("/quiz")
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();   // ✅
    }

    // POST create quiz
    @PostMapping("/quiz")
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizRepository.save(quiz);  // ✅
    }

    // Submit quiz
    @PostMapping("/quiz/submit")
    public Map<String, Integer> submitQuiz(@RequestBody StudentAnswer studentAnswer) {

        // ✅ Fetch from DB
        Quiz quiz = quizRepository.findById(studentAnswer.getQuizId()).orElse(null);

        if (quiz == null) {
            return Map.of(
                "error", 1,
                "score", 0,
                "total", 0
            );
        }

        int score = 0;

        for (Question question : quiz.getQuestions()) {
            Integer selected = studentAnswer.getAnswers().get(String.valueOf(question.getId()));

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

        // ✅ Save to DB
        resultRepository.save(result);

        return Map.of(
                "score", score,
                "total", total
        );
    }

    // Leaderboard
    @GetMapping("/quiz/results")
    public List<LeaderboardEntry> getResults() {

        // ✅ Fetch from DB
        List<Result> results = resultRepository.findAll();

        // Sort
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
    // ✅ Results by Quiz (Teacher view)
    @GetMapping("/results/{quizId}")
    public List<Result> getResultsByQuiz(@PathVariable String quizId) {
        return resultRepository.findByQuizId(quizId);
    }
}