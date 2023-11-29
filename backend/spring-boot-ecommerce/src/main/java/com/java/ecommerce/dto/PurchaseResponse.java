package com.java.ecommerce.dto;

import lombok.Data;

// Lombok @Data will generate constructor for final fields
@Data
public class PurchaseResponse {
    // use this class to send back a Java object as JSON
    private final String orderTrackingNumber;

}
