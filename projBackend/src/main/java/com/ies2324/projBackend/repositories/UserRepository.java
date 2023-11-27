package com.ies2324.projBackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ies2324.projBackend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
