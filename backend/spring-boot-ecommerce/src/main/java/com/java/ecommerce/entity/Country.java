package com.java.ecommerce.entity;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="country")
@Getter
@Setter
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="code")
    private String code;

    @Column(name="name")
    private String name;

    // one country to many states
    @OneToMany(mappedBy = "country")
    // this ignore the given field as far as providing JSON data
    // here we ignore the states when it makes the return on the actual data
    @JsonIgnore
    private List<State> states;

}
