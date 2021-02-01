package com.team2.pizzaproject.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.team2.pizzaproject.model.OrderModel;
import com.team2.pizzaproject.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@Controller
@RequestMapping(path = "/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private static final Logger LOGGER = Logger.getLogger(OrderController.class.getName());

    @Autowired
    private Environment env;
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping(path = "/")
    @ResponseBody
    public Iterable<OrderModel> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping(path = "/id")
    @ResponseBody
    public Optional<OrderModel> getById(@RequestParam String id) {
        return orderRepository.findById(id);
    }

    @PostMapping(path = "/add")
    @ResponseBody
    public OrderModel addOrder(@RequestBody OrderModel order) {
        LOGGER.log(Level.INFO, "Order saved");
        return orderRepository.save(order);
    }

    @PostMapping(path = "/jwt")
    @ResponseBody
    public String jwtOrder(@RequestBody OrderModel order) {
        try {
            Optional<OrderModel> dbOrder = orderRepository.findById(order.getId());
            if (dbOrder.isPresent()) {
                Algorithm algorithm = Algorithm.HMAC512(Objects.requireNonNull(env.getProperty("secret")));
                return JWT.create()
                        .withIssuer(env.getProperty("issuer"))
                        .withSubject(dbOrder.get().getId())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 86400000))
                        .withIssuedAt(new Date(System.currentTimeMillis()))
                        .withClaim("price", dbOrder.get().getTotalPrice())
                        .sign(algorithm);
            } else {
                return null;
            }
        } catch (JWTCreationException e) {
            LOGGER.log(Level.SEVERE, "Validation failed! " + e.getMessage());
            return "ERROR";
        }
    }

    @PostMapping(path = "/validate-jwt")
    @ResponseBody
    public OrderModel validateJwt(@RequestParam String jwt) {
        try {
            Algorithm algorithm = Algorithm.HMAC512(Objects.requireNonNull(env.getProperty("secret")));
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(env.getProperty("issuer"))
                    .build();
            OrderModel order = new OrderModel();
            order.setId(JWT.decode(jwt).getSubject());
            order.setTotalPrice(JWT.decode(jwt).getClaim("price").asString());
            return order;
        } catch (JWTVerificationException e) {
            LOGGER.log(Level.WARNING, "Invalid JWT token: " + e.getMessage());
            return null;
        } catch (NullPointerException e) {
            LOGGER.log(Level.SEVERE, "NullPointerException! Message: " + e.getMessage());
            return null;
        }
    }
}
