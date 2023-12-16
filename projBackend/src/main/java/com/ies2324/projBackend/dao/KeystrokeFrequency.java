package com.ies2324.projBackend.dao;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KeystrokeFrequency {
    private String keyValue;
    private Long numPresses;
}
