package com.ies2324.projBackend;

import java.util.List;
import java.util.Optional;

public interface UserService {
  List<User> getAllUsers();

  Optional<User> getUserById(Long userId);

  User createUser(User user);

  void deleteUser(Long userId);
}