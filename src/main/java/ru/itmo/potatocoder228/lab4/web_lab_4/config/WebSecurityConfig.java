package ru.itmo.potatocoder228.lab4.web_lab_4.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity(debug = true)
public class WebSecurityConfig implements WebMvcConfigurer {
    /*
     *https://www.baeldung.com/spring-security-basic-authentication
     * TODO Переделать http с deprecated на нормальные бины(сделано!)
     * Порядок играет роль!
     * mvcMatcher более безопасный?(не очень понял, кажется, разница в том, что antMatcher - это другой способ определения)
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeRequests()
                .mvcMatchers("/user/**", "/hits")
                .hasAnyRole("USER")
                .mvcMatchers("/", "/login", "/registration", "/logout")
                .permitAll()
                .and()
                .cors()
                .and()
                .csrf().disable()
                .logout().logoutUrl("/logout").logoutSuccessUrl("/login").and().httpBasic().and().build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
