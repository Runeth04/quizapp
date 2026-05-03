package com.quizapp.quizapp.repository;

import com.quizapp.quizapp.model.Result;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResultRepository extends MongoRepository<Result, String> {
    // Find results by quizId
    java.util.List<Result> findByQuizId(String quizId);
}