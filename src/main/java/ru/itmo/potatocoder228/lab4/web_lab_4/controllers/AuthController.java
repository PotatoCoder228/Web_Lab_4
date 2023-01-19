package ru.itmo.potatocoder228.lab4.web_lab_4.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.AuthDto;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.ResponseDto;
import ru.itmo.potatocoder228.lab4.web_lab_4.services.AuthService;

@RestController
@AllArgsConstructor
public class AuthController {
    private AuthService authService;

    @PostMapping("/login")
    public ResponseDto login(@RequestBody AuthDto authentication) {
        return authService.login(authentication);
    }

    @PostMapping("/registration")
    public ResponseDto register(@RequestBody AuthDto registerDto) {
        authService.register(registerDto);
        return authService.login(registerDto);
    }

    @PostMapping("/delete")
    public ResponseDto delete(@RequestBody AuthDto authentication) {
        return authService.delete(authentication);
    }

    @PostMapping("/logout")
    public ResponseDto logout(@RequestBody AuthDto authentication) {
        ResponseDto response = new ResponseDto();
        response.setResult("logout");
        return response;
    }

    @ExceptionHandler(AuthenticationException.class)
    ResponseEntity<ResponseDto> handleAuthenticationException(AuthenticationException exception) {
        ResponseDto response = new ResponseDto();
        response.setResult("Ошибка аутентификации... Выберите другой логин!");
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }
}
