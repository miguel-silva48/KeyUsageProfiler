package com.ies2324.projBackend;

import java.util.List;

public interface KeystrokeService {
  List<Keystroke> getAllKeystrokes();

  List<Keystroke> getKeystrokesByAuthorId(Long userId);

  Keystroke createKeystroke(Keystroke keystroke);

  void createKeystrokes(List<Keystroke> keystrokes);
}