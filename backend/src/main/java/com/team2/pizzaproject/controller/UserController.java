package com.team2.pizzaproject.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.team2.pizzaproject.enums.AuthorizationEnum;
import com.team2.pizzaproject.model.UserModel;
import com.team2.pizzaproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
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

    @PostMapping(path = "/validate")
    @ResponseBody
    public String validateUser(@RequestBody UserModel user) {
        try {
            Optional<UserModel> dbUser = userRepository.findByEmail(user.getEmail());
            if (dbUser.isPresent() && Arrays.equals(dbUser.get().getHashedPassword(), hashPassword(user.getPassword()))) {
                Algorithm algorithm = Algorithm.HMAC512(Objects.requireNonNull(env.getProperty("secret")));
                LOGGER.log(Level.INFO, "User logged in: " + dbUser.get().getId());
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
        } catch (JWTCreationException | NoSuchAlgorithmException e) {
            LOGGER.log(Level.SEVERE, "Validation failed! " + e.getMessage());
            return "ERROR";
        }
    }

    @PostMapping(path = "/validate-jwt")
    @ResponseBody
    public UserModel validateJwt(@RequestParam String jwt) {
        try {
            Algorithm algorithm = Algorithm.HMAC512(Objects.requireNonNull(env.getProperty("secret")));
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(env.getProperty("issuer"))
                    .build();
            UserModel user = new UserModel();
            user.setId(JWT.decode(jwt).getSubject());
            user.setEmail(JWT.decode(jwt).getClaim("email").asString());
            user.setAuthorization(AuthorizationEnum.valueOf(JWT.decode(jwt).getClaim("auth").asString()));
            return user;
        } catch (JWTVerificationException e) {
            LOGGER.log(Level.WARNING, "Invalid JWT token: " + e.getMessage());
            return null;
        } catch (NullPointerException e) {
            LOGGER.log(Level.SEVERE, "NullPointerException! Message: " + e.getMessage());
            return null;
        }
    }

    @PostMapping(path = "/add")
    @ResponseBody
    public String newUser(@RequestBody UserModel userModel) {
        try {
            userModel.setHashedPassword(hashPassword(userModel.getPassword()));
            userModel.setPassword(null);
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

    private byte[] hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-512");
        md.update(Objects.requireNonNull(env.getProperty("secret")).getBytes());
        return md.digest(password.getBytes(StandardCharsets.UTF_8));
    }
}
