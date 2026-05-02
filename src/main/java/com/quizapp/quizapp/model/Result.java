package com.quizapp.quizapp.model;

public class Result {

    private String studentName;
    private Long quizId;
    private int score;
    private int total;

    public Result() {}

    public Result(String studentName, Long quizId, int score, int total) {
        this.studentName = studentName;
        this.quizId = quizId;
        this.score = score;
        this.total = total;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
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