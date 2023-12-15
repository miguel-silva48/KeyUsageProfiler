package com.ies2324.projBackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "UserStatistics")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserStatistics {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @NotNull(message = "User is mandatory")
  @OneToOne
  private User author;

  @NotNull(message = "minutesTyping is mandatory")
  private Float minutesTyping;

  @NotNull(message = "awpm is mandatory")
  private Float awpm;

  @NotNull(message = "maxWpm is mandatory")
  private Float maxWpm;

  @Enumerated(EnumType.STRING)
  private Status status;

  @Override
  public String toString() {
    return String.format("User %s spent %f minutes typing(AWPM: %f)", author, minutesTyping, awpm);
  }

}
