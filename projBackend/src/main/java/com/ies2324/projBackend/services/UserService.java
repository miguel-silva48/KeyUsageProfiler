package com.ies2324.projBackend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.ies2324.projBackend.entities.Team;
import com.ies2324.projBackend.entities.User;

public interface UserService {
  List<User> getAllUsers();

  Optional<User> getUserById(Long userId);

  // security related
  UserDetailsService userDetailsService();

  User createUser(User user);

  User updateUser(User user);

  void deleteUser(Long userId);

  Team removeFromTeam(User user);
}