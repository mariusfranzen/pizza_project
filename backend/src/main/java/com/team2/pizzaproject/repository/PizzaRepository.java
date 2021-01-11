package com.team2.pizzaproject.repository;

import com.team2.pizzaproject.model.IngredientModel;
import com.team2.pizzaproject.model.PizzaModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PizzaRepository extends MongoRepository<PizzaModel, String> {

    List<PizzaModel> findAll();
    Optional<PizzaModel> findById(String id);
    List<PizzaModel> findByName(String name);
    List<PizzaModel> findByPrice(float price);
    List<PizzaModel> findByIngredientArray(String[] ingredients);

}
