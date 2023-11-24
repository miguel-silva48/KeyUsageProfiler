package com.ies2324.projBackend;

import java.util.List;

public interface UserService {
  List<User> getAllUsers();
  
  User getUserById(Long userId);
  
  User createUser(User user);

  void deleteUser(Long userId);
}