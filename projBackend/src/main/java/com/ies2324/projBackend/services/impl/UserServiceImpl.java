package com.ies2324.projBackend.services.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.ies2324.projBackend.entities.User;
import com.ies2324.projBackend.repositories.UserRepository;
import com.ies2324.projBackend.services.UserService;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

  private UserRepository userRepository;

  @Override
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @Override
  public Optional<User> getUserById(Long userId) {
    return userRepository.findById(userId);
  }

  @Override
  public User createUser(User user) {
    return userRepository.save(user);
  }

  @Override
  public void deleteUser(Long userId) {
    userRepository.deleteById(userId);
  }
}
