package com.expensetracker.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class BrowserLauncher implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) {
        try {
            String url = "http://localhost:8081";

            // Windows command to open default browser (Chrome)
            new ProcessBuilder(
                    "cmd", "/c", "start", url
            ).start();

        } catch (Exception e) {
            // ignore
        }
    }
}
