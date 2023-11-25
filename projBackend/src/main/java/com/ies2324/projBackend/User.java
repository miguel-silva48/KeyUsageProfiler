package com.ies2324.projBackend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "MyUser")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  
  @NotBlank(message = "Name is mandatory")
  private String username;
  
  @NotBlank(message = "Email is mandatory")
  private String email;

  @Override
  public String toString() {
    return String.format("%s(id:%d) - email: %s", username, id, email);
  }
}