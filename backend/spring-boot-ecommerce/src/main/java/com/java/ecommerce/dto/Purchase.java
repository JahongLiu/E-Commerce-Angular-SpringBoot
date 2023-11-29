package com.java.ecommerce.dto;

import com.java.ecommerce.entity.Address;
import com.java.ecommerce.entity.Customer;
import com.java.ecommerce.entity.Order;
import com.java.ecommerce.entity.OrderItem;

import java.util.Set;

import lombok.Data;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
