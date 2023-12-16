package com.ies2324.projBackend.services;

import java.util.List;

import com.ies2324.projBackend.dao.KeystrokeFrequency;
import com.ies2324.projBackend.entities.Keystroke;
import com.ies2324.projBackend.entities.User;

public interface KeystrokeService {
  List<Keystroke> getAllKeystrokes();

  List<Keystroke> getKeystrokesByAuthorId(Long userId);

  Keystroke createKeystroke(Keystroke keystroke);

  void createKeystrokes(List<Keystroke> keystrokes);

  List<KeystrokeFrequency> getKeystrokeFrequencies(User author);
}