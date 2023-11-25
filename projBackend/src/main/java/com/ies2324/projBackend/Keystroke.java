package com.ies2324.projBackend;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Keystroke")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Keystroke {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @NotNull(message = "User is mandatory")
  @ManyToOne
  private User author;

  @NotBlank(message = "pressedKey is mandatory")
  private String pressedKey;

  @NotNull(message = "Timestamp is mandatory")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
  private Timestamp ts;

  @Override
  public String toString() {
    return String.format("%s pressed by (%s) at %s", pressedKey, author, ts.toString());
  }
  
}
