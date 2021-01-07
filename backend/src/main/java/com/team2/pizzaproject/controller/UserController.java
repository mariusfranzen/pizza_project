package com.team2.pizzaproject.controller;

import com.team2.pizzaproject.enums.AuthorizationEnum;
import com.team2.pizzaproject.model.UserModel;
import com.team2.pizzaproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Controller
@RequestMapping(path = "/api/user")
@CrossOrigin(origins = { "http://localhost:3000" })
public class UserController {

    private static final Logger LOGGER = Logger.getLogger(PizzaController.class.getName());

    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "")
    @ResponseBody
    public Iterable<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping(path = "/id")
    @ResponseBody
    public Optional<UserModel> getUserById(String id) {
        return userRepository.findById(id);
    }

    @GetMapping(path = "/email")
    @ResponseBody
    public Optional<UserModel> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @GetMapping(path = "/authorization")
    @ResponseBody
    public Iterable<UserModel> getUserByAuthorizationEnum(AuthorizationEnum authorizationEnum) {
        return userRepository.findByAuthorizationEnum(authorizationEnum);
    }

    @GetMapping(path = "/phone-number")
    @ResponseBody
    public Optional<UserModel> getUserByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    @GetMapping(path = "/date-of-registration")
    @ResponseBody
    public Optional<UserModel> getUserByDateOfRegistration(String date) {
        //TODO: transform String of (ddMMyyyy) to an actual date
        return userRepository.findById(date);
    }

    @PostMapping(path = "/new")
    @ResponseBody
    public String newUser(UserModel userModel) {
        UserModel user = userModel;
        user.setDateOfRegistration(new Date(System.currentTimeMillis()));

        if (user.getAuthorization() == null) {
            user.setAuthorization(AuthorizationEnum.USER);
        }

        try {
            userRepository.save(user);
            LOGGER.log(Level.INFO, "Saved user to database!");
            return "Saved user to database!";
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "FAILED SAVING TO DATABASE. Error: " + e.getMessage());
            return "Failed saving to database. Error in log.";
        }
    }

}
