package com.team2.pizzaproject.model;

import com.team2.pizzaproject.enums.AuthorizationEnum;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Document("users")
public class UserModel {

    @Id
    private String id;

    private String password;

    @Field("hashedPassword")
    @NotNull
    private byte[] hashedPassword;

    @Field("firstName")
    private String firstName;

    @Field("lastName")
    private String lastName;

    @Field("dateOfBirth")
    private Date dateOfBirth;

    @Field("phoneNumber")
    private String phoneNumber;

    @Field("email")
    private String email;

    @Field("address")
    private Address address;

    @Field("authorization")
    private AuthorizationEnum authorization;

    @Field("dateOfRegistration")
    private Date dateOfRegistration;

    public UserModel() {
    }

    public UserModel(String password, byte[] hashedPassword, String firstName, String lastName, Date dateOfBirth, String phoneNumber, String email, Address address, AuthorizationEnum authorization) {
        this.password = password;
        this.hashedPassword = hashedPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.authorization = authorization;
        this.dateOfRegistration = new Date(System.currentTimeMillis());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public byte[] getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(byte[] hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public AuthorizationEnum getAuthorization() {
        return authorization;
    }

    public void setAuthorization(AuthorizationEnum authorization) {
        this.authorization = authorization;
    }

    public Date getDateOfRegistration() {
        return dateOfRegistration;
    }

    public void setDateOfRegistration(Date dateOfRegistration) {
        this.dateOfRegistration = dateOfRegistration;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("id", id)
                .append("hashedPassword", hashedPassword)
                .append("firstName", firstName)
                .append("lastName", lastName)
                .append("dateOfBirth", dateOfBirth)
                .append("phoneNumber", phoneNumber)
                .append("email", email)
                .append("address", address)
                .append("authorization", authorization)
                .append("dateOfRegistration", dateOfRegistration)
                .toString();
    }
}
