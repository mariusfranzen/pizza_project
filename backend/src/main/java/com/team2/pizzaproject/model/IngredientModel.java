package com.team2.pizzaproject.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.data.annotation.Id;

import java.util.UUID;

public class IngredientModel {

    @Id
    private UUID id;
    private String name;
    private String priceGroup;
    private String description;

    public IngredientModel() {
    }

    public IngredientModel(String name, String priceGroup, String description) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.priceGroup = priceGroup;
        this.description = description;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPriceGroup() {
        return priceGroup;
    }

    public void setPriceGroup(String priceGroup) {
        this.priceGroup = priceGroup;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("id", id)
                .append("name", name)
                .append("priceGroup", priceGroup)
                .append("description", description)
                .toString();
    }
}
