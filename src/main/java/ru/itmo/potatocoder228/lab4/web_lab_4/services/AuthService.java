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
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public ResponseDto login(AuthDto authDto) {
        //Вытаскивается логин и пароль из запроса
        Authentication authenticate = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authDto.getLogin(), passwordEncoder.encode(authDto.getPassword())));
        SecurityContextHolder.clearContext();
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        UserEntity user = userRepository
                .findByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
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
        user.setPassword(authDto.getPassword());
        userRepository.save(user);
        Authentication authenticate = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authDto.getLogin(), passwordEncoder.encode(authDto.getPassword())));
        SecurityContextHolder.clearContext();
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        ResponseDto response = new ResponseDto();
        response.setResult(user.getLogin());
        return response;
    }

}
