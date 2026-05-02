package com.quizapp.quizapp.model;

import java.util.Map;

public class StudentAnswer {

    private String quizId;
    private Map<String, Integer> answers; // questionId -> selected option index
    private String studentName;
    
    public StudentAnswer() {}

    public String getQuizId() {
        return quizId;
    }

    public void setQuizId(String quizId) {
        this.quizId = quizId;
    }

    public Map<String, Integer> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String, Integer> answers) {
        this.answers = answers;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    
}