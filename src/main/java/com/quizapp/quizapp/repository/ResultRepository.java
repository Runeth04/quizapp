package com.quizapp.quizapp.repository;

import com.quizapp.quizapp.model.Result;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResultRepository extends MongoRepository<Result, String> {
}