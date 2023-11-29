package com.java.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

//import com.okta.spring.boot.oauth.Okta;

@Configuration
public class SecurityConfiguration {

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //protect endpoint /api/orders
        http.authorizeHttpRequests(requests ->
                        requests
                                // protect the endpoint only accessible to authenticated users
                                .requestMatchers("/api/orders/**")
                                .authenticated()
                                .anyRequest().permitAll())
                // configure OAuth2 resource server support
                .oauth2ResourceServer()
                // enables JWT-encoded bearer token support
                .jwt();

        //add CORS filters
        http.cors();

        //add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class, new
                HeaderContentNegotiationStrategy());

        //force a non-empty response body for 401's to make the response more friendly

        Okta.configureResourceServer401ResponseBody(http);

        // disable CSRF since we are not using Cookies for session tracking
        http.csrf().disable();

        // httpSecurity supports the builder design pattern -> using "build" to return the instance
        return http.build();
    }

}
