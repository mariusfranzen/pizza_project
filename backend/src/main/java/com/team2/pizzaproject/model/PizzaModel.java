package com.team2.pizzaproject.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("pizzas")
public class PizzaModel {

    @Id
    private String id;

    @Field("menuId")
    private int menuId;

    @Field("name")
    private String name;

    @Field("price")
    private float price;

    @Field("ingredientArray")
    private String[] ingredientArray;

    @Field("description")
    private String description;
    //Size?

    public PizzaModel() {
    }

    public PizzaModel(int menuId, String name, float price, String[] ingredientModels, String description) {
        this.menuId = menuId;
        this.name = name;
        this.price = price;
        this.ingredientArray = ingredientModels;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
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

    public String[] getIngredientArray() {
        return ingredientArray;
    }

    public void setIngredientArray(String[] ingredientArray) {
        this.ingredientArray = ingredientArray;
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
                .append("ingredients", ingredientArray)
                .append("description", description)
                .toString();
    }
}
