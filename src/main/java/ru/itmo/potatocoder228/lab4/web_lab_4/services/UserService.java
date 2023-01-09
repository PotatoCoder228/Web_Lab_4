package ru.itmo.potatocoder228.lab4.web_lab_4.services;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.itmo.potatocoder228.lab4.web_lab_4.entities.UserEntity;
import ru.itmo.potatocoder228.lab4.web_lab_4.repo.UserRepository;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private UserRepository dao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity myUser = dao.findByLogin(username);
        if (myUser == null) {
            throw new UsernameNotFoundException("Неизвестный пользователь: " + username);
        }
        return User.builder()
                .username(myUser.getLogin())
                .password(myUser.getPassword())
                .build();
    }

    public UserEntity getByLogin(String username) {
        return dao.findByLogin(username);
    }


}
