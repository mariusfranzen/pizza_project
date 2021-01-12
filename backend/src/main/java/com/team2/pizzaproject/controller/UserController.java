package com.team2.pizzaproject.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.team2.pizzaproject.enums.AuthorizationEnum;
import com.team2.pizzaproject.model.UserModel;
import com.team2.pizzaproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Controller
@RequestMapping(path = "/api/user")
public class UserController {

    private static final Logger LOGGER = Logger.getLogger(PizzaController.class.getName());

    @Autowired
    private Environment env;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder encoder;

    @GetMapping(path = "")
    @ResponseBody
    public Iterable<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping(path = "/id")
    @ResponseBody
    public Optional<UserModel> getUserById(@RequestParam String id) {
        return userRepository.findById(id);
    }

    @GetMapping(path = "/email")
    @ResponseBody
    public Optional<UserModel> getUserByEmail(@RequestParam String email) {
        return userRepository.findByEmail(email);
    }

    @GetMapping(path = "/authorization")
    @ResponseBody
    public Iterable<UserModel> getUserByAuthorizationEnum(@RequestParam AuthorizationEnum authorizationEnum) {
        return userRepository.findByAuthorization(authorizationEnum);
    }

    @GetMapping(path = "/phone-number")
    @ResponseBody
    public Optional<UserModel> getUserByPhoneNumber(@RequestParam String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    @GetMapping(path = "/date-of-registration")
    @ResponseBody
    public Optional<UserModel> getUserByDateOfRegistration(@RequestParam String date) {
        //TODO: transform String of (ddMMyyyy) to an actual date
        return userRepository.findById(date);
    }

    @GetMapping(path = "/validate")
    @ResponseBody
    public String validateUser(@RequestParam UserModel user) {
        try {
            Optional<UserModel> dbUser = userRepository.findByEmail(user.getEmail());
            if (dbUser.isPresent() && dbUser.get().getPassword().equals(encoder.encode(user.getPassword()))) {
                Algorithm algorithm = Algorithm.HMAC512(Objects.requireNonNull(env.getProperty("secret")));
                return JWT.create()
                        .withIssuer(env.getProperty("issuer"))
                        .withSubject(dbUser.get().getId())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                        .withIssuedAt(new Date(System.currentTimeMillis()))
                        .withClaim("auth", dbUser.get().getAuthorization().toString())
                        .withClaim("email", dbUser.get().getEmail())
                        .sign(algorithm);
            } else {
                return null;
            }
        } catch (JWTCreationException e) {
            LOGGER.log(Level.SEVERE, "Validation failed! " + e.getMessage());
            return "ERROR";
        }
    }

    @PostMapping(path = "/add")
    @ResponseBody
    public String newUser(@RequestBody UserModel userModel) {
        userModel.setPassword(encoder.encode(userModel.getPassword()));
        userModel.setDateOfRegistration(new Date(System.currentTimeMillis()));

        if (userModel.getAuthorization() == null) {
            userModel.setAuthorization(AuthorizationEnum.USER);
        }

        try {
            userRepository.save(userModel);
            LOGGER.log(Level.INFO, "Saved user to database!");
            return "Saved user to database!";
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "FAILED SAVING TO DATABASE. Error: " + e.getMessage());
            return "Failed saving to database. Error in log.";
        }
    }
}
