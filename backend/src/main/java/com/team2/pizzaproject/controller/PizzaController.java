package com.team2.pizzaproject.controller;

import com.team2.pizzaproject.model.PizzaModel;
import com.team2.pizzaproject.repository.PizzaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
@RequestMapping(path = "/api/pizza")
public class PizzaController {

    @Autowired
    private PizzaRepository pizzaRepository;
    
    // localhost:8080/api/pizza/name&name=pizzanamn
    @GetMapping(path = "/name")
    public Optional<PizzaModel> getPizzaByName(@RequestParam String name) {
        return pizzaRepository.findByName(name);
    }

}
