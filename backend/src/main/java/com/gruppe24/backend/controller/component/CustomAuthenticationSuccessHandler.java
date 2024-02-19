package com.gruppe24.backend.controller.component;

import com.gruppe24.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {


  private final UserRepository userRepository;


  private static final Logger log = LoggerFactory.getLogger(CustomAuthenticationSuccessHandler.class);

  public CustomAuthenticationSuccessHandler(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
    OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
    String email = oauthToken.getPrincipal().getAttribute("email");

    if (userRepository.findByEmail(email).isPresent()) {
      log.info("User found! Redirect to secured page");
      response.sendRedirect("/secured");
    } else {
      log.info("User does not exist, redirect to registration page");
      assert email != null;
      response.sendRedirect("/register");
    }
  }

}
