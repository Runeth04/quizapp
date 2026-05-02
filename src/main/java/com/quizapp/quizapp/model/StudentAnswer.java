package com.quizapp.quizapp.model;

import java.util.Map;

public class StudentAnswer {

    private Long quizId;
    private Map<Long, Integer> answers; // questionId -> selected option index
    private String studentName;
    
    public StudentAnswer() {}

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public Map<Long, Integer> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Long, Integer> answers) {
        this.answers = answers;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    
}