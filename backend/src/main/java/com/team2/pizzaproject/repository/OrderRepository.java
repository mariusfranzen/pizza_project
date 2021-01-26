package com.team2.pizzaproject.repository;

import com.team2.pizzaproject.model.OrderModel;
import com.team2.pizzaproject.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<OrderModel, String> {

    Optional<OrderModel> findById(String id);
    List<OrderModel> findByUser(UserModel user);

}
