package com.ies2324.projBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ProjBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjBackendApplication.class, args);
	}

}
