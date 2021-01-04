package com.team2.pizzaproject.controller;

import com.team2.pizzaproject.model.IngredientModel;
import com.team2.pizzaproject.model.PizzaModel;
import com.team2.pizzaproject.repository.IngredientRepository;
import com.team2.pizzaproject.repository.PizzaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Controller
@RequestMapping(path = "/api/pizza")
@CrossOrigin(origins = { "http://localhost:3000" })
public class PizzaController {

    private static final Logger LOGGER = Logger.getLogger(PizzaController.class.getName());

    @Autowired
    private PizzaRepository pizzaRepository;
    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping(path = "")
    @ResponseBody
    public Iterable<PizzaModel> getAllPizzas() {
        return pizzaRepository.findAll();
    }

    @GetMapping(path = "/name")
    @ResponseBody
    public Iterable<PizzaModel> getPizzaByName(@RequestParam String name) {
        return pizzaRepository.findByName(name);
    }

    @PostMapping(path = "/new")
    @ResponseBody
    public String newPizza(@RequestBody PizzaModel pizzaModel) {
        PizzaModel pizza = pizzaModel;

        if (pizzaModel.getIngredientModels() != null) {
            List<IngredientModel> ingredients = new ArrayList<>();
            for (IngredientModel ingredient:pizzaModel.getIngredientModels()) {
                if (ingredientRepository.findByName(ingredient.getName()).isPresent()) {
                    ingredients.add(ingredientRepository.findByName(ingredient.getName()).get());
                } else {
                    return "Failed saving to database. One or more ingredients does not exist in the database";
                }
            }
            pizza.setIngredientModels(ingredients);
        }

        try {
            pizzaRepository.save(pizza);
            LOGGER.log(Level.INFO, "Saved pizza to database!");
            return "Saved pizza to database!";
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "FAILED SAVING TO DATABASE. Error: " + e.getMessage());
            return "Failed saving to database. Error in log.";
        }
    }
}