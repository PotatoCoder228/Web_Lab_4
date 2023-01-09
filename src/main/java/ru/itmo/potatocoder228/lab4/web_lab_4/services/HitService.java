package ru.itmo.potatocoder228.lab4.web_lab_4.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.HitDto;
import ru.itmo.potatocoder228.lab4.web_lab_4.entities.HitEntity;
import ru.itmo.potatocoder228.lab4.web_lab_4.repo.HitRepository;
import ru.itmo.potatocoder228.lab4.web_lab_4.utils.AreaChecker;
import ru.itmo.potatocoder228.lab4.web_lab_4.utils.ShotValidator;

import java.util.List;

@Service
@AllArgsConstructor
public class HitService {

    @Autowired
    private HitRepository dao;

    public List<HitEntity> getAllHitsByLogin(String login) {
        return dao.findAllByLogin(login);
    }

    public void deleteHitsByLogin(String login) {
        List<HitEntity> listOfHitsByUser = dao.findAllByLogin(login);
        dao.deleteAll(listOfHitsByUser);
    }

    public String addUserHit(HitDto hitDto) {
        ShotValidator validator = new ShotValidator();
        if(!validator.validateData(hitDto)){
            return "Некорректные координаты выстрела!";
        }
        HitEntity hit = new HitEntity();
        hit.setX(hitDto.getX());
        hit.setY(hitDto.getY());
        hit.setR(hitDto.getR());
        AreaChecker checker = new AreaChecker();
        boolean result = checker.checkArea(hitDto);
        String hitResult = result ? "Hit" : "Miss";
        hit.setHitResult(hitResult);
        hit.setLogin(hitDto.getLogin());
        dao.save(hit);
        return "Выстрел добавлен в таблицу!";
    }
}
