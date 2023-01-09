package ru.itmo.potatocoder228.lab4.web_lab_4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/*
 * TODO Вдохновлялся:
 * https://www.baeldung.com/spring-security-basic-authentication
 * https://www.baeldung.com/spring-boot-start
 * https://habr.com/ru/post/435114/
 * https://devcolibri.com/spring-data-jpa-%D0%BF%D0%B8%D1%88%D0%B5%D0%BC-dao-%D0%B8-services-%D1%87%D0%B0%D1%81%D1%82%D1%8C-2/
 *
 * Книги:
 * https://vk.com/doc26879026_643337963?hash=IU87XE27WtWUH6eiWZsXGkMxqia789OU15fBtmLSdgs&dl=JFoJhF60csbZ3U11XDzKJWHWMmgFZdTeuSYfUMR4LMX
 * */
@SpringBootApplication
@EnableWebMvc
@EnableJpaRepositories
public class WebLab4Application {

    public static void main(String[] args) {
        SpringApplication.run(WebLab4Application.class, args);
    }

}

