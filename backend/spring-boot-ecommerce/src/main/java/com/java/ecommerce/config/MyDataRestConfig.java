package com.java.ecommerce.config;

import com.java.ecommerce.entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

@Configuration // RepositoryRestConfigurer from Spring Data REST
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;

    // EntityManager is used to create and remove persistent entity instances,
    // to find entities by their primary key, and to query over entities
    private EntityManager entityManager;
    @Autowired // autowire JPA entity manager through the constructor
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        // List of HTTP methods to disable
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

        // disable HTTP methods for Product: PUT, POST, DELETE and PATCH
        disableHttpMethods(Product.class, config, theUnsupportedActions);
        disableHttpMethods(ProductCategory.class, config, theUnsupportedActions);
        disableHttpMethods(Country.class, config, theUnsupportedActions);
        disableHttpMethods(State.class, config, theUnsupportedActions);
        disableHttpMethods(Order.class, config, theUnsupportedActions);


        // call an internal helper method to expose the Id
        exposeIds(config);

        // configure cors mapping
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }

    // exposeIds: method that used to expose entity IDs in the response JSON
    private void exposeIds(RepositoryRestConfiguration config){
        // expose entity id
        // 1. Get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        // 2. Create an array of the entity type
        List<Class> entityClasses = new ArrayList<>();
        // 3. Get the entity type for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }
        // 4. expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }
}