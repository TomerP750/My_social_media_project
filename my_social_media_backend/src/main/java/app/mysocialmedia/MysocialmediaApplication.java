package app.mysocialmedia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MysocialmediaApplication {

    public static void main(String[] args) {
        SpringApplication.run(MysocialmediaApplication.class, args);
    }

}
