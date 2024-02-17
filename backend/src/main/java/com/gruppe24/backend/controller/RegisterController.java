package com.gruppe24.backend.controller;

import com.gruppe24.backend.dto.UserDTO;
import com.gruppe24.backend.entity.User;
import com.gruppe24.backend.repository.UserRepository;
import com.gruppe24.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/register")
public class RegisterController {

  private final UserRepository userRepository;
  private final UserService userService;

  private static final Logger log = LoggerFactory.getLogger(GameController.class);

  public RegisterController(UserRepository userRepository, UserService userService) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  @GetMapping
  public String showRegistrationForm(@RequestParam(required = false) String email, HttpServletRequest request, Model model) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (!(authentication instanceof OAuth2AuthenticationToken) || userRepository.findByEmail(email).isPresent()) {
      return "redirect:/";
    }

    model.addAttribute("email", email);
    return "register";
  }

  @PostMapping
  public String registerUserAccount(@RequestBody UserDTO userDto, BindingResult result) {
    log.info(userDto.toString());
    String username = userDto.getName().orElseThrow(IllegalArgumentException::new);
    if (userRepository.findById(username).isPresent()) {
      result.rejectValue("username", null, "There is already an account registered with that username");
      return "register";
    }

    User user = userService.createUser(userDto);
    return "redirect:/secured";
  }

}
