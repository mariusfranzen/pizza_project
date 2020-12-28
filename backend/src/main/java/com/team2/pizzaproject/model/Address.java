package com.team2.pizzaproject.model;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class Address {

    private String streetName;
    private String streetNumber;
    private String city;
    private String zipCode;

    public Address() {
    }

    public Address(String streetName, String streetNumber, String city, String zipCode) {
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.city = city;
        this.zipCode = zipCode;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("streetName", streetName)
                .append("streetNumber", streetNumber)
                .append("city", city)
                .append("zipCode", zipCode)
                .toString();
    }
}
