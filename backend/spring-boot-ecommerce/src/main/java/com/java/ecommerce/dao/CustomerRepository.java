package com.java.ecommerce.dao;

import com.java.ecommerce.entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Behind the scenes, spring will execute a query similar to:
    // SELECT * FROM Customer c WHERE c.email = theEmail
    Customer findByEmail(String theEmail); // return null if not found
}
