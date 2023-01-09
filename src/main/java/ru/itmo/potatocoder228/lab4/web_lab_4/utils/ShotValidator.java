package ru.itmo.potatocoder228.lab4.web_lab_4.utils;

import ru.itmo.potatocoder228.lab4.web_lab_4.dto.HitDto;

public class ShotValidator {
    private boolean validateX(double x) {
        return !(x < -4) && !(x > 4);
    }

    private boolean validateY(double y) {
        return !(y < -3) && !(y > 5);
    }

    private boolean validateR(double r) {
        return !(r < 1) && !(r > 4);
    }

    public boolean validateData(HitDto shot) {
        return validateX(shot.getX()) && validateY(shot.getY()) && validateR(shot.getR());
    }
}
