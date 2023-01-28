package ru.itmo.potatocoder228.lab4.web_lab_4.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.HitDto;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.ResponseDto;
import ru.itmo.potatocoder228.lab4.web_lab_4.dto.ResponseHitDto;
import ru.itmo.potatocoder228.lab4.web_lab_4.entities.HitEntity;
import ru.itmo.potatocoder228.lab4.web_lab_4.services.HitService;

import java.net.ConnectException;
import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
public class HitsController {


    private HitService hitService;

    @GetMapping("/hits")
    public List<HitEntity> getAllHitsByLogin(Principal user) {
        return hitService.getAllHitsByLogin(user.getName());//У нас при аутентификации имя пользователя = логину
        //https://stackoverflow-com.translate.goog/questions/37499307/whats-the-principal-in-spring-security?_x_tr_sl=auto&_x_tr_tl=ru&_x_tr_hl=ru
    }

    @PostMapping("/hits")
    public ResponseHitDto addNewHit(@RequestBody HitDto hit, Principal user) {
        hit.setLogin(user.getName());

        hit.setX(Double.parseDouble(String.format("%.2f", hit.getX()).replace(",", ".")));
        hit.setY(Double.parseDouble(String.format("%.2f", hit.getY()).replace(",", ".")));
        hit.setR(Double.parseDouble(String.format("%.2f", hit.getR()).replace(",", ".")));

        ResponseHitDto response = new ResponseHitDto();
        response.setX(hit.getX());
        response.setY(hit.getY());
        response.setR(hit.getR());
        response.setHitResult(hitService.addUserHit(hit));
        return response;
    }

    @DeleteMapping("/hits")
    public ResponseDto deleteHitsByUser(Principal User) {
        ResponseDto response = new ResponseDto();
        response.setResult(hitService.deleteHitsByLogin(User.getName()));
        return response;
    }

    @ExceptionHandler(ConnectException.class)
    ResponseEntity<ResponseDto> handleAuthenticationException(ConnectException exception) {
        ResponseDto response = new ResponseDto();
        response.setResult("Не удалось установить соединение с БД");
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(NumberFormatException.class)
    ResponseEntity<ResponseDto> numberFormatException(NumberFormatException exception) {
        ResponseDto response = new ResponseDto();
        response.setResult("Данные не прошли валидацию.");
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
