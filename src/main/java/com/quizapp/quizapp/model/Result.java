package com.quizapp.quizapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "results")
public class Result {

    @Id
    private String id;   // MongoDB auto ID

    private String studentName;
    private String quizId;   // ✅ must match Quiz (String)
    private int score;
    private int total;

    public Result() {}

    public Result(String studentName, String quizId, int score, int total) {
        this.studentName = studentName;
        this.quizId = quizId;
        this.score = score;
        this.total = total;
    }

    public String getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getQuizId() {
        return quizId;
    }

    public void setQuizId(String quizId) {
        this.quizId = quizId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}