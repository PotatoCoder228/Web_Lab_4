package ru.itmo.potatocoder228.lab4.web_lab_4.services;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.AuthDto;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.ResponseDto;
import ru.itmo.potatocoder228.lab4.web_lab_4.entities.UserEntity;
import ru.itmo.potatocoder228.lab4.web_lab_4.repo.UserRepository;

@Service
@AllArgsConstructor
public class AuthService {
    private final BCryptPasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;

    public ResponseDto login(AuthDto authDto) {
        //Вытаскивается логин и пароль из запроса
        Authentication authenticate = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authDto.getLogin(), authDto.getPassword()));
        SecurityContextHolder.clearContext();
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        UserEntity user = userRepository
                .findByLogin(authDto.getLogin());
        ResponseDto response = new ResponseDto();
        response.setResult(user.getLogin());
        return response;
    }

    public ResponseDto register(AuthDto authDto) {
        UserEntity userEntityFromDb = userRepository.findByLogin(authDto.getLogin());
        if (userEntityFromDb != null) {
            ResponseDto response = new ResponseDto();
            response.setResult("Пользователь с этим логином уже существует!");
            return response;
        }
        UserEntity user = new UserEntity();
        user.setLogin(authDto.getLogin());
        user.setPassword(passwordEncoder.encode(authDto.getPassword()));
        userRepository.save(user);
        Authentication authenticate = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authDto.getLogin(), authDto.getPassword()));
        SecurityContextHolder.clearContext();
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        ResponseDto response = new ResponseDto();
        response.setResult(user.getLogin());
        return response;
    }

    public ResponseDto delete(AuthDto authDto) {
        ResponseDto response = new ResponseDto();
        UserEntity userEntityFromDb = userRepository.findByLogin(authDto.getLogin());
        if (userEntityFromDb == null) {
            response = new ResponseDto();
            response.setResult("Такого пользователя не существует!");
            return response;
        }
        userRepository.delete(userEntityFromDb);
        response.setResult("Пользователь успешно удалён");
        return response;
    }
}
