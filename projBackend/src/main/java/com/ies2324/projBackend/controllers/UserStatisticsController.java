package com.ies2324.projBackend.controllers;

import lombok.AllArgsConstructor;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ies2324.projBackend.entities.UserStatistics;
import com.ies2324.projBackend.services.UserStatisticsService;

@RestController
@AllArgsConstructor
@RequestMapping("api/statistics")
public class UserStatisticsController {

  private UserStatisticsService userStatisticsService;

  @GetMapping("{id}")
  public ResponseEntity<UserStatistics> getUserStatisticsByAuthorId(@PathVariable("id") Long userId) {
    Optional<UserStatistics> userStatistics = userStatisticsService.getUserStatisticsByAuthorId(userId);
    if (userStatistics.isEmpty())
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    return new ResponseEntity<>(userStatistics.get(), HttpStatus.OK);
  }

}