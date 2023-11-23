package com.ies2324.projBackend;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class KeystrokeServiceImpl implements KeystrokeService {

  private KeystrokeRepository keystrokeRepository;

  @Override
  public List<Keystroke> getAllKeystrokes() {
    return keystrokeRepository.findAll();
  }

  @Override
  public List<Keystroke> getKeystrokesByAuthorId(Long authorId) {
    return keystrokeRepository.findByAuthorId(authorId);
  }

  @Override
  public Keystroke createKeystroke(Keystroke keystroke) {
    return keystrokeRepository.save(keystroke);
  }

}
