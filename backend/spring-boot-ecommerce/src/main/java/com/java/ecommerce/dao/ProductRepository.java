package com.java.ecommerce.dao;

import com.java.ecommerce.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// Entity type: Product, Primary Key: Long
@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
    // query method: findBy<CategoryId> matched by category id
    // use parameter value based on the id value
    // Spring will execute a query similar to SELECT * FROM product where category_id=?
    // Spring Data REST automatically exposes endpoint: http://localhost:8080/api/products/search/findByCategoryId?id=2
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    // query method: findBy name of the product
    // Spring will execute a query similar to SELECT * FROM Product p WHERE p.name LIKE CONCAT('%', :name, '%')
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
