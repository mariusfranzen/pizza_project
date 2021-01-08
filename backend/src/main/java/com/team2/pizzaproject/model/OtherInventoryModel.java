package com.team2.pizzaproject.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("otherInventory")
public class OtherInventoryModel {

    @Id
    @Field("_id")
    private String id;

    @Field("name")
    private String name;

    @Field("price")
    private float price;

    @Field("description")
    private String description;

    @Field("category")
    private String category;

    @Field("menuId")
    private String menuId;

    public OtherInventoryModel() {
    }

    public OtherInventoryModel(String name, float price, String description, String category, String menuId) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.menuId = menuId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("id", id)
                .append("name", name)
                .append("price", price)
                .append("description", description)
                .append("category", category)
                .toString();
    }
}
