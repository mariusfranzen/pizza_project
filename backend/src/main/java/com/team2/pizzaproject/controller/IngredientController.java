package com.team2.pizzaproject.controller;

import com.team2.pizzaproject.model.IngredientModel;
import com.team2.pizzaproject.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Controller
@RequestMapping(path = "/api/ingredients")
@CrossOrigin(origins = "http://localhost:3000")
public class IngredientController {

    private static final Logger LOGGER = Logger.getLogger(PizzaController.class.getName());

    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping(path = "/")
    @ResponseBody
    public Iterable<IngredientModel> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    @GetMapping(path = "/id")
    @ResponseBody
    public Optional<IngredientModel> getById(@RequestParam String id) {
        return ingredientRepository.findById(id);
    }

    @GetMapping(path = "/price-group")
    @ResponseBody
    public Iterable<IngredientModel> getByPriceGroup(@RequestParam String priceGroup) {
        return ingredientRepository.findByPriceGroup(priceGroup);
    }

    @GetMapping(path = "/name")
    @ResponseBody
    public Optional<IngredientModel> getByName(@RequestParam String name) {
        return ingredientRepository.findByName(name);
    }

    @PostMapping(path = "/add")
    @ResponseBody
    public String addIngredient(@RequestBody IngredientModel ingredientModel) {
        try {
            ingredientRepository.save(ingredientModel);
            LOGGER.log(Level.INFO, "Successfully saved ingredient!");
            return "Successfully saved ingredient!";
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Failed saving ingredient! Error: " + e.getMessage());
            return "Failed saving ingredient! See log for more info.";
        }
    }

}
