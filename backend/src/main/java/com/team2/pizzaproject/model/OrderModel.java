package com.team2.pizzaproject.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("orders")
public class OrderModel {

    @Id
    private String id;

    @Field("user")
    private UserModel user;

    @Field("purchaseArray")
    private String[] purchaseArray;

    @Field("orderComment")
    private String orderComment;

    @Field("totalPrice")
    private String totalPrice;

    public OrderModel() {
    }

    public OrderModel(UserModel user, String[] purchaseArray, String orderComment, String totalPrice) {
        this.user = user;
        this.purchaseArray = purchaseArray;
        this.orderComment = orderComment;
        this.totalPrice = totalPrice;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public String[] getPurchaseArray() {
        return purchaseArray;
    }

    public void setPurchaseArray(String[] purchaseArray) {
        this.purchaseArray = purchaseArray;
    }

    public String getOrderComment() {
        return orderComment;
    }

    public void setOrderComment(String orderComment) {
        this.orderComment = orderComment;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("id", id)
                .append("user", user)
                .append("purchaseArray", purchaseArray)
                .append("orderComment", orderComment)
                .append("totalPrice", totalPrice)
                .toString();
    }
}
