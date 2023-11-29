package com.java.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.java.ecommerce.entity.State;
import java.util.List;

@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> {

    // retrieve state for a given country code
    List<State> findByCountryCode(@Param("code") String code);

}
