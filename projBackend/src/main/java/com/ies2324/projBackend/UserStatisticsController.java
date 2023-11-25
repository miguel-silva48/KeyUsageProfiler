package com.ies2324.projBackend;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/statistics")
public class UserStatisticsController {

  private UserStatisticsService userStatisticsService;

  @GetMapping("{id}")
  public ResponseEntity<UserStatistics> getUserStatisticsByAuthorId(@PathVariable("id") Long userId){
    UserStatistics userStatistics = userStatisticsService.getUserStatisticsByAuthorId(userId);
    return new ResponseEntity<>(userStatistics, HttpStatus.OK);
  }
  
}