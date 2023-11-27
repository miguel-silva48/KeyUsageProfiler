package com.ies2324.projBackend;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/keystrokes")
public class KeystrokeController {

  private KeystrokeService keystrokeService;

  @GetMapping
  public ResponseEntity<List<Keystroke>> getAllKeystrokes() {
    List<Keystroke> keystrokes = keystrokeService.getAllKeystrokes();
    return new ResponseEntity<>(keystrokes, HttpStatus.OK);
  }

  @GetMapping("{id}")
  public ResponseEntity<List<Keystroke>> getKeystrokesByUserId(@PathVariable("id") Long userId) {
    List<Keystroke> keystrokes = keystrokeService.getKeystrokesByAuthorId(userId);
    return new ResponseEntity<>(keystrokes, HttpStatus.OK);
  }
}