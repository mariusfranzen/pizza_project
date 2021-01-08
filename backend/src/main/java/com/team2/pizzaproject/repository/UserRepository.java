package com.team2.pizzaproject.repository;

import com.team2.pizzaproject.enums.AuthorizationEnum;
import com.team2.pizzaproject.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<UserModel, String> {

    List<UserModel> findAll();
    Optional<UserModel> findById(String id);
    Optional<UserModel> findByEmail(String email);
    List<UserModel> findByAuthorization(AuthorizationEnum authorizationEnum);
    Optional<UserModel> findByPhoneNumber(String phoneNumber);
    List<UserModel> findByDateOfRegistration(Date date);

}
