package ru.itmo.potatocoder228.lab4.web_lab_4.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.AuthDto;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.ResponseDto;
import ru.itmo.potatocoder228.lab4.web_lab_4.services.AuthService;

@RestController
@AllArgsConstructor
public class AuthController {
    private AuthService authService;

    @GetMapping("/login")
    public ResponseDto login(@RequestBody AuthDto authentication) {
        return authService.login(authentication);
    }

    @PostMapping("/registration")
    public ResponseDto register(@RequestBody AuthDto registerDto) {
        return authService.register(registerDto);
    }

    @ExceptionHandler(AuthenticationException.class)
    ResponseEntity<ResponseDto> handleAuthenticationException(AuthenticationException exception) {
        ResponseDto response = new ResponseDto();
        response.setResult(exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }
}
