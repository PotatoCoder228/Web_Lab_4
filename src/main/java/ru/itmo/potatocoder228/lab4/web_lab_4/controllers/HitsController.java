package ru.itmo.potatocoder228.lab4.web_lab_4.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.HitDto;
import ru.itmo.potatocoder228.lab4.web_lab_4.entities.HitEntity;
import ru.itmo.potatocoder228.lab4.web_lab_4.services.HitService;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
public class HitsController {


    private HitService hitService;

    @GetMapping("/hits")
    public List<HitEntity> getAllHitsByLogin(Principal user){
        return hitService.getAllHitsByLogin(user.getName());//У нас при аутентификации имя пользователя = логину
        //https://stackoverflow-com.translate.goog/questions/37499307/whats-the-principal-in-spring-security?_x_tr_sl=auto&_x_tr_tl=ru&_x_tr_hl=ru
    }
    @PostMapping("/hits")
    public String addNewHit(@RequestBody HitDto hit, Principal user){
        hit.setLogin(user.getName());
        return hitService.addUserHit(hit);
    }
    @DeleteMapping("/hits")
    public void deleteHitsByUser(Principal User){
        hitService.deleteHitsByLogin(User.getName());
    }
}
