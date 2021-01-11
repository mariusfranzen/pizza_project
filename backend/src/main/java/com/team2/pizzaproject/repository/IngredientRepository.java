package com.team2.pizzaproject.repository;

import com.team2.pizzaproject.model.IngredientModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface IngredientRepository extends MongoRepository<IngredientModel, String> {

    Optional<IngredientModel> findById(String id);
    List<IngredientModel> findByName(String name);
    List<IngredientModel> findByPriceGroup(String priceGroup);

}
