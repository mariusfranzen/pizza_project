package com.team2.pizzaproject.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.team2.pizzaproject.enums.AuthorizationEnum;
import com.team2.pizzaproject.model.UserModel;
import com.team2.pizzaproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Controller
@RequestMapping(path = "/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private static final Logger LOGGER = Logger.getLogger(PizzaController.class.getName());

    @Autowired
    private Environment env;
    @Autowired
    private UserRepository userRepository;

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
            if (dbUser.isPresent() && dbUser.get().getPassword().equals(hashPassword(user.getPassword()))) {
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
        } catch (JWTCreationException | InvalidKeySpecException | NoSuchAlgorithmException e) {
            LOGGER.log(Level.SEVERE, "Validation failed! " + e.getMessage());
            return "ERROR";
        }
    }

    @PostMapping(path = "/add")
    @ResponseBody
    public String newUser(@RequestBody UserModel userModel) {
        try {
            userModel.setPassword(hashPassword(userModel.getPassword()));
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Failed hashing password. Error: " + e.getMessage());
            return "Failed creating user. Error in log.";
        }
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

    private String hashPassword(String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);

        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");

        byte[] hash = factory.generateSecret(spec).getEncoded();
        return new String(hash);
    }
}
