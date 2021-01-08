package com.team2.pizzaproject.repository;

import com.team2.pizzaproject.model.OtherInventoryModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OtherInventoryRepository extends MongoRepository<OtherInventoryModel, String> {

    List<OtherInventoryModel> findAll();
    Optional<OtherInventoryModel> findById(String id);
    Optional<OtherInventoryModel> findByMenuId(String id);
    List<OtherInventoryModel> findByCategory(String category);
    List<OtherInventoryModel> findByPrice(float price);
    Optional<OtherInventoryModel> findByName(String name);

}
