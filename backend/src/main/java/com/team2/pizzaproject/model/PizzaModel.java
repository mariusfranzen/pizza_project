package com.team2.pizzaproject.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document("pizzas")
public class PizzaModel {

    @Id
    @Field("_id")
    private String id;

    @Field("name")
    private String name;

    @Field("price")
    private float price;

    @Field("ingredientList")
    private List<IngredientModel> ingredientModels;

    @Field("description")
    private String description;
    //Size?

    public PizzaModel() {
    }

    public PizzaModel(String name) {
        this.name = name;
        this.price = 0f;
        this.ingredientModels = null;
        this.description = "";
    }

    public PizzaModel(List<IngredientModel> ingredientModels) {
        this.name = "";
        this.price = 0f;
        this.ingredientModels = ingredientModels;
        this.description = "";
    }

    public PizzaModel(float price, List<IngredientModel> ingredientModels) {
        this.name = "";
        this.price = price;
        this.ingredientModels = ingredientModels;
        this.description = "";
    }

    public PizzaModel(float price, List<IngredientModel> ingredientModels, String description) {
        this.name = "";
        this.price = price;
        this.ingredientModels = ingredientModels;
        this.description = description;
    }

    public PizzaModel(String name, float price, List<IngredientModel> ingredientModels, String description) {
        this.name = name;
        this.price = price;
        this.ingredientModels = ingredientModels;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public List<IngredientModel> getIngredientModels() {
        return ingredientModels;
    }

    public void setIngredientModels(List<IngredientModel> ingredientModels) {
        this.ingredientModels = ingredientModels;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return new org.apache.commons.lang3.builder.ToStringBuilder(this)
                .append("id", id)
                .append("name", name)
                .append("price", price)
                .append("ingredients", ingredientModels)
                .append("description", description)
                .toString();
    }
}
