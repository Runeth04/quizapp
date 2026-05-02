package com.quizapp.quizapp.model;

import java.util.List;

public class Quiz {

    private Long id;
    private String title;
    private String teacherName;
    private List<Question> questions;

    public Quiz() {}

    public Quiz(Long id, String title, String teacherName) {
        this.id = id;
        this.title = title;
        this.teacherName = teacherName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
    
}