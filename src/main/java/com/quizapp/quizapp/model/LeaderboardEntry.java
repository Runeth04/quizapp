package com.quizapp.quizapp.model;

public class LeaderboardEntry {
    private int rank;
    private String studentName;
    private int score;
    private int total;

    public LeaderboardEntry(int rank, String studentName, int score, int total) {
        this.rank = rank;
        this.studentName = studentName;
        this.score = score;
        this.total = total;
    }

    public int getRank(){
        return rank;
    }

    public String getStudentName(){
        return studentName;
    }

    public int getScore(){
        return score;
    }

    public int getTotal(){
        return total;
    }

}
