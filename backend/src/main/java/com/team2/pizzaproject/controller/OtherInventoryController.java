package com.team2.pizzaproject.controller;

import com.team2.pizzaproject.model.OtherInventoryModel;
import com.team2.pizzaproject.repository.OtherInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Controller
@RequestMapping(path = "/api/other-inventory")
@CrossOrigin(origins = { "http://localhost:3000" })
public class OtherInventoryController {

    private static final Logger LOGGER = Logger.getLogger(PizzaController.class.getName());

    @Autowired
    private OtherInventoryRepository otherInventoryRepository;

    @GetMapping(path = "/")
    @ResponseBody
    public Iterable<OtherInventoryModel> getAllPizzas() {
        return otherInventoryRepository.findAll();
    }

    @GetMapping(path = "/id")
    @ResponseBody
    public Optional<OtherInventoryModel> getOtherInventoryById(@RequestParam String id) {
        return otherInventoryRepository.findById(id);
    }

    @GetMapping(path = "/menu-id")
    @ResponseBody
    public Optional<OtherInventoryModel> getOtherInventoryByMenuId(@RequestParam int id) {
        return otherInventoryRepository.findByMenuId(id);
    }

    @GetMapping(path = "/category")
    @ResponseBody
    public Iterable<OtherInventoryModel> getOtherInventoryByCategory(@RequestParam String category) {
        return otherInventoryRepository.findByCategory(category);
    }

    @GetMapping(path = "/price")
    @ResponseBody
    public Iterable<OtherInventoryModel> getOtherInventoryByPrice(@RequestParam float price) {
        return otherInventoryRepository.findByPrice(price);
    }

    @GetMapping(path = "/name")
    @ResponseBody
    public Optional<OtherInventoryModel> getOtherInventoryByName(@RequestParam String name) {
        return otherInventoryRepository.findByName(name);
    }

    @PostMapping(path = "/add")
    @ResponseBody
    public String newOtherInventory(@RequestBody OtherInventoryModel otherInventoryModel) {
        try {
            otherInventoryRepository.save(otherInventoryModel);
            LOGGER.log(Level.INFO, "Successfully saved other inventory!");
            return "Successfully saved other inventory!";
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Failed saving other inventory! Error: " + e.getMessage());
            return "Failed saving other inventory! See log for more info.";
        }
    }

}
