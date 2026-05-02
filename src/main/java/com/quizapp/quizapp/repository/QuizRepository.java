package com.quizapp.quizapp.repository;

import com.quizapp.quizapp.model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizRepository extends MongoRepository<Quiz, String> {
}