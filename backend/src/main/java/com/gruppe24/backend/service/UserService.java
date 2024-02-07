package com.gruppe24.backend.service;

import com.gruppe24.backend.entity.User;
import com.gruppe24.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Transactional
  public List<User> readUsers() {
    return userRepository.findAll();
  }
}
