package com.ies2324.projBackend.services;

import java.util.List;

import com.ies2324.projBackend.entities.Keystroke;

public interface KeystrokeService {
  List<Keystroke> getAllKeystrokes();

  List<Keystroke> getKeystrokesByAuthorId(Long userId);

  Keystroke createKeystroke(Keystroke keystroke);

  void createKeystrokes(List<Keystroke> keystrokes);
}