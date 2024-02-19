package com.gruppe24.backend.controller.config;

import com.gruppe24.backend.controller.component.CustomAuthenticationSuccessHandler;
import com.gruppe24.backend.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final UserRepository userRepository;

  public SecurityConfig(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
            .cors(cors -> cors.configurationSource(request -> corsConfigurationSource()))
            .authorizeHttpRequests(auth -> {
              auth.requestMatchers("/").permitAll();
              auth.requestMatchers("/registration").authenticated();
              auth.anyRequest().permitAll();
            })
            .oauth2Login(oauth2 -> oauth2.successHandler(new CustomAuthenticationSuccessHandler(userRepository)))
            .csrf(AbstractHttpConfigurer::disable)
            .build();
  }

  @Bean
  public CorsConfiguration corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("*")); // WARNING: Consider specifying actual origins in production
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
    configuration.setExposedHeaders(List.of("x-auth-token"));
    return configuration;
  }

}