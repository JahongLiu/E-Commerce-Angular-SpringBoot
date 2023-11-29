package com.java.ecommerce.entity;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="product_category")
// @Data <- cannot use when we have one-to-many & many-to-one
@Getter // use @Getter & @Setter for lambok instead
@Setter
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    /* OneToMany = One row in the parent table associates with many rows in the child table
     CascadeType.ALL = all operations (PERSIST, MERGE, REMOVE, REFRESH, DETACH) will be cascaded
     from the parent entity to the child entity */
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category") // Product entity has a field: category
    private Set<Product> products;

}
