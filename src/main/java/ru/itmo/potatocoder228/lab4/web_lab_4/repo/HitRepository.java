package ru.itmo.potatocoder228.lab4.web_lab_4.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itmo.potatocoder228.lab4.web_lab_4.entities.HitEntity;

import java.util.List;

@Repository
public interface HitRepository extends JpaRepository<HitEntity, Integer> {
    List<HitEntity> findAllByLogin(String login);
}
