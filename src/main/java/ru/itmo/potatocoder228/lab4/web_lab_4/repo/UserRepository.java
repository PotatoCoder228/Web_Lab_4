package ru.itmo.potatocoder228.lab4.web_lab_4.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itmo.potatocoder228.lab4.web_lab_4.entities.UserEntity;


//Придерживаемся правил именования, метод интерфейса Spring генерит автоматом
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findByLogin(String login);
}
