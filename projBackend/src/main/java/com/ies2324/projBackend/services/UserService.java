package com.ies2324.projBackend.services;

import java.util.List;
import java.util.Optional;

import com.ies2324.projBackend.entities.User;

public interface UserService {
  List<User> getAllUsers();

  Optional<User> getUserById(Long userId);

  User createUser(User user);

  void deleteUser(Long userId);
}